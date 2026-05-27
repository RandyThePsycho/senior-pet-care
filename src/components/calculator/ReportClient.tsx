// src/components/calculator/ReportClient.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  DIMENSION_META,
  getRiskCopy,
} from '@/lib/scoring';
import { getAssessmentSnapshot } from '@/lib/assessmentStorage';
import { SYMPTOM_OPTIONS } from '@/types/assessment';
import type { AssessmentSnapshot } from '@/types/assessment';

interface ReportClientProps {
  assessmentId: string;
}

const DAYS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
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
    setSnapshot(getAssessmentSnapshot(assessmentId));
    setLoaded(true);
  }, [assessmentId]);

  // 加载中（避免 SSR / 首帧闪烁）
  if (!loaded) {
    return (
      <main className="min-h-screen bg-white px-6 py-10 text-navy-500">
        <p className="mx-auto max-w-3xl">Loading your report…</p>
      </main>
    );
  }

  // Empty state：找不到本地数据
  if (!snapshot) {
    return (
      <main className="min-h-screen bg-cream-50 px-6 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-navy-100 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-navy-800">
            We couldn&apos;t find this report
          </h1>
          <p className="mt-2 text-navy-500">
            Reports are saved on the device where you completed the assessment.
            If you&apos;re on a different device, please run the assessment
            again.
          </p>
          <div className="mt-6">
            <Link
              href="/tools/senior-pet-quality-of-life-calculator"
              className="inline-flex items-center justify-center rounded-2xl bg-sage-600 px-6 py-3 font-semibold text-white hover:bg-sage-700"
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
  const riskCopy = getRiskCopy(result.riskLevel, petName);
  const symptomLabels = input.symptoms
    .map((s) => SYMPTOM_OPTIONS.find((o) => o.value === s)?.label ?? s);

  return (
    <main className="report-root min-h-screen bg-white px-6 py-8 text-[#1f2937]">
      <div className="mx-auto max-w-3xl">
        {/* 屏幕上的操作条（打印时隐藏） */}
        <div className="no-print mb-6 flex items-center justify-between gap-3 rounded-xl bg-[#f4eee4] px-4 py-3">
          <Link
            href={snapshot.journalUrl}
            className="text-sm font-medium text-[#465775] hover:text-[#2a3749]"
          >
            ← Back to journal
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="shrink-0 rounded-xl bg-[#54804d] px-4 py-2 text-sm font-semibold text-white"
          >
            Print / Save as PDF
          </button>
        </div>

        {/* 标题 */}
        <header className="mb-6 border-b border-[#e8ddca] pb-4">
          <h1 className="text-2xl font-bold">
            Quality of Life Report — {safeName}
          </h1>
          <p className="mt-1 text-sm text-[#647693]">
            {input.profile.petType === 'cat' ? 'Cat' : 'Dog'} · Prepared{' '}
            {formatDate(snapshot.createdAt)} · Based on the HHHHHMM scale
          </p>
        </header>

        {/* Summary */}
        <Section title="Quality of Life Summary">
          <div className="rounded-lg border border-[#e8ddca] p-4">
            <p className="text-sm text-[#647693]">Overall score</p>
            <p className="text-3xl font-bold">
              {result.totalScore}
              <span className="text-lg font-medium text-[#90a1b8]"> / 70</span>
            </p>
            <p className="mt-3 font-semibold">{riskCopy.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-[#36455e]">
              {riskCopy.headline} {riskCopy.body}
            </p>
          </div>
        </Section>

        {/* HHHHHMM Score Sheet */}
        <Section title="HHHHHMM Score Sheet">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#e8ddca] text-left">
                <th className="py-2">Dimension</th>
                <th className="py-2">What it measures</th>
                <th className="py-2 text-right">Score (0–10)</th>
              </tr>
            </thead>
            <tbody>
              {DIMENSION_META.map((m) => (
                <tr key={m.key} className="border-b border-[#f4eee4]">
                  <td className="py-2 font-medium">{m.label}</td>
                  <td className="py-2 text-[#647693]">{m.question}</td>
                  <td className="py-2 text-right font-semibold">
                    {input.scores[m.key]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* Low dimensions */}
        {result.lowDimensions.length > 0 && (
          <Section title="Areas Worth a Closer Look">
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {result.lowDimensions.map((d) => {
                const meta = DIMENSION_META.find((m) => m.key === d);
                return (
                  <li key={d}>
                    <span className="font-medium">{meta?.label ?? d}</span> —
                    rated {input.scores[d]} / 10
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        {/* Symptoms */}
        <Section title="Symptoms Noted">
          {symptomLabels.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {symptomLabels.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#647693]">None reported.</p>
          )}
        </Section>

        {/* Vet questions */}
        <Section title="Questions to Ask Your Vet">
          {vetQuestions.length > 0 ? (
            <ol className="list-decimal space-y-1 pl-5 text-sm">
              {vetQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-[#647693]">—</p>
          )}
        </Section>

        {/* 7-Day Tracker */}
        <Section title="7-Day Quality of Life Tracker">
          <p className="mb-2 text-sm text-[#647693]">
            Re-rate each dimension daily (0–10). Watch the trend, not a single
            day.
          </p>
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className="border border-[#e8ddca] bg-[#f4eee4] px-2 py-2 text-left">
                  Dimension
                </th>
                {DAYS.map((d) => (
                  <th
                    key={d}
                    className="border border-[#e8ddca] bg-[#f4eee4] px-2 py-2 text-left"
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DIMENSION_META.map((m) => (
                <tr key={m.key}>
                  <td className="border border-[#e8ddca] px-2 py-3 font-medium">
                    {m.label}
                  </td>
                  {DAYS.map((d) => (
                    <td
                      key={d}
                      className="border border-[#e8ddca] px-2 py-3"
                    >
                      &nbsp;
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* Next reassessment */}
        <Section title="Next Check-In">
          <p className="text-sm">
            We suggest re-assessing {safeName} around{' '}
            <span className="font-semibold">
              {formatDate(snapshot.nextReassessmentDate)}
            </span>
            . Small changes matter — tracking week by week helps you and your
            vet make good decisions together.
          </p>
        </Section>

        {/* Disclaimer */}
        <Section title="Important Note">
          <p className="text-xs leading-relaxed text-[#647693]">
            This report is for educational purposes only. It is not a veterinary
            diagnosis and does not replace professional veterinary advice.
            Quality-of-life scales are a starting point for observation and
            conversation, not a medical assessment. Always consult a licensed
            veterinarian about your pet&apos;s health and any decisions
            regarding their care.
          </p>
        </Section>
      </div>

      {/* 打印样式 */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .report-root {
            padding: 0;
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
      <h2 className="mb-3 text-lg font-bold text-[#2a3749]">{title}</h2>
      {children}
    </section>
  );
}
