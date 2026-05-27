// src/app/end-of-life/checklist/page.tsx
// 极简、温柔的临终准备清单占位页。
// 不做 Directory、不做城市页、不做服务商列表、不含任何产品推荐。

import type { Metadata } from 'next';
import Link from 'next/link';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Pet End-of-Life Checklist',
  description:
    'A gentle, free checklist to help you prepare, ask the right questions, and talk with your vet.',
};

const CHECKLIST = [
  'Notice the changes: keep a simple record of comfort, appetite, mobility, and good vs. hard days.',
  'Talk with your vet about quality of life, comfort, and what to expect.',
  'Ask what options are available, including in-home and in-clinic care.',
  'Prepare a calm, familiar space with favorite blankets, toys, or food.',
  'Decide who will be present, and how to gently involve children if needed.',
  'Consider aftercare options ahead of time, so you are not deciding in the moment.',
  'Be gentle with yourself — there is no perfect timeline, only what is kind.',
];

const VET_QUESTIONS = [
  'What does the process look like, step by step?',
  'How do you keep my pet calm and free of pain?',
  'Can my family be present?',
  'What aftercare options do you offer?',
  'What are the costs involved?',
];

export default function EndOfLifeChecklistPage() {
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
            Preparing for your pet&apos;s end-of-life care
          </h1>
          <p className="mt-3 leading-relaxed text-navy-600">
            If you&apos;re here, you&apos;re likely facing one of the hardest
            parts of loving a pet. Take your time. This is a gentle guide — not
            a push in any direction.
          </p>
        </header>

        <section className="rounded-3xl border border-navy-100 bg-white p-6">
          <h2 className="text-xl font-bold text-navy-800">
            A gentle preparation checklist
          </h2>
          <ul className="mt-4 space-y-3">
            {CHECKLIST.map((item, i) => (
              <li key={i} className="flex gap-3 text-navy-700">
                <span
                  aria-hidden="true"
                  className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sage-500"
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 rounded-3xl border border-navy-100 bg-white p-6">
          <h2 className="text-xl font-bold text-navy-800">
            Questions to ask an in-home euthanasia vet
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-navy-700">
            {VET_QUESTIONS.map((q, i) => (
              <li key={i} className="leading-relaxed">
                {q}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-navy-400">
            Costs and details vary — please confirm directly with any provider
            you contact.
          </p>
        </section>

        <div className="mt-10">
          <MedicalDisclaimer context="end_of_life" />
        </div>
      </div>
    </main>
  );
}
