// src/components/calculator/ReportClient.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DIMENSION_META, getRiskCopy } from '@/lib/scoring';
import { getAssessmentSnapshot } from '@/lib/assessmentStorage';
import { SYMPTOM_OPTIONS } from '@/types/assessment';
import type { AssessmentSnapshot, RiskLevel } from '@/types/assessment';

interface ReportClientProps {
  assessmentId: string;
}

const DAYS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

const RISK_STYLES: Record<RiskLevel, string> = {
  stable: 'border-sage-200 bg-sage-50 text-sage-700',
  needs_monitoring: 'border-amber-200 bg-amber-50 text-amber-700',
  vet_visit: 'border-orange-200 bg-orange-50 text-orange-700',
  end_of_life: 'border-navy-200 bg-navy-50 text-navy-700',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ReportClient({ assessmentId }: ReportClientProps) {
  const [snapshot, setSnapshot] = useState<AssessmentSnapshot | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/assessments/${assessmentId}`);
        if (res.ok) {
          const data = (await res.json()) as {
            ok: boolean;
            snapshot?: AssessmentSnapshot;
          };
          if (!cancelled && data.ok && data.snapshot) {
            setSnapshot(data.snapshot);
            setLoaded(true);
            return;
          }
        }
      } catch {
        // Local storage fallback keeps the report usable while offline or in dev.
      }

      if (!cancelled) {
        setSnapshot(getAssessmentSnapshot(assessmentId));
        setLoaded(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [assessmentId]);

  if (!loaded) {
    return (
      <main className="min-h-screen bg-cream-50 px-5 py-10 text-navy-600">
        <div className="mx-auto max-w-3xl rounded-lg border border-navy-100 bg-white/86 p-6 shadow-sm">
          Loading your printable report...
        </div>
      </main>
    );
  }

  if (!snapshot) {
    return (
      <main className="min-h-screen bg-cream-50 px-5 py-16">
        <div className="mx-auto max-w-xl rounded-lg border border-navy-100 bg-white/90 p-8 text-center shadow-soft">
          <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
            REPORT NOT FOUND
          </p>
          <h1 className="mt-3 font-display text-3xl leading-tight text-navy-800">
            We could not find this report
          </h1>
          <p className="mt-3 leading-7 text-navy-500">
            Reports are tied to the assessment record that created them. If
            you&apos;re using a different device, please run the assessment again.
          </p>
          <div className="mt-7">
            <Link
              href="/tools/senior-pet-quality-of-life-calculator"
              className="inline-flex items-center justify-center rounded-lg bg-sage-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sage-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            >
              Back to the calculator
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const { input, result, vetQuestions } = snapshot;
  const petName = input.profile.petName;
  const safeName = petName.trim() || 'Your pet';
  const petType = input.profile.petType === 'cat' ? 'Cat' : 'Dog';
  const riskCopy = getRiskCopy(result.riskLevel, petName);
  const symptomLabels = input.symptoms.map(
    (s) => SYMPTOM_OPTIONS.find((o) => o.value === s)?.label ?? s
  );

  return (
    <main className="report-root min-h-screen bg-cream-50 px-5 py-6 text-navy-800 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <nav className="no-print mb-8 flex items-center justify-between gap-4 border-b border-navy-100/80 pb-5">
          <Link
            href={snapshot.journalUrl}
            className="text-sm font-semibold text-navy-500 transition hover:text-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            Back to your journal
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-sage-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-800 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            Print or save as PDF
          </button>
        </nav>

        <article className="overflow-hidden rounded-lg border border-navy-100 bg-white/94 shadow-soft">
          <header className="border-b border-navy-100 bg-white px-6 py-7 sm:px-8 sm:py-9">
            <p className="text-sm font-semibold tracking-[0.16em] text-sage-700">
              SENIOR PET CARE REPORT
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_16rem] lg:items-end">
              <div>
                <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-navy-800">
                  Quality-of-life summary for {safeName}
                </h1>
                <p className="mt-4 text-sm leading-6 text-navy-500">
                  {petType} · Prepared {formatDate(snapshot.createdAt)} · Based
                  on the HHHHHMM scale
                </p>
              </div>
              <div className="rounded-lg border border-navy-100 bg-cream-50 p-5">
                <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
                  OVERALL SCORE
                </p>
                <p className="mt-3 text-5xl font-bold tabular-nums text-navy-800">
                  {result.totalScore}
                  <span className="text-2xl font-medium text-navy-400">
                    {' '}
                    / 70
                  </span>
                </p>
                <p
                  className={`mt-4 inline-flex rounded-md border px-3 py-1 text-sm font-semibold ${RISK_STYLES[result.riskLevel]}`}
                >
                  {riskCopy.label}
                </p>
              </div>
            </div>
          </header>

          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_18rem]">
            <div>
              <Section title="Quality of Life Summary">
                <p className="max-w-2xl text-sm leading-7 text-navy-600">
                  {riskCopy.headline} {riskCopy.body}
                </p>
              </Section>

              <Section title="HHHHHMM Score Sheet">
                <div className="overflow-x-auto rounded-lg border border-navy-100">
                  <table className="w-full min-w-[620px] border-collapse text-sm">
                    <thead>
                      <tr className="bg-cream-100 text-left text-navy-500">
                        <th className="px-4 py-3 font-semibold">Dimension</th>
                        <th className="px-4 py-3 font-semibold">
                          What it measures
                        </th>
                        <th className="px-4 py-3 text-right font-semibold">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {DIMENSION_META.map((m) => (
                        <tr key={m.key} className="border-t border-navy-100">
                          <td className="px-4 py-3 font-semibold text-navy-800">
                            {m.label}
                          </td>
                          <td className="px-4 py-3 leading-6 text-navy-500">
                            {m.question}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold tabular-nums text-navy-800">
                            {input.scores[m.key]} / 10
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              {result.lowDimensions.length > 0 && (
                <Section title="Areas Worth a Closer Look">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {result.lowDimensions.map((d) => {
                      const meta = DIMENSION_META.find((m) => m.key === d);
                      return (
                        <li
                          key={d}
                          className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-navy-700"
                        >
                          <span className="font-semibold">
                            {meta?.label ?? d}
                          </span>
                          <span className="block pt-1 text-navy-500">
                            Rated {input.scores[d]} / 10
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </Section>
              )}

              <Section title="Symptoms Noted">
                {symptomLabels.length > 0 ? (
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {symptomLabels.map((s, i) => (
                      <li
                        key={i}
                        className="rounded-lg bg-cream-100 px-4 py-3 text-sm text-navy-600"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-navy-500">None reported.</p>
                )}
              </Section>

              <Section title="Questions to Ask Your Vet">
                {vetQuestions.length > 0 ? (
                  <ol className="space-y-3">
                    {vetQuestions.map((q, i) => (
                      <li key={i} className="flex gap-3 text-sm text-navy-700">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sage-50 text-xs font-semibold tabular-nums text-sage-700">
                          {i + 1}
                        </span>
                        <span className="pt-1 leading-6">{q}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-navy-500">-</p>
                )}
              </Section>

              <Section title="7-Day Quality of Life Tracker">
                <p className="mb-4 max-w-2xl text-sm leading-7 text-navy-500">
                  Re-rate each dimension daily from 0 to 10. Watch the trend,
                  not a single day.
                </p>
                <div className="overflow-x-auto rounded-lg border border-navy-100">
                  <table className="w-full min-w-[720px] border-collapse text-xs">
                    <thead>
                      <tr className="bg-cream-100 text-navy-600">
                        <th className="border-r border-navy-100 px-3 py-3 text-left">
                          Dimension
                        </th>
                        {DAYS.map((d) => (
                          <th
                            key={d}
                            className="border-r border-navy-100 px-3 py-3 text-left last:border-r-0"
                          >
                            {d}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {DIMENSION_META.map((m) => (
                        <tr key={m.key} className="border-t border-navy-100">
                          <td className="border-r border-navy-100 px-3 py-4 font-semibold text-navy-700">
                            {m.label}
                          </td>
                          {DAYS.map((d) => (
                            <td
                              key={d}
                              className="border-r border-navy-100 px-3 py-4 last:border-r-0"
                            >
                              &nbsp;
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            </div>

            <aside className="space-y-4">
              <div className="rounded-lg border border-navy-100 bg-cream-50 p-5">
                <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
                  NEXT CHECK-IN
                </p>
                <p className="mt-3 text-2xl font-semibold leading-tight text-navy-800">
                  {formatDate(snapshot.nextReassessmentDate)}
                </p>
                <p className="mt-3 text-sm leading-6 text-navy-500">
                  A short reassessment helps you compare this week with next
                  week before speaking with your vet.
                </p>
              </div>
              <div className="rounded-lg border border-navy-100 bg-white p-5">
                <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
                  REPORT ID
                </p>
                <p className="mt-3 break-all text-xs leading-5 text-navy-500">
                  {assessmentId}
                </p>
              </div>
            </aside>
          </div>

          <footer className="border-t border-navy-100 bg-cream-50 px-6 py-6 sm:px-8">
            <p className="max-w-3xl text-xs leading-6 text-navy-500">
              <span className="font-semibold text-navy-700">
                Important note:{' '}
              </span>
              This report is for educational purposes only. It is not a
              veterinary diagnosis and does not replace professional veterinary
              advice. Quality-of-life scales are a starting point for observing
              changes and preparing for a conversation, not a medical
              assessment. Always
              consult a licensed veterinarian about your pet&apos;s health and
              any decisions regarding their care.
            </p>
          </footer>
        </article>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .report-root {
            background: white !important;
            padding: 0 !important;
          }
          .report-section {
            break-inside: avoid;
          }
          @page {
            margin: 1.5cm;
          }
        }
      `}</style>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="report-section mb-8">
      <h2 className="mb-4 font-display text-2xl leading-tight text-navy-800">
        {title}
      </h2>
      {children}
    </section>
  );
}
