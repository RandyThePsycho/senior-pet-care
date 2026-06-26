'use client';

import { useMemo, useState } from 'react';
import CTAButton from '@/components/common/CTAButton';
import { track } from '@/lib/analytics';
import {
  getAttributionSnapshot,
  getAttributionSource,
} from '@/lib/attribution';
import {
  getConcernLabels,
  matchSeniorSupportCategories,
  SENIOR_SUPPORT_CONCERNS,
  type SeniorSupportConcern,
} from '@/lib/seniorSupportMatcher';
import { CONDITION_OPTIONS, type Condition, type PetType } from '@/types/pet';

type PriceIntent = 'support_plan_7' | 'shortlist_report_19';

const FOCUS_TO_CONCERNS: Record<string, SeniorSupportConcern[]> = {
  mobility: ['mobility_slipping'],
  hygiene: ['accidents_hygiene'],
  night: ['night_waking_restless', 'caregiver_sleep_loss'],
  appetite: ['appetite_change', 'digestive_sensitivity'],
};

const PRICE_OPTIONS: {
  value: PriceIntent;
  title: string;
  price: string;
  body: string;
}[] = [
  {
    value: 'support_plan_7',
    title: 'Early-access support plan',
    price: '$7 one-time',
    body: 'A printable 7-day pattern summary, vet questions, and support-category shortlist.',
  },
  {
    value: 'shortlist_report_19',
    title: 'Deeper product shortlist report',
    price: '$19 one-time',
    body: 'Everything in the support plan plus a more detailed buying checklist by category.',
  },
];

interface SeniorSupportMatcherClientProps {
  initialFocus?: string;
}

