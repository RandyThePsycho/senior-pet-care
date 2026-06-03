// src/app/tools/senior-pet-quality-of-life-calculator/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/calculator/CalculatorClient';
import DataPrivacyNote from '@/components/common/DataPrivacyNote';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pet Quality of Life Calculator (HHHHHMM Scale)',
  description:
    'A free, gentle quality-of-life calculator for senior dogs and cats. Get a clearer, non-diagnostic picture of how your pet is doing and what to track next.',
  alternates: {
    canonical: '/tools/senior-pet-quality-of-life-calculator',
  },
  openGraph: {
    title: 'Pet Quality of Life Calculator (HHHHHMM Scale)',
    description:
      'Use a gentle HHHHHMM-based calculator to organize observations, prepare vet questions, and create a 7-day follow-up journal.',
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
    <main className="min-h-screen overflow-x-hidden bg-cream-50">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
        <nav className="flex items-center justify-between border-b border-navy-100/80 pb-5">
          <Link
            href="/"
            className="text-sm font-semibold text-navy-500 transition-colors hover:text-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            ← Senior Pet Care
          </Link>
          <span className="hidden text-sm text-navy-400 sm:block">
            HHHHHMM assessment
          </span>
        </nav>

        <header className="mb-8 mt-10 grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-sage-700">
              Quality-of-life calculator
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2.6rem,6vw,4.75rem)] leading-[0.98] text-navy-800">
              Pet Quality of Life Calculator
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-navy-600">
              Based on the HHHHHMM scale, a framework often used to reflect on
              a senior pet&apos;s comfort and wellbeing.
            </p>
          </div>
          <aside className="rounded-lg border border-navy-100 bg-white/88 p-5 text-sm leading-6 text-navy-500 shadow-sm">
            <p>
              This is not a diagnosis. It helps you organize observations
              before talking with a licensed veterinarian.
            </p>
            <p className="mt-4 rounded-lg bg-cream-100 px-4 py-3 text-sm leading-6 text-navy-600">
              HHHHHMM looks at pain, eating, drinking, cleanliness, joy,
              movement, and whether good days still outnumber difficult ones.
            </p>
            <div className="mt-5 border-t border-navy-100 pt-4">
              <p className="text-xs font-semibold tracking-[0.14em] text-navy-400">
                AFTER SUBMIT
              </p>
              <ul className="mt-3 space-y-2 text-sm text-navy-600">
                <li>Printable report</li>
                <li>Vet questions</li>
                <li>7-day journal link</li>
              </ul>
            </div>
          </aside>
        </header>

        <section className="rounded-lg border border-navy-100 bg-white/90 p-5 shadow-soft sm:p-8">
          <CalculatorClient />
        </section>

        <section className="mt-6">
          <DataPrivacyNote compact />
        </section>
      </div>
    </main>
  );
}
