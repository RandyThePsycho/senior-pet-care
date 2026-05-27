// src/types/assessment.ts
// 评估与评分相关类型定义

import type { Condition, PetProfile } from './pet';

// HHHHHMM 七个维度
export type Dimension =
  | 'hurt'
  | 'hunger'
  | 'hydration'
  | 'hygiene'
  | 'happiness'
  | 'mobility'
  | 'more_good_days';

export const DIMENSIONS: Dimension[] = [
  'hurt',
  'hunger',
  'hydration',
  'hygiene',
  'happiness',
  'mobility',
  'more_good_days',
];

// 症状（Step 3 多选，不计入总分）
export type Symptom =
  | 'night_crying'
  | 'appetite_loss'
  | 'trouble_standing'
  | 'slipping_on_floors'
  | 'incontinence'
  | 'hiding'
  | 'rapid_breathing'
  | 'confusion'
  | 'pacing'
  | 'not_responding_to_family'
  | 'litter_box_difficulty'
  | 'dehydration_signs';

export const SYMPTOM_OPTIONS: { value: Symptom; label: string }[] = [
  { value: 'night_crying', label: 'Crying or vocalizing at night' },
  { value: 'appetite_loss', label: 'Loss of appetite' },
  { value: 'trouble_standing', label: 'Trouble standing up' },
  { value: 'slipping_on_floors', label: 'Slipping on floors' },
  { value: 'incontinence', label: 'Incontinence' },
  { value: 'hiding', label: 'Hiding away' },
  { value: 'rapid_breathing', label: 'Rapid or labored breathing' },
  { value: 'confusion', label: 'Confusion or disorientation' },
  { value: 'pacing', label: 'Restless pacing' },
  { value: 'not_responding_to_family', label: 'Not responding to family' },
  { value: 'litter_box_difficulty', label: 'Difficulty using the litter box' },
  { value: 'dehydration_signs', label: 'Signs of dehydration' },
];

// Step 2 的分数：未选择时为 null
export type DimensionScores = Record<Dimension, number | null>;

export type RiskLevel =
  | 'stable'
  | 'needs_monitoring'
  | 'vet_visit'
  | 'end_of_life';

// 评分函数输入
export interface AssessmentInput {
  profile: PetProfile;
  scores: Record<Dimension, number>; // 提交时已保证全部为数字
  symptoms: Symptom[];
  conditions: Condition[];
  previousTotal?: number; // 复评对比用，MVP 可选
}

// 路由开关：决定结果页显示哪些下一步卡片
export interface AssessmentRoutes {
  matcher: boolean; // mobility <= 5
  incontinence: boolean; // hygiene <= 4
  endOfLife: boolean; // happiness <= 4 && more_good_days <= 4
}

// 邮件触发开关
export interface AssessmentTriggers {
  vetVisitEmail: boolean; // 总分较上次下降 >= 7
}

// 评分函数输出
export interface AssessmentResult {
  totalScore: number; // 0–70
  riskLevel: RiskLevel;
  lowDimensions: Dimension[]; // score <= 3
  urgentFlag: boolean; // hurt<=2 || mobility<=2 || rapid_breathing
  routes: AssessmentRoutes;
  triggers: AssessmentTriggers;
  tags: string[]; // 供 ESP 打标签
}

// ---------------------------------------------------------------------------
// 留资后保存到 localStorage 的评估快照（MVP mock，无后端时用于 Report / Journal）
// ---------------------------------------------------------------------------
export interface AssessmentSnapshot {
  assessmentId: string;
  petId: string;
  email: string;
  input: AssessmentInput;
  result: AssessmentResult;
  vetQuestions: string[];
  createdAt: string; // ISO
  nextReassessmentDate: string; // ISO
  reportUrl: string;
  journalUrl: string;
  reassessmentUrl: string;
  reassessmentOf?: string; // 若本次为复评，指向上一次的 assessmentId
}

// ---------------------------------------------------------------------------
// 复评上下文：从 URL 解析（petId / reassessment / source / reassessmentOf），
// 自结果页一路传给 EmailCaptureForm，使复评写回同一个 petId 的 Journal。
// ---------------------------------------------------------------------------
export interface ReassessmentContext {
  existingPetId?: string; // URL 中的 petId，存在则复用为同一宠物
  reassessmentMode?: string; // 'manual' | '7d' | ...
  reassessmentSource?: string; // 'journal' | 'email' | ...
  reassessmentOf?: string; // 上一次的 assessmentId
}
