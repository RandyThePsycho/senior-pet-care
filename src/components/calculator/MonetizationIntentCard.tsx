'use client';

import { useState } from 'react';
import CTAButton from '@/components/common/CTAButton';
import { track } from '@/lib/analytics';
import {
  getAttributionSnapshot,
  getAttributionSource,
} from '@/lib/attribution';
import type { AssessmentInput, AssessmentResult } from '@/types/assessment';

interface MonetizationIntentCardProps {
  input: AssessmentInput;
  result: AssessmentResult;
}

const OPTIONS = [
  {
    value: 'senior_safe_supplies',
    label: 'Senior-safe supply checklist',
    description: 'Home setup ideas to discuss with your vet.',
  },
  {
    value: 'printable_vet_prep_pack',
    label: 'Printable vet-visit prep pack',
    description: 'A calmer way to summarize a hard week.',
  },
  {
    value: 'appetite_or_accident_tracker',
    label: 'Meal, accident, or night-waking tracker',
    description: 'A focused log for the pattern you are seeing.',
  },
] as const;

export default function MonetizationIntentCard({
  input,
  result,
}: MonetizationIntentCardProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (!selected.length || submitting) return;

    setError('');
    setSubmitting(true);

    const optionLabels = OPTIONS.filter((option) =>
      selected.includes(option.value),
    ).map((option) => option.label);

    try {
      const res = await fetch('/api/need-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pet_type: input.profile.petType,
          pet_age:
            input.profile.age === null ? null : String(input.profile.age),
          main_concern: [
            ...input.symptoms,
            ...result.lowDimensions.map((dimension) => `low_${dimension}`),
          ],
          stuck_points: ['post_assessment_next_step'],
          needed_help: selected,
          what_would_help: optionLabels.join(', '),
          free_text:
            'Post-assessment monetization-intent signal. No product recommendation shown.',
          source: getAttributionSource('calculator_monetization_interest'),
          attribution: getAttributionSnapshot(),
        }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        persisted?: boolean;
        submissionId?: string;
      };

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Could not save interest.');
      }

      track('situation_intake_submitted', {
        source: 'calculator_monetization_interest',
        petType: input.profile.petType,
        riskLevel: result.riskLevel,
        selected,
        persisted: Boolean(data.persisted),
        submissionId: data.submissionId,
      });

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not save that right now. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-sage-200 bg-sage-50 p-5 shadow-sm shadow-sage-700/10">
        <p className="font-display text-xl leading-tight text-navy-800">
          Thanks. That helps us choose what to build next.
        </p>
        <p className="mt-2 text-sm leading-6 text-navy-600">
          We saved this as product-direction feedback, not as medical advice or
          a care recommendation.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-lg border border-navy-100 bg-white p-6 shadow-sm shadow-navy-800/5">
      <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
        OPTIONAL
      </p>
      <h3 className="mt-2 font-display text-2xl leading-tight text-navy-800">
        What would be worth building next?
      </h3>
      <p className="mt-2 text-sm leading-6 text-navy-500">
        We are deciding whether senior-pet families need product guidance,
        printable care packs, or more focused logs. This does not recommend or
        sell anything today.
      </p>

      <div className="mt-4 grid gap-3">
        {OPTIONS.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer gap-3 rounded-lg border px-4 py-3 transition ${
                checked
                  ? 'border-sage-300 bg-sage-50 text-navy-800'
                  : 'border-navy-100 bg-cream-50 text-navy-600 hover:bg-cream-100'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  setSelected((current) =>
                    checked
                      ? current.filter((item) => item !== option.value)
                      : [...current, option.value],
                  )
                }
                className="mt-1 accent-sage-600"
              />
              <span>
                <span className="block text-sm font-semibold">
                  {option.label}
                </span>
                <span className="mt-1 block text-sm leading-5 text-navy-500">
                  {option.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>

      {error && <p className="mt-3 text-sm text-clay-600">{error}</p>}

      <div className="mt-4">
        <CTAButton
          variant="secondary"
          onClick={handleSubmit}
          disabled={!selected.length || submitting}
        >
          {submitting ? 'Saving...' : 'Save my interest'}
        </CTAButton>
      </div>
      <p className="mt-3 text-xs leading-5 text-navy-400">
        Supportive products are never shown for end-of-life results, and health
        decisions should stay with a licensed veterinarian.
      </p>
    </section>
  );
}
