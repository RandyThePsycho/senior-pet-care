// src/app/share-your-situation/page.tsx
// Lightweight demand-intake page. Mock submit only; no Supabase, ESP, or admin dashboard.

import type { Metadata } from 'next';
import Link from 'next/link';
import ShareSituationForm from './ShareSituationForm';

export const metadata: Metadata = {
  title: "Share What's Going On With Your Senior Pet",
  description:
    'Tell us what you are noticing with your senior dog or cat. This is not medical consultation, but it can help you organize your thoughts before a vet visit.',
};

export default function ShareYourSituationPage() {
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
            Tell us what is happening
          </span>
        </nav>

        <header className="mt-10 grid gap-7 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-sage-700">
              Share what&apos;s going on with your senior pet
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2.55rem,5.5vw,4.75rem)] leading-[1.02] text-navy-800">
              Tell us what you&apos;re noticing.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-navy-600">
              We can&apos;t diagnose your pet, but your story helps us
              understand what senior pet parents need most. It may also help
              you organize your thoughts before talking with a vet.
            </p>
          </div>

          <aside className="rounded-lg border border-navy-100 bg-white/88 p-5 text-sm leading-6 text-navy-500 shadow-sm shadow-navy-800/5">
            <p className="font-semibold tracking-[0.14em] text-navy-400">
              WHAT THIS IS
            </p>
            <p className="mt-3">
              A simple way to tell us what would be helpful. It is not medical
              consultation, customer support, or a promise of a reply.
            </p>
          </aside>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.66fr] lg:items-start">
          <div className="rounded-lg border border-navy-100 bg-white/94 p-6 shadow-soft sm:p-8">
            <ShareSituationForm />
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-navy-100 bg-white/88 p-5 shadow-sm shadow-navy-800/5">
              <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
                WHY THIS HELPS
              </p>
              <p className="mt-3 text-sm leading-7 text-navy-600">
                These notes help us see which senior pet concerns come up most:
                mobility, hygiene, confusion, end-of-life worries, product
                confusion, and vet conversation needs.
              </p>
            </div>

            <div className="rounded-lg border border-navy-100 bg-white/88 p-5 shadow-sm shadow-navy-800/5">
              <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
                WHAT WE WILL LEARN
              </p>
              <p className="mt-3 text-sm leading-7 text-navy-600">
                Over time, these submissions can help us see repeated themes by
                concern, pet type, and life stage, so future resources are based
                on real needs.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
