// src/lib/scoring.ts
// 完整评分引擎：总分、风险等级、低分维度、安全提醒、路由、tags
// 以及各风险等级文案、低分维度反馈文案、维度展示元数据。

import type {
  AssessmentInput,
  AssessmentResult,
  Dimension,
  RiskLevel,
} from '@/types/assessment';
import { DIMENSIONS } from '@/types/assessment';

// ---------------------------------------------------------------------------
// 核心评分函数
// ---------------------------------------------------------------------------
export function scoreAssessment(input: AssessmentInput): AssessmentResult {
  const { scores, symptoms, conditions, previousTotal } = input;

  // 1. 总分（MVP 不加权，七项直接相加，范围 0–70）
  const totalScore = DIMENSIONS.reduce(
    (sum, d) => sum + (scores[d] ?? 0),
    0,
  );

  // 2. 风险等级
  const riskLevel = getRiskLevel(totalScore);

  // 3. 低分维度（<= 3）
  const lowDimensions = DIMENSIONS.filter((d) => (scores[d] ?? 10) <= 3);

  // 4. 安全提醒（不改变风险等级，只在结果页顶部加一条温柔提示）
  const urgentFlag =
    (scores.hurt ?? 10) <= 2 ||
    (scores.mobility ?? 10) <= 2 ||
    symptoms.includes('rapid_breathing');

  // 5. 路由：决定显示哪些下一步卡片
  const routes = {
    matcher: (scores.mobility ?? 10) <= 5,
    incontinence: (scores.hygiene ?? 10) <= 4,
    endOfLife:
      (scores.happiness ?? 10) <= 4 && (scores.more_good_days ?? 10) <= 4,
  };

  // 6. 邮件触发：总分较上次下降 >= 7
  const triggers = {
    vetVisitEmail:
      previousTotal !== undefined && previousTotal - totalScore >= 7,
  };

  // 7. ESP tags
  const tags: string[] = [
    `pet_type_${input.profile.petType}`,
    `risk_${riskLevel}`,
    ...lowDimensions.map((d) => `low_${d}`),
    ...conditions.map((c) => `condition_${c}`),
  ];
  if (riskLevel === 'end_of_life') tags.push('end_of_life_sensitive');

  return {
    totalScore,
    riskLevel,
    lowDimensions,
    urgentFlag,
    routes,
    triggers,
    tags,
  };
}

export function getRiskLevel(totalScore: number): RiskLevel {
  if (totalScore >= 56) return 'stable';
  if (totalScore >= 42) return 'needs_monitoring';
  if (totalScore >= 28) return 'vet_visit';
  return 'end_of_life';
}

// ---------------------------------------------------------------------------
// 各风险等级结果页文案（{petName} 会在渲染时被替换）
// ---------------------------------------------------------------------------
export interface RiskCopy {
  label: string;
  headline: string;
  body: string;
}

const RISK_COPY: Record<RiskLevel, RiskCopy> = {
  stable: {
    label: 'Stable',
    headline: 'Your pet seems to be doing well right now.',
    body: "Based on what you've shared, {petName}'s quality of life looks stable. Keep doing what you're doing, and keep noticing the small changes. We'll check in again in a week.",
  },
  needs_monitoring: {
    label: 'Needs Monitoring',
    headline: 'There are a few things worth keeping an eye on.',
    body: "Some areas of {petName}'s comfort may be starting to shift. None of this is a diagnosis — but tracking it over the next week will help you and your vet make good decisions together.",
  },
  vet_visit: {
    label: 'Vet Visit Recommended',
    headline: 'It may be a good time to talk with your vet.',
    body: "A few signs suggest {petName} could be uncomfortable. We've prepared questions to bring to your vet so the conversation is as helpful as possible. You know {petName} best — this is just here to support you.",
  },
  end_of_life: {
    label: 'End-of-Life Conversation Suggested',
    headline: "This is a tender moment, and you don't have to face it alone.",
    body: "What you've described suggests {petName} may be struggling. There's no right or wrong timeline — only what's kind. When you're ready, we've gathered gentle resources to help you think through the next steps.",
  },
};

