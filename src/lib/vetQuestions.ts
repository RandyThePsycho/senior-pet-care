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
    `Does ${safeName}'s current quality of life seem typical for their age and condition?`,
  );
  questions.push('What changes should prompt us to schedule another visit?');

  // --- 按 condition 追加 ---
  if (conditions.includes('arthritis') || conditions.includes('mobility_loss')) {
    questions.push(
      "Are there pain-management options or mobility supports you'd recommend?",
    );
  }
  if (conditions.includes('kidney_disease')) {
    questions.push('Should we change anything about diet or hydration support?');
  }
  if (conditions.includes('dementia')) {
    questions.push('Are there ways to ease night-time anxiety?');
  }
  if (conditions.includes('incontinence')) {
    questions.push(
      'Could this be managed, or might it be part of a broader decline?',
    );
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
      'How concerned should I be about the drop in eating or drinking?',
    );
  }
  if (isLow('more_good_days')) {
    questions.push(
      'How should we approach quality-of-life and end-of-life conversations?',
    );
  }

  // --- 按症状追加 ---
  if (symptoms.includes('rapid_breathing')) {
    questions.push('Is the breathing change something we should check right away?');
  }
  if (symptoms.includes('night_crying')) {
    questions.push('Could the night-time crying be pain or anxiety?');
  }

  // --- 去重 + 截断到最多 8 条 ---
  const deduped = Array.from(new Set(questions));
  return deduped.slice(0, MAX_QUESTIONS);
}
