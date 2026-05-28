// src/lib/supabase/mappers.ts
// Supabase 行 <-> AssessmentSnapshot 的转换。
// 设计要点：
//   * 历史数据稳定优先：rowsToSnapshot 优先使用 DB 中存储的
//     total_score / risk_level / low_dimensions / urgent_flag / tags，
//     这样旧报告不会因未来评分逻辑改动而改变 total/risk。
//   * 只有 routes / triggers 等纯派生开关用 scoreAssessment(input) 补齐
//     —— 它们仅决定下一步卡片显示与否，不属于"历史结果"。
//   * 不破坏现有 AssessmentSnapshot 类型。

import type {
  AssessmentInput,
  AssessmentResult,
  AssessmentSnapshot,
  Dimension,
  RiskLevel,
  Symptom,
} from '@/types/assessment';
import { DIMENSIONS } from '@/types/assessment';
import type { Condition, PetProfile, PetSize, PetType, WeightUnit } from '@/types/pet';
import { scoreAssessment, getRiskLevel } from '@/lib/scoring';

// --- DB 行类型（仅本阶段用到的字段）---
export interface UserRow {
  id: string;
  email: string;
  source: string | null;
}

export interface PetRow {
  id: string;
  user_id: string | null;
  name: string | null;
  pet_type: string | null;
  age: number | null;
  weight: number | null;
  weight_unit: string | null;
  size: string | null;
  conditions: unknown; // jsonb
}

export interface AssessmentRow {
  id: string;
  pet_id: string;
  user_id: string | null;
  total_score: number | null;
  risk_level: string | null;
  scores: unknown; // jsonb { hurt, ... }
  symptoms: unknown; // jsonb []
  low_dimensions: unknown; // jsonb []
  urgent_flag: boolean | null;
  tags: unknown; // jsonb []
  vet_questions: unknown; // jsonb []
  reassessment_of: string | null;
  next_reassessment_at: string | null;
  created_at: string;
}

// --- 安全解析 jsonb ---
function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? (v.filter((x) => typeof x === 'string') as string[]) : [];
}

function asScores(v: unknown): Record<Dimension, number> {
  const out = {} as Record<Dimension, number>;
  const obj = (v && typeof v === 'object' ? v : {}) as Record<string, unknown>;
  for (const d of DIMENSIONS) {
    const n = Number(obj[d]);
    out[d] = Number.isFinite(n) ? n : 0;
  }
  return out;
}

// 把 user/pet/assessment 行组装成 AssessmentSnapshot
export function rowsToSnapshot(args: {
  assessment: AssessmentRow;
  pet: PetRow;
  user: UserRow | null;
}): AssessmentSnapshot {
  const { assessment: a, pet, user } = args;

  const scores = asScores(a.scores);
  const symptoms = asStringArray(a.symptoms) as Symptom[];
  const conditions = asStringArray(pet.conditions) as Condition[];
  const vetQuestions = asStringArray(a.vet_questions);

  const profile: PetProfile = {
    petName: pet.name ?? '',
    petType: (pet.pet_type === 'cat' ? 'cat' : 'dog') as PetType,
    age: pet.age,
    weight: pet.weight,
    weightUnit: (pet.weight_unit === 'kg' ? 'kg' : 'lb') as WeightUnit,
    size: (pet.size ?? null) as PetSize | null,
    conditions,
  };

  const input: AssessmentInput = {
    profile,
    scores,
    symptoms,
    conditions,
  };

  // routes / triggers 等是"纯 UI 派生开关"，每次读取重新计算无害
  const derived: AssessmentResult = scoreAssessment(input);

  // --- 历史稳定字段：优先用 DB 中存储的值，保证旧报告不被未来评分逻辑改变 ---
  // 任一缺失（早期记录 / 兼容）才回退到 derived
  const dbTotal =
    typeof a.total_score === 'number' && Number.isFinite(a.total_score)
      ? a.total_score
      : null;
  const VALID_RISK: RiskLevel[] = [
    'stable',
    'needs_monitoring',
    'vet_visit',
    'end_of_life',
  ];
  const dbRisk: RiskLevel | null = VALID_RISK.includes(a.risk_level as RiskLevel)
    ? (a.risk_level as RiskLevel)
    : null;
  const dbLow = asStringArray(a.low_dimensions) as Dimension[];
  const dbTags = asStringArray(a.tags);

  const totalScore = dbTotal ?? derived.totalScore;
  const riskLevel = dbRisk ?? getRiskLevel(totalScore);
  const lowDimensions = dbLow.length > 0 ? dbLow : derived.lowDimensions;
  const urgentFlag =
    typeof a.urgent_flag === 'boolean' ? a.urgent_flag : derived.urgentFlag;
  const tags = dbTags.length > 0 ? dbTags : derived.tags;

  const result: AssessmentResult = {
    totalScore,
    riskLevel,
    lowDimensions,
    urgentFlag,
    routes: derived.routes,
    triggers: derived.triggers,
    tags,
  };

  const reportUrl = `/reports/${a.id}`;
  const journalUrl = `/journal/${pet.id}`;
  const reassessmentUrl = `/tools/senior-pet-quality-of-life-calculator?petId=${pet.id}&reassessment=7d&source=email&reassessmentOf=${a.id}`;

  return {
    assessmentId: a.id,
    petId: pet.id,
    email: user?.email ?? '',
    input,
    result,
    vetQuestions,
    createdAt: a.created_at,
    nextReassessmentDate: a.next_reassessment_at ?? '',
    reportUrl,
    journalUrl,
    reassessmentUrl,
    reassessmentOf: a.reassessment_of ?? undefined,
  };
}
