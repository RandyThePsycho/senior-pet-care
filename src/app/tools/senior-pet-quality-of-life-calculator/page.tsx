// src/app/tools/senior-pet-quality-of-life-calculator/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/calculator/CalculatorClient';
import DataPrivacyNote from '@/components/common/DataPrivacyNote';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pet Quality of Life Calculator (HHHHHMM Scale)',
  description:
    'A free, gentle quality-of-life calculator for aging or senior dogs and cats. Create a printable score summary, vet questions, and a 7-day follow-up journal.',
  alternates: {
    canonical: '/tools/senior-pet-quality-of-life-calculator',
  },
  openGraph: {
    title: 'Pet Quality of Life Calculator (HHHHHMM Scale)',
    description:
      'Use a gentle HHHHHMM-based calculator to organize changes, prepare vet questions, and create a printable report with a 7-day follow-up journal.',
    url: '/tools/senior-pet-quality-of-life-calculator',
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

export default function CalculatorPage() {
  return (
    <main id="main-content" className="min-h-screen overflow-x-hidden bg-cream-50">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-10">
        <nav className="flex items-center justify-between border-b border-navy-100/80 pb-5">
          <Link
            href="/"
            className="text-base font-semibold text-navy-500 transition-colors hover:text-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            ← Senior Pet Care
          </Link>
          <span className="hidden text-sm text-navy-400 sm:block">
            HHHHHMM assessment
          </span>
        </nav>

        <header className="mb-10 mt-12 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
          <div>
            <p className="mb-4 text-base font-semibold text-sage-700">
              Quality-of-life calculator
            </p>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.03] text-navy-800 sm:text-6xl lg:text-7xl">
              Pet Quality of Life Calculator
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-navy-600">
              In about 3 minutes, turn what you are noticing into a score
              summary, vet questions, a printable report, and a 7-day follow-up
              journal.
            </p>
          </div>
          <aside className="paper-panel rounded-2xl p-6 text-base leading-7 text-navy-600">
            <p>
              This is not a diagnosis. It helps you organize observations
              before talking with a licensed veterinarian.
            </p>
            <p className="mt-4 rounded-xl bg-cream-100 px-4 py-3 text-base leading-7 text-navy-700">
              HHHHHMM looks at pain, eating, drinking, cleanliness, joy,
              movement, and whether good days still outnumber difficult ones.
            </p>
            <div className="mt-5 border-t border-navy-100 pt-4">
              <p className="text-sm font-semibold text-navy-400">
                AFTER SUBMIT
              </p>
              <ul className="mt-3 space-y-2 text-base text-navy-600">
                <li>Printable score summary</li>
                <li>Vet questions based on lower-scoring areas</li>
                <li>7-day reassessment and care journal link</li>
              </ul>
            </div>
          </aside>
        </header>

        <section className="paper-panel rounded-2xl p-5 sm:p-8">
          <div className="mb-6 rounded-xl bg-cream-100 px-5 py-4 text-base leading-7 text-navy-700">
            Step 1 of 3: pet basics, HHHHHMM ratings, then symptoms. Email is
            optional after results if you want the report and journal links.
          </div>
          <CalculatorClient />
        </section>

        <section className="mt-6">
          <DataPrivacyNote compact />
        </section>
      </div>
    </main>
  );
}
