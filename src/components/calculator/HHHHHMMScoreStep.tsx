// src/components/calculator/HHHHHMMScoreStep.tsx
'use client';

import { useState } from 'react';
import type { Dimension, DimensionScores } from '@/types/assessment';
import { DIMENSIONS } from '@/types/assessment';
import { DIMENSION_META } from '@/lib/scoring';
import CTAButton from '@/components/common/CTAButton';

interface HHHHHMMScoreStepProps {
  value: DimensionScores; // 每项 number | null（null = 未选择）
  onChange: (value: DimensionScores) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function HHHHHMMScoreStep({
  value,
  onChange,
  onBack,
  onNext,
}: HHHHHMMScoreStepProps) {
  const [showError, setShowError] = useState(false);

  function setScore(dim: Dimension, score: number) {
    onChange({ ...value, [dim]: score });
  }

  const allRated = DIMENSIONS.every((d) => value[d] !== null);

  function handleNext() {
    if (!allRated) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onNext();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy-800">
          How is your pet doing?
        </h2>
        <p className="mt-1 text-navy-500">
          Slide each rating from 0 (struggling) to 10 (doing well). There are no
          wrong answers — go with your honest sense of things.
        </p>
      </div>

      <div className="space-y-5">
        {DIMENSION_META.map((meta) => {
          const current = value[meta.key];
          const rated = current !== null;
          return (
            <div
              key={meta.key}
              className="rounded-2xl border border-navy-100 bg-white p-4"
            >
              <div className="mb-1 flex items-baseline justify-between">
                <span className="font-semibold text-navy-700">
                  {meta.label}
                </span>
                <span className="text-sm font-medium text-sage-700">
                  {rated ? `${current} / 10` : 'Slide to rate'}
                </span>
              </div>
              <p className="mb-3 text-sm text-navy-500">{meta.question}</p>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={current ?? 5}
                onChange={(e) => setScore(meta.key, Number(e.target.value))}
                aria-label={meta.question}
                className={`w-full accent-sage-600 ${
                  rated ? '' : 'opacity-60'
                }`}
              />
              <div className="mt-1 flex justify-between text-xs text-navy-400">
                <span>{meta.lowAnchor}</span>
                <span>{meta.highAnchor}</span>
              </div>
            </div>
          );
        })}
      </div>

      {showError && !allRated && (
        <p className="text-sm text-clay-600">
          Please slide each rating so we can give you the most helpful results.
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <CTAButton variant="secondary" onClick={onBack}>
          Back
        </CTAButton>
        <CTAButton onClick={handleNext} fullWidth>
          Continue
        </CTAButton>
      </div>
    </div>
  );
}