// 取出某等级文案，并把 {petName} 替换为实际名字（无名字时用 "your pet"）
export function getRiskCopy(level: RiskLevel, petName: string): RiskCopy {
  const safeName = petName.trim() || 'your pet';
  const copy = RISK_COPY[level];
  return {
    label: copy.label,
    headline: copy.headline.replace(/\{petName\}/g, safeName),
    body: copy.body.replace(/\{petName\}/g, safeName),
  };
}

// ---------------------------------------------------------------------------
// 维度展示元数据（label + 滑块两端锚点 + 问句）
// ---------------------------------------------------------------------------
export interface DimensionMeta {
  key: Dimension;
  label: string;
  question: string;
  lowAnchor: string;
  highAnchor: string;
}

export const DIMENSION_META: DimensionMeta[] = [
  {
    key: 'hurt',
    label: 'Hurt',
    question: "Is your pet's pain well managed?",
    lowAnchor: 'In constant pain',
    highAnchor: 'No signs of pain',
  },
  {
    key: 'hunger',
    label: 'Hunger',
    question: 'Is your pet eating enough?',
    lowAnchor: 'Refusing food',
    highAnchor: 'Eating normally',
  },
  {
    key: 'hydration',
    label: 'Hydration',
    question: 'Is your pet staying hydrated?',
    lowAnchor: 'Clearly dehydrated',
    highAnchor: 'Drinking well',
  },
  {
    key: 'hygiene',
    label: 'Hygiene',
    question: 'Can your pet stay clean and comfortable?',
    lowAnchor: 'Cannot stay clean',
    highAnchor: 'Clean and comfortable',
  },
  {
    key: 'happiness',
    label: 'Happiness',
    question: 'Does your pet still show moments of joy?',
    lowAnchor: 'No longer engaged',
    highAnchor: 'Still joyful',
  },
  {
    key: 'mobility',
    label: 'Mobility',
    question: 'Can your pet move around on their own?',
    lowAnchor: 'Cannot move unaided',
    highAnchor: 'Moves freely',
  },
  {
    key: 'more_good_days',
    label: 'More good days than bad',
    question: 'Are there more good days than bad?',
    lowAnchor: 'Bad days outweigh good',
    highAnchor: 'Mostly good days',
  },
];

// ---------------------------------------------------------------------------
// 低分维度反馈文案（温柔、非诊断、含观察建议）
// ---------------------------------------------------------------------------
const DIMENSION_FEEDBACK: Record<Dimension, string> = {
  hurt: "{petName} may be experiencing pain that isn't fully controlled. Pain in older pets is often quiet — watch for restlessness, panting, or reluctance to move. This is worth raising with your vet soon.",
  hunger:
    'A drop in appetite can have many causes, from dental discomfort to nausea. Try noting what and when {petName} eats over the next few days — it gives your vet useful information.',
  hydration:
    'Staying hydrated matters, especially with kidney or other chronic conditions. Watch for dry gums or reduced drinking, and ask your vet whether anything could make drinking easier for {petName}.',
  hygiene:
    "Staying clean and comfortable supports {petName}'s dignity and skin health. Soft, washable bedding and gentle cleaning routines can help. We can suggest options if you'd like.",
  happiness:
    'When a pet stops engaging with the things they loved, it can be one of the hardest changes to notice. Jot down any moments of joy that remain — they matter, and they help paint a fuller picture.',
  mobility:
    'Getting around seems harder for {petName} right now. Small home changes — better traction, gentle support, easier access — can make a real difference. We can help you find the right setup.',
  more_good_days:
    'When the hard days begin to outnumber the good ones, it is natural to start asking difficult questions. There is no rush — but you may find it helpful to look at our gentle resources when you feel ready.',
};

export function getDimensionFeedback(
  dimension: Dimension,
  petName: string,
): string {
  const safeName = petName.trim() || 'your pet';
  return DIMENSION_FEEDBACK[dimension].replace(/\{petName\}/g, safeName);
}
