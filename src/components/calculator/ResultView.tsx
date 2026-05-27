// src/components/calculator/ResultView.tsx
'use client';

import type {
  AssessmentInput,
  AssessmentResult,
  ReassessmentContext,
} from '@/types/assessment';
import { DIMENSION_META } from '@/lib/scoring';
import { generateVetQuestions } from '@/lib/vetQuestions';
import ScoreResultCard from './ScoreResultCard';
import RiskLevelCard from './RiskLevelCard';
import DimensionFeedbackCard from './DimensionFeedbackCard';
import VetQuestionsList from './VetQuestionsList';
import EmailCaptureForm from './EmailCaptureForm';
import NextStepCards from './NextStepCards';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import CTAButton from '@/components/common/CTAButton';

interface ResultViewProps {
  input: AssessmentInput;
  result: AssessmentResult;
  onRestart: () => void;
  reassessmentContext?: ReassessmentContext;
}

export default function ResultView({
  input,
  result,
  onRestart,
  reassessmentContext,
}: ResultViewProps) {
  const petName = input.profile.petName;
  const vetQuestions = generateVetQuestions(input);
  const isEndOfLife = result.riskLevel === 'end_of_life';

  return (
    <div className="space-y-6">
      <ScoreResultCard total={result.totalScore} />

      <RiskLevelCard
        level={result.riskLevel}
        petName={petName}
        urgentFlag={result.urgentFlag}
      />

      {/* 低分维度反馈 */}
      {result.lowDimensions.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-navy-800">
            Areas worth a closer look
          </h3>
          {result.lowDimensions.map((dim) => (
            <DimensionFeedbackCard
              key={dim}
              dimension={dim}
              score={input.scores[dim]}
              petName={petName}
            />
          ))}
        </div>
      )}

      {/* 七维分数一览（便于用户回看） */}
      <div className="rounded-3xl border border-navy-100 bg-white p-6">
        <h3 className="text-xl font-bold text-navy-800">Your ratings</h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {DIMENSION_META.map((meta) => (
            <li
              key={meta.key}
              className="flex items-center justify-between rounded-2xl bg-cream-100 px-4 py-2"
            >
              <span className="text-sm text-navy-600">{meta.label}</span>
              <span className="text-sm font-semibold text-navy-800">
                {input.scores[meta.key]} / 10
              </span>
            </li>
          ))}
        </ul>
      </div>

      <VetQuestionsList questions={vetQuestions} />

      {/* 下一步卡片（end_of_life 时只显示温柔资源卡） */}
      <NextStepCards result={result} />

      {/* 留资换 PDF —— 7 天复评提醒由其成功态 + reassessmentUrl 承担 */}
      <EmailCaptureForm
        input={input}
        result={result}
        vetQuestions={vetQuestions}
        reassessmentContext={reassessmentContext}
      />

      {/* 医疗免责 */}
      <MedicalDisclaimer context={isEndOfLife ? 'end_of_life' : 'default'} />

      {/* 重新评估 */}
      <div className="pt-2 text-center">
        <CTAButton variant="ghost" onClick={onRestart}>
          Start a new assessment
        </CTAButton>
      </div>
    </div>
  );
}
