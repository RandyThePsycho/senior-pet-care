// src/app/end-of-life/checklist/page.tsx
// A restrained support page only. No directory, city pages, provider listings, or product recommendations.

import type { Metadata } from 'next';
import Link from 'next/link';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pet End-of-Life Checklist',
  description:
    'A gentle, free checklist to help you prepare, ask the right questions, and talk with your vet.',
  alternates: {
    canonical: '/end-of-life/checklist',
  },
  openGraph: {
    title: 'Pet End-of-Life Checklist',
    description:
      'A gentle checklist for preparing questions and talking with your vet about senior pet comfort and end-of-life decisions.',
    url: '/end-of-life/checklist',
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 800,
        alt: 'A senior dog resting in soft natural light',
      },
    ],
  },
};

const CHECKLIST = [
  'Notice changes in comfort, appetite, mobility, breathing, and good vs. hard days.',
  'Talk with your veterinarian about quality of life, comfort, and what to expect.',
  'Ask what options are available, including in-home and in-clinic care.',
  'Prepare a calm, familiar space with favorite blankets, toys, or food.',
  'Decide who will be present, and how to gently involve children if needed.',
  'Consider aftercare options ahead of time, so you do not have to decide in the moment.',
  'Be gentle with yourself. There is no perfect timeline, only what is kind.',
];

const VET_QUESTIONS = [
  'What signs would tell us my pet is uncomfortable or declining quickly?',
  'What does the process look like, step by step?',
  'How do you keep my pet calm and free of pain?',
  'Can my family be present?',
  'What aftercare options and costs should we understand ahead of time?',
];

const GROUNDING_NOTES = [
  'You do not need to decide everything at once.',
  'A written list can make a hard conversation a little steadier.',
  'If your pet seems suddenly worse or distressed, contact a licensed veterinarian.',
];

export default function EndOfLifeChecklistPage() {
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
            Gentle planning resource
          </span>
        </nav>

        <header className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-sage-700">
              End-of-life care checklist
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2.55rem,5.5vw,4.8rem)] leading-[1.02] text-navy-800">
              A gentle way to prepare for a hard conversation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-navy-600">
              If you are here, you may be facing one of the hardest parts of
              loving a pet. This page is not here to push a decision. It is here
              to help you gather your thoughts before speaking with your vet.
            </p>
          </div>

          <aside className="rounded-lg border border-navy-100 bg-white/88 p-5 shadow-sm shadow-navy-800/5">
            <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
              GROUNDING NOTES
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-navy-600">
              {GROUNDING_NOTES.map((note) => (
                <li key={note} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-500"
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </aside>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <div className="rounded-lg border border-navy-100 bg-white/94 p-6 shadow-soft sm:p-7">
            <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
              PREPARATION CHECKLIST
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-navy-800">
              What to gather before the appointment
            </h2>
            <ul className="mt-6 space-y-4">
              {CHECKLIST.map((item, i) => (
                <li key={item} className="flex gap-4 text-navy-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sage-50 text-xs font-semibold tabular-nums text-sage-700">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-navy-100 bg-white/90 p-6 shadow-sm shadow-navy-800/5 sm:p-7">
            <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
              VET CONVERSATION
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-navy-800">
              Questions you can bring with you
            </h2>
            <ol className="mt-6 space-y-4">
              {VET_QUESTIONS.map((q, i) => (
                <li key={q} className="flex gap-4 text-navy-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cream-100 text-xs font-semibold tabular-nums text-navy-500">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-7">{q}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-lg bg-cream-100 px-4 py-3 text-sm leading-6 text-navy-500">
              Costs, availability, and details vary by veterinarian and
              location. Confirm directly with any provider you contact.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-navy-100 bg-white/80 p-6 shadow-sm shadow-navy-800/5">
          <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
            ETHICAL BOUNDARY
          </p>
          <p className="mt-3 max-w-3xl leading-7 text-navy-600">
            This page intentionally does not recommend products, providers, or
            sales offers. For end-of-life decisions, the next step should be a
            calm conversation with a licensed veterinarian who knows your pet.
          </p>
        </section>

        <div className="mt-10">
          <MedicalDisclaimer context="end_of_life" />
        </div>
      </div>
    </main>
  );
}
