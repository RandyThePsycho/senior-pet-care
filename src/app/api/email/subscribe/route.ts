// src/app/api/email/subscribe/route.ts
// Email 留资接口（Phase 2：Supabase 真实持久化）。
// 流程：校验 email -> upsert users -> 复用/创建 pets -> insert assessments
//       -> insert email_events(event_type='subscribe', provider='supabase')。
// 若 Supabase 未配置（缺 env），降级为本地 mock id（保证开发/CI 不阻塞）。

import { NextResponse } from 'next/server';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabase/server';
import { scoreAssessment } from '@/lib/scoring';
import { generateVetQuestions } from '@/lib/vetQuestions';
import { upsertMailerLiteSubscriber } from '@/lib/email/mailerLite';
import { DIMENSIONS, type Dimension, type Symptom } from '@/types/assessment';
import type { Condition, PetType, WeightUnit, PetSize } from '@/types/pet';

interface SubscribeBody {
  email: string;
  source?: string;
  tags?: string[];
  petProfile?: {
    petName?: string;
    petType?: 'dog' | 'cat';
    age?: number | null;
    weight?: number | null;
    weightUnit?: string;
    size?: string | null;
    conditions?: string[];
  };
  resultSummary?: {
    totalScore?: number;
    riskLevel?: string;
    lowDimensions?: string[];
    urgentFlag?: boolean;
  };
  scores?: Record<string, number>;
  symptoms?: string[];
  vetQuestions?: string[];
  attribution?: unknown;
  existingPetId?: string;
  reassessmentMode?: string;
  reassessmentSource?: string;
  reassessmentOf?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mockId(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}${rand}`;
}

function buildLinks(petId: string, assessmentId: string) {
  return {
    reportUrl: `/reports/${assessmentId}`,
    journalUrl: `/journal/${petId}`,
    reassessmentUrl: `/tools/senior-pet-quality-of-life-calculator?petId=${petId}&reassessment=7d&source=email&reassessmentOf=${assessmentId}`,
  };
}

// UUID v1–v5 校验。只有合法 UUID 才被当作真实的 existingPetId 使用。
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function isValidUuid(v: unknown): v is string {
  return typeof v === 'string' && UUID_RE.test(v);
}

// 从客户端 body 安全构造 AssessmentInput；缺失/非法字段用安全默认值兜底。
// 注意：服务端不信任客户端传来的 totalScore/riskLevel/tags 等派生值，
//       一律基于此 input 重新计算（见下方 scoreAssessment 调用）。
function buildServerAssessmentInput(body: SubscribeBody) {
  const profileIn = body.petProfile ?? {};
  const petType: PetType = profileIn.petType === 'cat' ? 'cat' : 'dog';
  const weightUnit: WeightUnit = profileIn.weightUnit === 'kg' ? 'kg' : 'lb';

  // conditions: 只保留字符串元素（jsonb 安全）
  const conditions = (profileIn.conditions ?? []).filter(
    (c): c is Condition => typeof c === 'string',
  ) as Condition[];

  // scores: 把每个维度限制到 0–10 整数；缺失/非法 → 0（与评分函数的 `?? 0` 一致）
  const rawScores = body.scores ?? {};
  const scores = {} as Record<Dimension, number>;
  for (const d of DIMENSIONS) {
    const n = Number((rawScores as Record<string, unknown>)[d]);
    scores[d] = Number.isFinite(n) ? Math.min(10, Math.max(0, Math.round(n))) : 0;
  }

  const symptoms = (body.symptoms ?? []).filter(
    (s): s is Symptom => typeof s === 'string',
  ) as Symptom[];

  return {
    profile: {
      petName: profileIn.petName ?? '',
      petType,
      age: profileIn.age ?? null,
      weight: profileIn.weight ?? null,
      weightUnit,
      size: (profileIn.size ?? null) as PetSize | null,
      conditions,
    },
    scores,
    symptoms,
    conditions,
  };
}

function sanitizeAttribution(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  try {
    const serialized = JSON.stringify(value);
    if (serialized.length > 5000) return null;
    return JSON.parse(serialized) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: SubscribeBody;
  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const {
    email,
    source,
    petProfile,
    vetQuestions,
    existingPetId,
    reassessmentMode,
    reassessmentSource,
    reassessmentOf,
    attribution,
  } = body;
  // 注意：客户端可能仍传 tags / resultSummary / scores / symptoms，
  //       但服务端不信任这些派生值，统一在下文用 buildServerAssessmentInput(body)
  //       + scoreAssessment() 重算。tags / resultSummary 字段保留在 SubscribeBody
  //       类型中是为了与前端兼容，但此处不读取。

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'A valid email is required.' }, { status: 422 });
  }

  // 7 天后复评日期
  const next = new Date();
  next.setDate(next.getDate() + 7);
  const nextReassessmentDate = next.toISOString();

  // ---- 降级路径：Supabase 未配置时用 mock（开发/CI）----
  if (!isSupabaseConfigured()) {
    const subscriberId = mockId('sub');
    const petId = existingPetId && existingPetId.trim() ? existingPetId : mockId('pet');
    const assessmentId = mockId('asmt');
    const links = buildLinks(petId, assessmentId);
    // eslint-disable-next-line no-console
    console.log('[email/subscribe] Supabase not configured -> mock', { email, petId, assessmentId });
    return NextResponse.json({
      ok: true,
      subscriberId,
      petId,
      assessmentId,
      ...links,
      nextReassessmentDate,
      persisted: false,
      emailProvider: {
        provider: 'mailerlite',
        status: 'skipped',
      },
    });
  }

  // ---- 真实持久化路径 ----
  try {
    const supabase = getServerSupabase();

    // a/b. upsert users(email, source) -> userId
    const { data: userRow, error: userErr } = await supabase
      .from('users')
      .upsert({ email, source: source ?? null }, { onConflict: 'email' })
      .select('id, email')
      .single();
    if (userErr || !userRow) throw userErr ?? new Error('user upsert failed');
    const userId = userRow.id as string;

    // c/d. 复用或创建 pet
    let petId: string;
    let petExists = false;
    // 仅当 existingPetId 是合法 UUID 时才尝试复用（防止伪造的 mock id / 注入字符串）
    if (isValidUuid(existingPetId)) {
      const { data: foundPet } = await supabase
        .from('pets')
        .select('id')
        .eq('id', existingPetId)
        .maybeSingle();
      if (foundPet?.id) {
        petId = foundPet.id as string;
        petExists = true;
      } else {
        petId = ''; // 合法 UUID 但不存在 → 下面创建（沿用该 UUID）
      }
    } else {
      petId = '';
    }

    if (!petExists) {
      const insertPet: Record<string, unknown> = {
        user_id: userId,
        name: petProfile?.petName ?? null,
        pet_type: petProfile?.petType ?? null,
        age: petProfile?.age ?? null,
        weight: petProfile?.weight ?? null,
        weight_unit: petProfile?.weightUnit ?? 'lb',
        size: petProfile?.size ?? null,
        conditions: petProfile?.conditions ?? [],
      };
      // 仅当 existingPetId 是合法 UUID 时才沿用它；非法/缺失则让 DB 生成新 UUID。
      if (isValidUuid(existingPetId)) insertPet.id = existingPetId;
      const { data: petRow, error: petErr } = await supabase
        .from('pets')
        .insert(insertPet)
        .select('id')
        .single();
      if (petErr || !petRow) throw petErr ?? new Error('pet insert failed');
      petId = petRow.id as string;
    }

    // --- 服务端权威评分：忽略客户端传入的 totalScore/riskLevel/lowDimensions/urgentFlag/tags ---
    const serverInput = buildServerAssessmentInput(body);
    const serverResult = scoreAssessment(serverInput);
    // vetQuestions：默认服务端生成；仅当客户端传入与服务端生成内容完全一致时复用客户端版本
    const serverVetQuestions = generateVetQuestions(serverInput);
    const clientVetQuestions = Array.isArray(vetQuestions)
      ? vetQuestions.filter((q): q is string => typeof q === 'string')
      : null;
    const vetQuestionsToStore =
      clientVetQuestions &&
      clientVetQuestions.length === serverVetQuestions.length &&
      clientVetQuestions.every((q, i) => q === serverVetQuestions[i])
        ? clientVetQuestions
        : serverVetQuestions;

    // e. insert assessments（全部派生字段用服务端计算结果写入）
    const { data: asmtRow, error: asmtErr } = await supabase
      .from('assessments')
      .insert({
        pet_id: petId,
        user_id: userId,
        total_score: serverResult.totalScore,
        risk_level: serverResult.riskLevel,
        scores: serverInput.scores,
        symptoms: serverInput.symptoms,
        low_dimensions: serverResult.lowDimensions,
        urgent_flag: serverResult.urgentFlag,
        tags: serverResult.tags,
        vet_questions: vetQuestionsToStore,
        reassessment_of: reassessmentOf ?? null,
        next_reassessment_at: nextReassessmentDate,
      })
      .select('id, created_at')
      .single();
    if (asmtErr || !asmtRow) throw asmtErr ?? new Error('assessment insert failed');
    const assessmentId = asmtRow.id as string;

    // f. insert email_events
    const attributionPayload = sanitizeAttribution(attribution);
    const { error: evtErr } = await supabase.from('email_events').insert({
      user_id: userId,
      pet_id: petId,
      assessment_id: assessmentId,
      event_type: 'subscribe',
      provider: 'supabase',
      payload: {
        source: source ?? null,
        reassessment_mode: reassessmentMode ?? null,
        reassessment_source: reassessmentSource ?? null,
        attribution: attributionPayload,
        tags: serverResult.tags,
      },
    });
    if (evtErr) throw evtErr;

    const links = buildLinks(petId, assessmentId);
    const mailerLiteResult = await upsertMailerLiteSubscriber({
      email,
      petName: serverInput.profile.petName,
      petType: serverInput.profile.petType,
      riskLevel: serverResult.riskLevel,
      totalScore: serverResult.totalScore,
      petId,
      assessmentId,
      reportUrl: links.reportUrl,
      journalUrl: links.journalUrl,
      reassessmentUrl: links.reassessmentUrl,
      nextReassessmentDate,
      lowDimensions: serverResult.lowDimensions,
      tags: serverResult.tags,
    });

    const mailerLiteEventType =
      mailerLiteResult.status === 'succeeded'
        ? 'mailerlite_subscribe_succeeded'
        : mailerLiteResult.status === 'failed'
          ? 'mailerlite_subscribe_failed'
          : 'mailerlite_skipped';

    const { error: mailerLiteEvtErr } = await supabase.from('email_events').insert({
      user_id: userId,
      pet_id: petId,
      assessment_id: assessmentId,
      event_type: mailerLiteEventType,
      provider: 'mailerlite',
      payload: {
        status: mailerLiteResult.status,
        group_id: mailerLiteResult.groupId ?? null,
        subscriber_id: mailerLiteResult.subscriberId ?? null,
        error: mailerLiteResult.error ?? null,
        report_url: links.reportUrl,
        journal_url: links.journalUrl,
        reassessment_url: links.reassessmentUrl,
        risk_level: serverResult.riskLevel,
        tags: serverResult.tags,
      },
    });

    if (mailerLiteEvtErr) {
      // eslint-disable-next-line no-console
      console.error('[email/subscribe] mailerlite event error', mailerLiteEvtErr);
    }

    return NextResponse.json({
      ok: true,
      subscriberId: userId,
      petId,
      assessmentId,
      ...links,
      nextReassessmentDate,
      persisted: true,
      emailProvider: {
        provider: mailerLiteResult.provider,
        status: mailerLiteResult.status,
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[email/subscribe] supabase error', err);
    return NextResponse.json(
      { ok: false, error: 'Could not save your information right now. Please try again.' },
      { status: 500 },
    );
  }

  // ---------------------------------------------------------------------------
  // TODO（后续）：在 MailerLite 后台配置 group-triggered automation：
  //   立即发送 report/journal links，并在 7 天后发送 reassessment reminder。
  // ---------------------------------------------------------------------------
}
