// src/lib/vetQuestions.ts
// 根据 condition / 低分维度 / 症状 动态生成 Questions to Ask Your Vet
// 规则：基础问题始终包含 -> 按 condition 追加 -> 按低分维度追加 -> 按症状追加
// 最后去重，最多输出 8 条。

import type {
  AssessmentInput,
  Dimension,
  Symptom,
} from '@/types/assessment';
import type { Condition } from '@/types/pet';

const MAX_QUESTIONS = 8;

export function generateVetQuestions(input: AssessmentInput): string[] {
  const safeName = input.profile.petName.trim() || 'your pet';
  const scores = input.scores;
  const conditions: Condition[] = input.conditions;
  const symptoms: Symptom[] = input.symptoms;

  const questions: string[] = [];

  // --- 基础问题（始终包含）---
  questions.push(
    `Is ${safeName}'s current quality of life what you'd expect for their age and condition?`,
  );
  questions.push("What signs should tell me it's time to come back?");

  // --- 按 condition 追加 ---
  if (conditions.includes('arthritis') || conditions.includes('mobility_loss')) {
    questions.push("Are there pain options or mobility aids you'd recommend?");
  }
  if (conditions.includes('kidney_disease')) {
    questions.push('Should we adjust diet or hydration support?');
  }
  if (conditions.includes('dementia')) {
    questions.push('Are there ways to ease night-time anxiety?');
  }
  if (conditions.includes('incontinence')) {
    questions.push('Could this be managed, or is it part of decline?');
  }
  if (conditions.includes('cancer') || conditions.includes('chronic_pain')) {
    questions.push(`How do we know if ${safeName} is comfortable?`);
  }

  // --- 按低分维度追加（<= 3）---
  const isLow = (d: Dimension) => (scores[d] ?? 10) <= 3;
  if (isLow('hurt')) {
    questions.push(`How can we tell if ${safeName}'s pain is well controlled?`);
  }
  if (isLow('hunger') || isLow('hydration')) {
    questions.push(
      'Should I be worried about the drop in eating or drinking?',
    );
  }
  if (isLow('more_good_days')) {
    questions.push(
      'How do we approach quality-of-life and end-of-life decisions?',
    );
  }

  // --- 按症状追加 ---
  if (symptoms.includes('rapid_breathing')) {
    questions.push('Is the breathing change something we should check urgently?');
  }
  if (symptoms.includes('night_crying')) {
    questions.push('Could the night-time crying be pain or anxiety?');
  }

  // --- 去重 + 截断到最多 8 条 ---
  const deduped = Array.from(new Set(questions));
  return deduped.slice(0, MAX_QUESTIONS);
}
