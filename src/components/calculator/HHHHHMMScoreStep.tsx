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

  function markDefaultAsRated(dim: Dimension) {
    if (value[dim] === null) {
      setScore(dim, 5);
    }
  }

  function markRemainingAsFive() {
    const nextScores = { ...value };

    DIMENSIONS.forEach((dim) => {
      if (nextScores[dim] === null) {
        nextScores[dim] = 5;
      }
    });

    onChange(nextScores);
    setShowError(false);
  }

  const unratedCount = DIMENSIONS.filter((d) => value[d] === null).length;
  const ratedCount = DIMENSIONS.length - unratedCount;
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
        <h2 className="font-display text-3xl leading-tight text-navy-800">
          How is your pet doing?
        </h2>
        <p className="mt-2 max-w-2xl leading-7 text-navy-500">
          Move each slider from 0 (a difficult day) to 10 (doing well). Each
          area starts at 5 as a neutral middle point; adjust it, or mark the
          remaining unrated areas as 5 if that feels accurate today.
        </p>
        <p className="mt-4 max-w-2xl rounded-lg bg-cream-100 px-4 py-3 text-sm leading-6 text-navy-600">
          HHHHHMM is a gentle quality-of-life framework that looks at seven
          everyday signs: pain, eating, drinking, cleanliness, joy, movement,
          and whether good days still outnumber difficult ones.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-navy-100 bg-white p-4 shadow-sm shadow-navy-800/5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-navy-600">
          {ratedCount} of {DIMENSIONS.length} areas rated
          {unratedCount > 0 ? `, ${unratedCount} remaining` : ''}
        </p>
        {unratedCount > 0 && (
          <CTAButton variant="secondary" onClick={markRemainingAsFive}>
            Mark remaining as 5
          </CTAButton>
        )}
      </div>

      <div className="space-y-5">
        {DIMENSION_META.map((meta) => {
          const current = value[meta.key];
          const rated = current !== null;
          return (
            <div
              key={meta.key}
              className="rounded-lg border border-navy-100 bg-white p-4 shadow-sm shadow-navy-800/5"
            >
              <div className="mb-1 flex items-baseline justify-between">
                <span className="font-semibold text-navy-700">
                  {meta.label}
                </span>
                <span className="text-sm font-medium text-sage-700">
                  {rated ? `${current} / 10` : 'Not rated yet'}
                </span>
              </div>
              <p className="mb-3 text-sm text-navy-500">{meta.question}</p>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={current ?? 5}
                onPointerDown={() => markDefaultAsRated(meta.key)}
                onKeyDown={(event) => {
                  if (
                    value[meta.key] === null &&
                    (event.key === 'Enter' || event.key === ' ')
                  ) {
                    setScore(meta.key, 5);
                  }
                }}
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
        <p className="rounded-lg bg-orange-50 px-4 py-3 text-sm font-medium text-clay-600">
          Please rate each area, or use "Mark remaining as 5" for areas that
          feel average today.
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
