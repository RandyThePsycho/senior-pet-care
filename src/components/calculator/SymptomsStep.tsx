// src/components/calculator/SymptomsStep.tsx
'use client';

import type { Symptom } from '@/types/assessment';
import { SYMPTOM_OPTIONS } from '@/types/assessment';
import CTAButton from '@/components/common/CTAButton';

interface SymptomsStepProps {
  value: Symptom[];
  onChange: (value: Symptom[]) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function SymptomsStep({
  value,
  onChange,
  onBack,
  onSubmit,
}: SymptomsStepProps) {
  function toggle(s: Symptom) {
    const exists = value.includes(s);
    onChange(exists ? value.filter((x) => x !== s) : [...value, s]);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy-800">
          Have you noticed any of these recently?
        </h2>
        <p className="mt-1 text-navy-500">
          Select any that apply. It is completely fine to select none.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {SYMPTOM_OPTIONS.map((opt) => {
          const active = value.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                active
                  ? 'border-sage-500 bg-sage-50 text-sage-700'
                  : 'border-navy-200 bg-white text-navy-600 hover:bg-cream-100'
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                  active
                    ? 'border-sage-500 bg-sage-500 text-white'
                    : 'border-navy-300 bg-white'
                }`}
              >
                {active ? '✓' : ''}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <CTAButton variant="secondary" onClick={onBack}>
          Back
        </CTAButton>
        <CTAButton onClick={onSubmit} fullWidth>
          See my pet&apos;s results
        </CTAButton>
      </div>
    </div>
  );
}
