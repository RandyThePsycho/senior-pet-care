// src/app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import CTAButton from '@/components/common/CTAButton';
import DataPrivacyNote from '@/components/common/DataPrivacyNote';
import ExampleScenario from '@/components/common/ExampleScenario';
import FAQSection from '@/components/common/FAQSection';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import TrustNote from '@/components/common/TrustNote';

export const metadata: Metadata = {
  title: 'Senior Pet Care — Track Your Aging Dog or Cat’s Quality of Life',
  description:
    'A gentle way to understand, track, and prepare questions about senior dog and cat quality of life. Not a substitute for veterinary care.',
};

const CARE_LOOP = [
  'Rate the HHHHHMM dimensions',
  'Save a printable report',
  'Return for a 7-day reassessment',
  'Build the care journal over time',
];

const PREVIEW_SCORES = [
  ['Pain & comfort', '6 / 10'],
  ['Food & appetite', '7 / 10'],
  ['Movement', '5 / 10'],
  ['Good days vs. hard days', '7 / 10'],
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-cream-50">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
        <nav className="flex items-center justify-between border-b border-navy-100/80 pb-5">
          <span className="text-sm font-semibold tracking-[0.18em] text-navy-700">
            SENIOR PET CARE
          </span>
          <span className="hidden text-sm text-navy-500 sm:block">
            Assessment, report, journal, 7-day follow-up
          </span>
        </nav>

        {/* Hero */}
        <section className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div>
            <p className="mb-5 max-w-xl text-sm font-semibold leading-6 tracking-[0.14em] text-sage-700">
              A decision-support tool for senior pet parents
            </p>
            <h1 className="max-w-5xl font-display text-[clamp(2.9rem,5.2vw,4.8rem)] leading-[1.02] text-navy-800">
              Notice changes in your senior pet before the vet visit.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-navy-600">
              A gentle, non-diagnostic way to assess your senior dog or cat,
              prepare better questions, and check back in 7 days with a clearer
              trend.
            </p>
            <div className="mt-8">
              <CTAButton href="/tools/senior-pet-quality-of-life-calculator">
                Check my pet&apos;s quality of life
              </CTAButton>
              <p className="mt-4 text-sm leading-6 text-navy-500">
                Facing a difficult goodbye?{' '}
                <Link
                  href="/end-of-life/checklist"
                  className="font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 transition hover:text-sage-800"
                >
                  Read our gentle end-of-life guide.
                </Link>
              </p>
            </div>

            <Link
              href="/share-your-situation"
              className="mt-6 block max-w-2xl rounded-lg border border-sage-200 bg-white/88 p-5 shadow-sm shadow-sage-700/10 transition hover:-translate-y-0.5 hover:bg-sage-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            >
              <span className="text-sm font-semibold tracking-[0.14em] text-sage-700">
                NOT SURE WHERE TO START?
              </span>
              <span className="mt-2 block font-display text-2xl leading-tight text-navy-800">
                Tell us what&apos;s happening with your senior pet.
              </span>
              <span className="mt-2 block text-sm leading-6 text-navy-500">
                Share what you&apos;re worried about. We can&apos;t give medical
                advice, but writing it down can help you organize your thoughts.
              </span>
            </Link>
          </div>

          <div className="space-y-4">
            <figure className="relative overflow-hidden rounded-lg border border-navy-100 bg-navy-800 shadow-soft">
              <img
                src="/images/senior-pet-home.jpg"
                alt="A dog in soft natural light, used as a calm visual layer for senior pet care"
                className="aspect-[4/3] w-full object-cover opacity-90 saturate-[0.82] contrast-[1.02]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-800/72 via-navy-800/10 to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                <p className="max-w-sm text-sm font-medium leading-6 text-white/90">
                  A calmer way to notice small changes before they become a
                  rushed conversation.
                </p>
              </figcaption>
            </figure>

            <aside className="rounded-lg border border-navy-100 bg-white/86 p-5 shadow-sm shadow-navy-800/5">
              <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
                CARE LOOP
              </p>
              <ol className="mt-5 space-y-3">
                {CARE_LOOP.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sage-50 text-xs font-semibold tabular-nums text-sage-700">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-sm leading-6 text-navy-600">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        {/* Trust strip */}
        <section className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-navy-100/80 py-5 text-sm font-medium text-navy-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-500" aria-hidden />
            HHHHHMM-based guidance
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-500" aria-hidden />
            Not a substitute for veterinary care
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-500" aria-hidden />
            Built for senior dogs and cats
          </span>
        </section>

        {/* Report and journal preview */}
        <section className="mt-14 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-sage-700">
              What the assessment becomes
            </p>
            <h2 className="max-w-xl font-display text-4xl leading-tight text-navy-800">
              A printable report today. A care journal next week.
            </h2>
            <p className="mt-4 max-w-xl leading-8 text-navy-600">
              The point is not a one-time score. It is a record you can print,
              revisit, and bring to a more focused conversation with your vet.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-lg border border-navy-100 bg-white/92 p-5 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
                    EXAMPLE REPORT PREVIEW
                  </p>
                  <p className="mt-4 text-5xl font-bold tabular-nums text-navy-800">
                    55
                    <span className="text-2xl font-medium text-navy-400">
                      {' '}
                      / 70
                    </span>
                  </p>
                </div>
                <span className="rounded-md bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-500">
                  Needs monitoring
                </span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-cream-200">
                <div className="h-full w-[78%] rounded-full bg-sage-500" />
              </div>
              <dl className="mt-5 grid gap-2">
                {PREVIEW_SCORES.map(([label, score]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-lg bg-cream-100 px-3 py-2"
                  >
                    <dt className="text-sm text-navy-500">{label}</dt>
                    <dd className="text-sm font-semibold tabular-nums text-navy-800">
                      {score}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-navy-100 bg-white/92 p-5 shadow-sm shadow-navy-800/5">
                <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
                  7-DAY TRACKER
                </p>
                <div className="mt-5 grid grid-cols-7 gap-2" aria-hidden>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <span
                      key={index}
                      className={`h-12 rounded-md border ${
                        index < 3
                          ? 'border-sage-200 bg-sage-50'
                          : 'border-navy-100 bg-cream-100'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-navy-500">
                  A simple place to mark appetite, comfort, mobility, and
                  notes.
                </p>
              </div>

              <div className="rounded-lg border border-navy-100 bg-white/92 p-5 shadow-sm shadow-navy-800/5">
                <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
                  JOURNAL TREND
                </p>
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-cream-100 px-3 py-2">
                    <span className="text-sm text-navy-500">Today</span>
                    <span className="text-sm font-semibold tabular-nums text-navy-800">
                      55 / 70
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-cream-100 px-3 py-2">
                    <span className="text-sm text-navy-500">7 days later</span>
                    <span className="text-sm font-semibold text-sage-700">
                      Reassess
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary paths, deliberately lighter than the primary assessment CTA. */}
        <section className="mt-12 grid gap-5 sm:grid-cols-2">
          <Link
            href="/share-your-situation"
            className="rounded-lg border border-navy-100 bg-white/88 p-6 shadow-sm shadow-navy-800/5 transition hover:-translate-y-0.5 hover:border-sage-200 hover:bg-sage-50"
          >
            <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
              SHARE YOUR SITUATION
            </p>
            <h2 className="mt-3 font-display text-2xl leading-tight text-navy-800">
              Need a place to explain what&apos;s going on?
            </h2>
            <p className="mt-3 text-sm leading-6 text-navy-500">
              Tell us what you&apos;re noticing, what feels confusing, and what
              resources would actually help.
            </p>
          </Link>

          <Link
            href="/end-of-life/checklist"
            className="rounded-lg border border-navy-100 bg-white/88 p-6 shadow-sm shadow-navy-800/5 transition hover:-translate-y-0.5 hover:border-sage-200 hover:bg-cream-100"
          >
            <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
              GENTLE RESOURCE
            </p>
            <h2 className="mt-3 font-display text-2xl leading-tight text-navy-800">
              Facing a difficult goodbye?
            </h2>
            <p className="mt-3 text-sm leading-6 text-navy-500">
              Read a calm checklist for preparing questions and talking with
              your vet.
            </p>
          </Link>
        </section>

        {/* Why tracking */}
        <section className="mt-16 grid gap-5 lg:grid-cols-[1fr_0.72fr]">
          <ExampleScenario />
          <DataPrivacyNote />
        </section>

        <section className="mt-6">
          <TrustNote />
        </section>

        <section className="mt-6">
          <FAQSection />
        </section>

        {/* Disclaimer */}
        <section className="mt-10">
          <MedicalDisclaimer />
        </section>
      </div>
    </main>
  );
}
