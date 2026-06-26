// src/app/share-your-situation/page.tsx
// Lightweight demand-intake page. Submit writes through /api/need-submissions when Supabase is configured.

import type { Metadata } from 'next';
import Link from 'next/link';
import ShareSituationForm from './ShareSituationForm';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Tell Us What Would Help With Your Senior Pet',
  description:
    'Tell us what you are noticing, where you feel stuck, and what kind of senior pet care resource would help most.',
  alternates: {
    canonical: '/share-your-situation',
  },
  openGraph: {
    title: 'Tell Us What Would Help With Your Senior Pet',
    description:
      'Share what you are noticing, where you feel stuck, and what kind of senior pet care resource would help most.',
    url: '/share-your-situation',
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

export default function ShareYourSituationPage() {
  return (
    <main id="main-content" className="min-h-screen overflow-x-hidden bg-cream-50">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
        <nav className="flex items-center justify-between border-b border-navy-100/80 pb-5">
          <Link
            href="/"
            className="text-sm font-semibold text-navy-500 transition hover:text-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            Back to home
          </Link>
          <span className="hidden text-sm text-navy-400 sm:block">
            Help us understand what would actually help
          </span>
        </nav>

        <header className="mt-10 grid gap-7 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-sage-700">
              Share what would help with your senior pet
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2.55rem,5.5vw,4.75rem)] leading-[1.02] text-navy-800">
              What are you trying to figure out right now?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-navy-600">
              We can&apos;t diagnose your pet, but your answers help us
              understand the real moments where senior pet parents feel stuck:
              what they notice, what they need, and what would make the next
              few days easier.
            </p>
          </div>

          <aside className="rounded-lg border border-navy-100 bg-white/88 p-5 text-sm leading-6 text-navy-500 shadow-sm shadow-navy-800/5">
            <p className="text-sm font-semibold text-navy-500">
              What this is
            </p>
            <p className="mt-3">
              A short needs-intake form. It is not medical consultation,
              customer support, or a promise of a reply.
            </p>
          </aside>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.66fr] lg:items-start">
          <div className="rounded-lg border border-navy-100 bg-white/94 p-6 shadow-soft sm:p-8">
            <ShareSituationForm />
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-navy-100 bg-white/88 p-5 shadow-sm shadow-navy-800/5">
              <p className="text-sm font-semibold text-sage-700">
                Why this helps
              </p>
              <p className="mt-3 text-sm leading-7 text-navy-600">
                We are looking for the gap between what people notice and what
                they wish they had next: a tracker, a checklist, vet questions,
                home-care guidance, or a calmer way to think through hard
                decisions.
              </p>
            </div>

            <div className="rounded-lg border border-navy-100 bg-white/88 p-5 shadow-sm shadow-navy-800/5">
              <p className="text-sm font-semibold text-navy-500">
                What we will learn
              </p>
              <p className="mt-3 text-sm leading-7 text-navy-600">
                Over time, these submissions can show which resources deserve
                priority first, based on repeated pain points rather than
                guesses.
              </p>
            </div>

            <div className="rounded-lg border border-navy-100 bg-cream-100/80 p-5 shadow-sm shadow-navy-800/5">
              <p className="text-sm font-semibold text-navy-500">
                What to share
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-navy-600">
                <li>What changed recently</li>
                <li>What feels confusing or hard</li>
                <li>What kind of help you would actually use</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
