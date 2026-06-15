// src/components/calculator/EmailCaptureForm.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CTAButton from '@/components/common/CTAButton';
import DataPrivacyNote from '@/components/common/DataPrivacyNote';
import { track } from '@/lib/analytics';
import { saveAssessmentSnapshot } from '@/lib/assessmentStorage';
import {
  getAttributionSnapshot,
  getAttributionSource,
} from '@/lib/attribution';
import type {
  AssessmentInput,
  AssessmentResult,
  AssessmentSnapshot,
  ReassessmentContext,
} from '@/types/assessment';

interface EmailCaptureFormProps {
  input: AssessmentInput;
  result: AssessmentResult;
  vetQuestions: string[];
  reassessmentContext?: ReassessmentContext;
}

interface SubscribeResponse {
  ok: boolean;
  subscriberId?: string;
  petId?: string;
  assessmentId?: string;
  reportUrl?: string;
  journalUrl?: string;
  reassessmentUrl?: string;
  nextReassessmentDate?: string;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailCaptureForm({
  input,
  result,
  vetQuestions,
  reassessmentContext,
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SubscribeResponse | null>(null);

  const petName = input.profile.petName;
  const safeName = petName.trim() || 'your pet';

  // 成功展示 Report / Journal CTA 时埋点
  useEffect(() => {
    if (success?.ok) {
      track('report_cta_shown', { assessmentId: success.assessmentId });
      track('journal_cta_shown', { petId: success.petId });
    }
  }, [success]);

  async function handleSubmit() {
    if (!EMAIL_RE.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitting(true);
    track('email_subscribe_started', {});

    try {
      const attribution = getAttributionSnapshot();
      const res = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: getAttributionSource('calculator_result'),
          attribution,
          tags: result.tags,
          petProfile: {
            petName: input.profile.petName,
            petType: input.profile.petType,
            age: input.profile.age,
            weight: input.profile.weight,
            weightUnit: input.profile.weightUnit,
            size: input.profile.size,
            conditions: input.profile.conditions,
          },
          resultSummary: {
            totalScore: result.totalScore,
            riskLevel: result.riskLevel,
            lowDimensions: result.lowDimensions,
            urgentFlag: result.urgentFlag,
          },
          // 完整评估数据（供 Supabase 持久化；不影响 UI）
          scores: input.scores,
          symptoms: input.symptoms,
          vetQuestions,
          // 复评上下文：让 API 复用同一 petId，并把 reassessmentOf 串进链接
          existingPetId: reassessmentContext?.existingPetId,
          reassessmentMode: reassessmentContext?.reassessmentMode,
          reassessmentSource: reassessmentContext?.reassessmentSource,
          reassessmentOf: reassessmentContext?.reassessmentOf,
        }),
      });

      const data = (await res.json()) as SubscribeResponse;

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Subscribe failed');
      }

      // 保存快照到 localStorage，供 Report / Journal 读取
      if (data.assessmentId && data.petId) {
        const snapshot: AssessmentSnapshot = {
          assessmentId: data.assessmentId,
          petId: data.petId,
          email,
          input,
          result,
          vetQuestions,
          createdAt: new Date().toISOString(),
          nextReassessmentDate:
            data.nextReassessmentDate ?? new Date().toISOString(),
          reportUrl: data.reportUrl ?? `/reports/${data.assessmentId}`,
          journalUrl: data.journalUrl ?? `/journal/${data.petId}`,
          reassessmentUrl:
            data.reassessmentUrl ??
            `/tools/senior-pet-quality-of-life-calculator?petId=${data.petId}&reassessment=7d&source=email`,
          reassessmentOf: reassessmentContext?.reassessmentOf,
        };
        saveAssessmentSnapshot(snapshot);
        track('reassessment_link_created', {
          reassessmentUrl: snapshot.reassessmentUrl,
        });
      }

      track('email_submitted', { tags: result.tags });
      track('email_subscribe_succeeded', { assessmentId: data.assessmentId });
      setSuccess(data);
    } catch {
      track('email_subscribe_failed', {});
      setError(
        "Something went wrong on our end. Please try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  // 成功态：显示报告 + Journal 链接 + 复评提醒文案
  if (success?.ok) {
    return (
      <div className="rounded-lg border border-sage-200 bg-sage-50 p-6 shadow-sm shadow-sage-700/10">
        <p className="font-display text-2xl leading-tight text-navy-800">
          Your report and journal are ready.
        </p>
        <p className="mt-2 leading-7 text-navy-600">
          Use the report for vet questions now, then come back to the journal
          to reassess {safeName} in 7 days.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href={success.reportUrl ?? '#'}
            onClick={() =>
              track('report_download_clicked', {
                assessmentId: success.assessmentId,
              })
            }
            className="inline-flex items-center justify-center rounded-lg bg-sage-600 px-6 py-3 text-base font-semibold text-white shadow-soft shadow-sage-700/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sage-700 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            Open printable report
          </Link>
          <Link
            href={success.journalUrl ?? '#'}
            onClick={() => track('journal_opened', { petId: success.petId })}
            className="inline-flex items-center justify-center rounded-lg border border-navy-200 bg-white px-6 py-3 text-base font-semibold text-navy-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-cream-100 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-300"
          >
            Open my care journal
          </Link>
        </div>
      </div>
    );
  }

  // 默认态：邮箱输入
  return (
    <div className="rounded-lg border border-navy-100 bg-white p-6 shadow-sm shadow-navy-800/5">
      <h3 className="font-display text-2xl leading-tight text-navy-800">
        Get the printable report and 7-day journal
      </h3>
      <p className="mt-2 text-sm leading-6 text-navy-500">
        We&apos;ll create a report with {safeName}&apos;s score summary,
        lower-scoring areas, vet questions, and a 7-day reassessment link.
      </p>
      <ul className="mt-4 grid gap-2 text-sm text-navy-600 sm:grid-cols-3">
        <li className="rounded-lg bg-cream-100 px-3 py-2">
          Printable vet-prep summary
        </li>
        <li className="rounded-lg bg-cream-100 px-3 py-2">
          Care journal link
        </li>
        <li className="rounded-lg bg-cream-100 px-3 py-2">
          7-day reassessment reminder
        </li>
      </ul>
      <div className="mt-4">
        <DataPrivacyNote compact />
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          disabled={submitting}
          className="flex-1 rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-700 transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-300 disabled:opacity-60"
        />
        <CTAButton onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Sending…' : 'Send report and journal'}
        </CTAButton>
      </div>
      {error && <p className="mt-2 text-sm text-clay-600">{error}</p>}
      <p className="mt-3 text-xs text-navy-400">
        We&apos;ll use your email to send this report and follow-up reminders.
        Unsubscribe anytime.
      </p>
    </div>
  );
}
