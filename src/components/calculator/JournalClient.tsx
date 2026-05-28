// src/components/calculator/JournalClient.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CTAButton from '@/components/common/CTAButton';
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
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// 复评链接（manual 模式，来源 journal）
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
      // 1) 先尝试 Supabase（经 API）
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
        // 忽略，走 fallback
      }
      // 2) fallback：localStorage
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

  return (
    <main className="min-h-screen bg-cream-50">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
        <Link
          href="/"
          className="text-sm font-medium text-navy-400 hover:text-navy-600"
        >
          ← Home
        </Link>

        <header className="mt-4 mb-8">
          <h1 className="text-3xl font-bold text-navy-800">
            My Senior Pet Care Journal
          </h1>
          <p className="mt-2 text-navy-500">
            A gentle place to track how your pet is doing over time.
          </p>
        </header>

        {!loaded && <p className="text-navy-400">Loading your journal…</p>}

        {/* Empty state */}
        {loaded && !latest && (
          <div className="rounded-3xl border border-navy-100 bg-white p-8 text-center">
            <h2 className="text-xl font-bold text-navy-800">
              No check-ins saved yet
            </h2>
            <p className="mt-2 text-navy-500">
              Journals are saved on the device where you completed the
              assessment. Run an assessment to start tracking.
            </p>
            <div className="mt-6">
              <CTAButton
                href="/tools/senior-pet-quality-of-life-calculator"
                fullWidth
              >
                Start an assessment
              </CTAButton>
            </div>
          </div>
        )}

        {/* 有数据 */}
        {loaded && latest && (
          <>
            {/* Pet summary */}
            <div className="rounded-3xl border border-navy-100 bg-white p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-navy-400">
                {latest.input.profile.petName.trim() || 'Your pet'} ·{' '}
                {latest.input.profile.petType === 'cat' ? 'Cat' : 'Dog'}
              </p>
              <p className="mt-3 text-4xl font-bold text-navy-800">
                {latest.result.totalScore}
                <span className="text-xl font-medium text-navy-400"> / 70</span>
              </p>
              <p className="mt-1 font-semibold text-navy-700">
                {getRiskCopy(latest.result.riskLevel, '').label}
              </p>
              <p className="mt-1 text-sm text-navy-500">
                Recorded {formatDate(latest.createdAt)}
              </p>
              <p className="mt-3 rounded-2xl bg-cream-100 px-4 py-3 text-sm text-navy-600">
                Next suggested check-in:{' '}
                <span className="font-semibold">
                  {formatDate(latest.nextReassessmentDate)}
                </span>
              </p>

              <div className="mt-4">
                <Link
                  href={latest.reportUrl}
                  className="text-sm font-semibold text-sage-700 hover:text-sage-600"
                >
                  View latest printable report →
                </Link>
              </div>
            </div>

            {/* 历史一览（若不止一次） */}
            {history.length > 1 && (
              <div className="mt-6 rounded-3xl border border-navy-100 bg-white p-6">
                <h3 className="text-lg font-bold text-navy-800">History</h3>
                <ul className="mt-3 space-y-2">
                  {[...history].reverse().map((s) => (
                    <li
                      key={s.assessmentId}
                      className="flex items-center justify-between rounded-2xl bg-cream-100 px-4 py-2 text-sm"
                    >
                      <span className="text-navy-500">
                        {formatDate(s.createdAt)}
                      </span>
                      <span className="font-semibold text-navy-800">
                        {s.result.totalScore} / 70
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reassess CTA */}
            <div className="mt-6">
              <CTAButton
                href={reassessHref(petId, latest.assessmentId)}
                onClick={() => track('reassessment_clicked', { source: 'journal' })}
                fullWidth
              >
                Reassess now
              </CTAButton>
            </div>
          </>
        )}

        {/* petId（便于验证链接机制） */}
        <p className="mt-8 break-all rounded-2xl bg-cream-100 px-4 py-3 text-xs text-navy-400">
          Journal ID: {petId}
        </p>

        {/* TODO: 接入后从 Supabase 按 petId 查询 assessments history（含趋势图）。 */}

        <div className="mt-10">
          <MedicalDisclaimer />
        </div>
      </div>
    </main>
  );
}