export default function SeniorSupportMatcherClient({
  initialFocus,
}: SeniorSupportMatcherClientProps) {
  const [petType, setPetType] = useState<PetType>('dog');
  const [concerns, setConcerns] = useState<SeniorSupportConcern[]>(
    initialFocus ? FOCUS_TO_CONCERNS[initialFocus] ?? [] : [],
  );
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [priceIntent, setPriceIntent] =
    useState<PriceIntent>('support_plan_7');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const result = useMemo(
    () =>
      matchSeniorSupportCategories({
        petType,
        concerns,
        conditions,
      }),
    [petType, concerns, conditions],
  );

  const selectedConcernLabels = useMemo(
    () => getConcernLabels(concerns),
    [concerns],
  );

  function toggleConcern(concern: SeniorSupportConcern) {
    setConcerns((current) =>
      current.includes(concern)
        ? current.filter((item) => item !== concern)
        : [...current, concern],
    );
  }

  function toggleCondition(condition: Condition) {
    setConditions((current) =>
      current.includes(condition)
        ? current.filter((item) => item !== condition)
        : [...current, condition],
    );
  }

  async function handleSubmit() {
    if (submitting || !email.trim()) return;

    setError('');
    setSubmitting(true);

    try {
      const selectedPlan = PRICE_OPTIONS.find(
        (option) => option.value === priceIntent,
      );
      const categoryTitles = result.categories.map((category) => category.title);

      const res = await fetch('/api/need-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pet_type: petType,
          main_concern: selectedConcernLabels,
          stuck_points: ['product_confusion', 'paid_support_validation'],
          needed_help: [
            priceIntent,
            ...result.categories.map((category) => category.key),
          ],
          what_would_help: [
            selectedPlan
              ? `${selectedPlan.title} at ${selectedPlan.price}`
              : priceIntent,
            `Support categories: ${categoryTitles.join(', ')}`,
          ].join('\n'),
          free_text:
            'Support matcher early-access paid-intent signal. This does not buy a supplement today; it validates willingness to pay for a vet-prep support plan and category shortlist.',
          email,
          source: getAttributionSource('support_matcher_paid_interest'),
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
        throw new Error(data.error || 'Could not save your interest.');
      }

      track('support_matcher_interest_submitted', {
        source: 'support_matcher_paid_interest',
        petType,
        concerns,
        conditions,
        priceIntent,
        categoryKeys: result.categories.map((category) => category.key),
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

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <section className="space-y-8">
        <div className="rounded-2xl border border-navy-100 bg-white/90 p-6 shadow-sm shadow-navy-800/5 sm:p-7">
          <p className="text-sm font-semibold text-sage-700">
            STEP 1
          </p>
          <h2 className="mt-2 font-display text-3xl leading-tight text-navy-800 sm:text-4xl">
            What are you trying not to buy randomly?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-navy-600">
            Choose the pattern that is creating the most pressure. The matcher
            recommends support categories first, not specific treatment claims.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {(['dog', 'cat'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPetType(type)}
                className={`rounded-xl border px-4 py-2.5 text-base font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300 ${
                  petType === type
                    ? 'border-sage-300 bg-sage-50 text-sage-800'
                    : 'border-navy-100 bg-cream-50 text-navy-500 hover:bg-cream-100'
                }`}
              >
                {type === 'dog' ? 'Dog' : 'Cat'}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {SENIOR_SUPPORT_CONCERNS.map((concern) => {
              const checked = concerns.includes(concern.key);
              return (
                <label
                  key={concern.key}
                  className={`cursor-pointer rounded-xl border p-5 transition ${
                    checked
                      ? 'border-sage-300 bg-sage-50 text-navy-800'
                      : 'border-navy-100 bg-cream-50 text-navy-600 hover:bg-cream-100'
                  }`}
                >
                  <span className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleConcern(concern.key)}
                      className="mt-1 accent-sage-600"
                    />
                    <span>
                      <span className="block text-base font-semibold">
                        {concern.label}
                      </span>
                      <span className="mt-1 block text-base leading-6 text-navy-600">
                        {concern.description}
                      </span>
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white/90 p-6 shadow-sm shadow-navy-800/5 sm:p-7">
          <p className="text-sm font-semibold text-sage-700">
            STEP 2
          </p>
          <h2 className="mt-2 font-display text-3xl leading-tight text-navy-800 sm:text-4xl">
            Any known conditions that should slow the buying decision?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-navy-600">
            These do not diagnose your pet. They help the matcher add
            vet-first warnings where supplements or home products could be a
            poor shortcut.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {CONDITION_OPTIONS.map((condition) => {
              const checked = conditions.includes(condition.value);
              return (
                <button
                  key={condition.value}
                  type="button"
                  onClick={() => toggleCondition(condition.value)}
                  className={`rounded-xl border px-4 py-2.5 text-base font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300 ${
                    checked
                      ? 'border-sage-300 bg-sage-50 text-sage-800'
                      : 'border-navy-100 bg-cream-50 text-navy-500 hover:bg-cream-100'
                  }`}
                >
                  {condition.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-sage-700">
              MATCHED SUPPORT CATEGORIES
            </p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-navy-800 sm:text-4xl">
              Start with categories, then decide what is worth buying.
            </h2>
          </div>

          {result.vetFirstReasons.length > 0 && (
            <div className="rounded-2xl border border-clay-200 bg-clay-50 p-6 text-base leading-7 text-navy-700">
              <p className="font-semibold text-navy-800">
                Vet-first warning before supplements
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {result.vetFirstReasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-4">
            {result.categories.map((category) => (
              <article
                key={category.key}
                className="rounded-2xl border border-navy-100 bg-white/90 p-6 shadow-sm shadow-navy-800/5 sm:p-7"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-sage-700">
                      {category.kind.replace('_', ' ')}
                    </p>
                    <h3 className="mt-2 font-display text-2xl leading-tight text-navy-800">
                      {category.title}
                    </h3>
                  </div>
                  <p className="rounded-lg bg-cream-100 px-3 py-1.5 text-sm font-semibold text-navy-600">
                    {category.priceRange}
                  </p>
                </div>
                <p className="mt-4 text-base leading-7 text-navy-600">
                  {category.summary}
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="text-base font-semibold text-navy-800">
                      Suitable for
                    </h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-7 text-navy-600">
                      {category.suitableFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-navy-800">
                      Not suitable for
                    </h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-7 text-navy-600">
                      {category.notSuitableFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-navy-800">
                      What to look for
                    </h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-7 text-navy-600">
                      {category.whatToLookFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-5 rounded-xl bg-sage-50 px-4 py-3 text-base leading-7 text-navy-600">
                  <span className="font-semibold text-navy-800">
                    Ask your vet:{' '}
                  </span>
                  {category.vetQuestion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-2xl border border-sage-200 bg-sage-50/90 p-6 shadow-sm shadow-sage-700/5 sm:p-7">
          <p className="text-sm font-semibold text-sage-700">
            PAID VALIDATION
          </p>
          <h2 className="mt-2 font-display text-3xl leading-tight text-navy-800">
            Would this be worth paying for?
          </h2>
          <p className="mt-4 text-base leading-7 text-navy-600">
            This does not buy a supplement today. It tells us whether families
            would pay for a clearer support plan before purchasing products.
          </p>

          <div className="mt-5 grid gap-3">
            {PRICE_OPTIONS.map((option) => {
              const checked = priceIntent === option.value;
              return (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-xl border p-5 transition ${
                    checked
                      ? 'border-sage-300 bg-white text-navy-800'
                      : 'border-sage-100 bg-sage-50/70 text-navy-600 hover:bg-white/80'
                  }`}
                >
                  <span className="flex gap-3">
                    <input
                      type="radio"
                      name="price-intent"
                      checked={checked}
                      onChange={() => setPriceIntent(option.value)}
                      className="mt-1 accent-sage-600"
                    />
                    <span>
                      <span className="block text-base font-semibold">
                        {option.title}
                      </span>
                      <span className="mt-1 block text-lg font-semibold text-navy-800">
                        {option.price}
                      </span>
                      <span className="mt-1 block text-base leading-6 text-navy-600">
                        {option.body}
                      </span>
                    </span>
                  </span>
                </label>
              );
            })}
          </div>

          {submitted ? (
            <div className="mt-5 rounded-xl border border-sage-200 bg-white px-4 py-3 text-base leading-7 text-navy-600">
              Saved. This is now counted as a paid-intent signal, not a product
              purchase or medical recommendation.
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              <label className="block text-base font-semibold text-navy-700">
                Email for early access
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-base text-navy-800 outline-none transition placeholder:text-navy-300 focus:border-sage-300 focus:ring-2 focus:ring-sage-200"
                />
              </label>
              {error && <p className="text-base text-clay-600">{error}</p>}
              <CTAButton
                variant="primary"
                onClick={handleSubmit}
                disabled={!email.trim() || submitting}
              >
                {submitting ? 'Saving...' : 'Join early access'}
              </CTAButton>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white/90 p-5 text-base leading-7 text-navy-600 shadow-sm shadow-navy-800/5">
          <p className="font-semibold text-navy-800">Why this is not a store</p>
          <p className="mt-2">
            The first commercial test is whether caregivers want a clearer
            support plan and shortlist. Real product links should wait for
            sourcing, evidence review, labeling checks, and affiliate
            disclosure.
          </p>
        </div>
      </aside>
    </div>
  );
}
