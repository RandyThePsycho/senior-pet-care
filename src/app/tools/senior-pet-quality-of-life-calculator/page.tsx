// src/app/tools/senior-pet-quality-of-life-calculator/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/calculator/CalculatorClient';

export const metadata: Metadata = {
  title: 'Pet Quality of Life Calculator (HHHHHMM Scale)',
  description:
    'A free, gentle quality-of-life calculator for senior dogs and cats. Get a clear, non-diagnostic picture of how your pet is doing — and what to track next.',
};

export default function CalculatorPage() {
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
          <h1 className="text-3xl font-bold text-navy-800 sm:text-4xl">
            Pet Quality of Life Calculator
          </h1>
          <p className="mt-2 text-lg text-navy-500">
            Based on the HHHHHMM scale, used by veterinarians to help reflect on
            a senior pet&apos;s comfort and wellbeing.
          </p>
        </header>

        <CalculatorClient />
      </div>
    </main>
  );
}
