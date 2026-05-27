// src/components/calculator/DimensionFeedbackCard.tsx
// 单个低分维度的反馈卡片

import type { Dimension } from '@/types/assessment';
import { getDimensionFeedback, DIMENSION_META } from '@/lib/scoring';

interface DimensionFeedbackCardProps {
  dimension: Dimension;
  score: number;
  petName: string;
}

export default function DimensionFeedbackCard({
  dimension,
  score,
  petName,
}: DimensionFeedbackCardProps) {
  const meta = DIMENSION_META.find((m) => m.key === dimension);
  const feedback = getDimensionFeedback(dimension, petName);

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-semibold text-navy-700">
          {meta?.label ?? dimension}
        </span>
        <span className="text-sm font-medium text-navy-400">{score} / 10</span>
      </div>
      <p className="text-sm leading-relaxed text-navy-600">{feedback}</p>
    </div>
  );
}
