// src/components/calculator/JournalClient.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CTAButton from '@/components/common/CTAButton';
import DataPrivacyNote from '@/components/common/DataPrivacyNote';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import { getPetJournal } from '@/lib/assessmentStorage';
import { getRiskCopy } from '@/lib/scoring';
import { track } from '@/lib/analytics';
import type { AssessmentSnapshot } from '@/types/assessment';

interface JournalClientProps {
  petId: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function reassessHref(petId: string, reassessmentOf?: string): string {
  const base = `/tools/senior-pet-quality-of-life-calculator?petId=${petId}&reassessment=manual&source=journal`;
  return reassessmentOf ? `${base}&reassessmentOf=${reassessmentOf}` : base;
}

export default function JournalClient({ petId }: JournalClientProps) {
  const [history, setHistory] = useState<AssessmentSnapshot[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/journal/${petId}`);
        if (res.ok) {
          const data = (await res.json()) as {
            ok: boolean;
            history?: AssessmentSnapshot[];
          };
          if (!cancelled && data.ok && data.history && data.history.length > 0) {
            setHistory(data.history);
            setLoaded(true);
            return;
          }
        }
      } catch {
        // Local storage fallback keeps the journal usable while offline or in dev.
      }

      if (!cancelled) {
        setHistory(getPetJournal(petId));
        setLoaded(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [petId]);

  const latest = history.length > 0 ? history[history.length - 1] : null;
  const trendDelta =
    history.length > 1 && latest
      ? latest.result.totalScore - history[history.length - 2].result.totalScore
      : null;

  return (
    <main className="min-h-screen overflow-x-hidden bg-cream-50">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
        <nav className="flex items-center justify-between border-b border-navy-100/80 pb-5">
          <Link
            href="/"
            className="text-sm font-semibold text-navy-500 transition hover:text-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            Back to home
          </Link>
          <span className="hidden text-sm text-navy-400 sm:block">
            Care journal
          </span>
        </nav>

        <header className="mt-10 grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-sage-700">
              My Senior Pet Care Journal
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] text-navy-800">
              A calmer record of what&apos;s changing.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-navy-600">
              Keep each assessment connected to the next, so your vet
              conversation can focus on patterns, not memory.
            </p>
          </div>
          <aside className="rounded-lg border border-navy-100 bg-white/88 p-5 shadow-sm shadow-navy-800/5">
            <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
              JOURNAL ID
            </p>
            <p className="mt-3 break-all text-xs leading-5 text-navy-500">
              {petId}
            </p>
          </aside>
        </header>

        <section className="mt-6">
          <DataPrivacyNote compact />
        </section>

        {!loaded && (
          <section className="mt-10 rounded-lg border border-navy-100 bg-white/90 p-6 text-navy-500 shadow-sm">
            Loading your journal...
          </section>
        )}

        {loaded && !latest && (
          <section className="mt-10 rounded-lg border border-navy-100 bg-white/90 p-8 text-center shadow-soft">
            <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
              NO CHECK-INS YET
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-navy-800">
              Start with one assessment
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-navy-500">
              Journals are saved through your assessment record. Run the
              calculator once to begin tracking your senior pet over time.
            </p>
            <div className="mt-7">
              <CTAButton
                href="/tools/senior-pet-quality-of-life-calculator"
                fullWidth
              >
                Start an assessment
              </CTAButton>
            </div>
          </section>
        )}

        {loaded && latest && (
          <>
            <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:items-start">
              <div className="rounded-lg border border-navy-100 bg-white/94 p-6 shadow-soft sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold tracking-[0.16em] text-navy-400">
                      {(latest.input.profile.petName.trim() || 'Your pet').toUpperCase()}{' '}
                      · {latest.input.profile.petType === 'cat' ? 'CAT' : 'DOG'}
                    </p>
                    <p className="mt-5 text-6xl font-bold tabular-nums text-navy-800">
                      {latest.result.totalScore}
                      <span className="text-3xl font-medium text-navy-400">
                        {' '}
                        / 70
                      </span>
                    </p>
                    <p className="mt-2 text-xl font-semibold text-navy-700">
                      {getRiskCopy(latest.result.riskLevel, '').label}
                    </p>
                    <p className="mt-2 text-sm text-navy-500">
                      Recorded {formatDate(latest.createdAt)}
                    </p>
                  </div>
                  {trendDelta !== null && (
                    <div className="rounded-lg border border-navy-100 bg-cream-50 px-4 py-3 text-sm">
                      <p className="font-semibold text-navy-700">
                        Latest change
                      </p>
                      <p className="mt-1 tabular-nums text-navy-500">
                        {trendDelta > 0 ? '+' : ''}
                        {trendDelta} points from last check-in
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <InfoTile
                    label="Next suggested check-in"
                    value={formatDate(latest.nextReassessmentDate)}
                  />
                  <InfoTile
                    label="Saved assessments"
                    value={`${history.length}`}
                  />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <CTAButton
                    href={reassessHref(petId, latest.assessmentId)}
                    onClick={() =>
                      track('reassessment_clicked', { source: 'journal' })
                    }
                  >
                    Reassess now
                  </CTAButton>
                  <Link
                    href={latest.reportUrl}
                    className="inline-flex items-center justify-center rounded-lg border border-navy-100 bg-white px-5 py-3 text-sm font-semibold text-sage-700 transition hover:border-sage-200 hover:bg-sage-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
                  >
                    View latest printable report
                  </Link>
                </div>
              </div>

              <aside className="rounded-lg border border-navy-100 bg-white/88 p-5 shadow-sm shadow-navy-800/5">
                <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
                  WHY RETURN IN 7 DAYS
                </p>
                <p className="mt-4 text-sm leading-7 text-navy-600">
                  A single score can be noisy. A second check-in gives you a
                  clearer pattern to bring to your next vet conversation.
                </p>
              </aside>
            </section>

            {history.length > 1 && (
              <section className="mt-6 rounded-lg border border-navy-100 bg-white/90 p-6 shadow-sm shadow-navy-800/5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
                      HISTORY
                    </p>
                    <h2 className="mt-2 font-display text-3xl leading-tight text-navy-800">
                      Assessment timeline
                    </h2>
                  </div>
                  <p className="text-sm text-navy-500">
                    Newest assessments appear first.
                  </p>
                </div>
                <ul className="mt-5 space-y-3">
                  {[...history].reverse().map((s) => (
                    <li
                      key={s.assessmentId}
                      className="grid gap-3 rounded-lg bg-cream-100 px-4 py-3 text-sm sm:grid-cols-[1fr_auto_auto] sm:items-center"
                    >
                      <span className="text-navy-600">
                        {formatDate(s.createdAt)}
                      </span>
                      <span className="font-semibold text-navy-800">
                        {getRiskCopy(s.result.riskLevel, '').label}
                      </span>
                      <span className="font-semibold tabular-nums text-navy-800">
                        {s.result.totalScore} / 70
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        <div className="mt-10">
          <MedicalDisclaimer />
        </div>
      </div>
    </main>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-cream-100 px-4 py-3">
      <p className="text-xs font-semibold tracking-[0.14em] text-navy-400">
        {label.toUpperCase()}
      </p>
      <p className="mt-2 text-lg font-semibold text-navy-800">{value}</p>
    </div>
  );
}
