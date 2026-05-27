// src/app/api/email/subscribe/route.ts
// Email 留资接口（MVP mock）。
// 不接真实 ESP / Supabase，仅校验 email 并返回带各类链接的 mock 成功响应。
// 真实接入点见底部 TODO。

import { NextResponse } from 'next/server';

// 入参契约（与前端 EmailCaptureForm 对齐）
interface SubscribeBody {
  email: string;
  source?: string; // e.g. 'calculator_result'
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
  };
  // 复评上下文（来自复评链接）
  existingPetId?: string; // 存在则复用为同一 petId，不生成新的
  reassessmentMode?: string; // 'manual' | '7d' | ...
  reassessmentSource?: string; // 'journal' | 'email' | ...
  reassessmentOf?: string; // 上一次的 assessmentId
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// MVP：用时间戳 + 随机串生成 mock id（真实环境由 Supabase 返回 UUID）
function mockId(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}${rand}`;
}

export async function POST(request: Request) {
  let body: SubscribeBody;
  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body.' },
      { status: 400 },
    );
  }

  const {
    email,
    source,
    tags,
    petProfile,
    resultSummary,
    existingPetId,
    reassessmentMode,
    reassessmentSource,
    reassessmentOf,
  } = body;

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'A valid email is required.' },
      { status: 422 },
    );
  }

  // 生成 mock id 与链接。复评时复用传入的 existingPetId，保证写回同一宠物 Journal。
  const subscriberId = mockId('sub');
  const petId =
    existingPetId && existingPetId.trim() ? existingPetId : mockId('pet');
  const assessmentId = mockId('asmt');

  // 7 天后复评日期（ISO）
  const next = new Date();
  next.setDate(next.getDate() + 7);
  const nextReassessmentDate = next.toISOString();

  const reportUrl = `/reports/${assessmentId}`;
  const journalUrl = `/journal/${petId}`;
  // 下一次复评链接：带上本次 assessmentId 作为 reassessmentOf，形成链条
  const reassessmentUrl = `/tools/senior-pet-quality-of-life-calculator?petId=${petId}&reassessment=7d&source=email&reassessmentOf=${assessmentId}`;

  // MVP: 仅记录
  // eslint-disable-next-line no-console
  console.log('[email/subscribe] mock subscribe', {
    email,
    source,
    tags,
    petProfile,
    resultSummary,
    subscriberId,
    petId,
    assessmentId,
    reusedPetId: Boolean(existingPetId && existingPetId.trim()),
    reassessmentMode,
    reassessmentSource,
    reassessmentOf,
  });

  // ---------------------------------------------------------------------------
  // TODO: 接入真实 ESP（ConvertKit / MailerLite）。
  //   ConvertKit:  POST https://api.convertkit.com/v3/forms/{formId}/subscribe
  //                body: { api_key, email, first_name: petProfile.petName,
  //                        tags, fields: { pet_type, risk_level, low_dimensions } }
  //   MailerLite:  POST https://connect.mailerlite.com/api/subscribers
  //                headers: { Authorization: `Bearer ${MAILERLITE_API_KEY}` }
  //                body: { email, fields: { name, pet_type, risk_level, ... } }
  //   ESP 端配置自动化：Welcome+PDF -> +7d Weekly Reassessment ->
  //     按 tags(risk_* / low_* / condition_* / end_of_life_sensitive) 进入序列。
  //
  // TODO: 接入 Supabase（见 supabase/schema.sql）：
  //   1) upsert users(email, source) -> userId
  //   2) insert pets(user_id, name, pet_type, ...) -> 用真实 petId 替换 mock
  //   3) insert assessments(pet_id, user_id, total_score, risk_level, scores,
  //      symptoms, low_dimensions, urgent_flag, tags) -> 用真实 assessmentId 替换
  //   4) insert email_events(user_id, pet_id, assessment_id,
  //      event_type='subscribe', provider='mock'|'convertkit'|'mailerlite')
  //   之后 reportUrl/journalUrl/reassessmentUrl 用真实 id 拼接。
  // ---------------------------------------------------------------------------

  return NextResponse.json({
    ok: true,
    subscriberId,
    petId,
    assessmentId,
    reportUrl,
    journalUrl,
    reassessmentUrl,
    nextReassessmentDate,
  });
}
