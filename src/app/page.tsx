// src/app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import CTAButton from '@/components/common/CTAButton';
import DataPrivacyNote from '@/components/common/DataPrivacyNote';
import ExampleScenario from '@/components/common/ExampleScenario';
import FAQSection, { FAQ_ITEMS } from '@/components/common/FAQSection';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import TrustNote from '@/components/common/TrustNote';
import { SEO_GUIDES } from '@/lib/seoGuides';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Senior Pet Care — Track Subtle Changes in Your Aging Pet',
  description:
    'A gentle way to track subtle changes in an aging dog or cat, prepare better vet questions, and return for a 7-day check-in.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Senior Pet Care — Track Subtle Changes in Your Aging Pet',
    description:
      'Track subtle changes in an aging dog or cat, prepare vet questions, and return for a 7-day follow-up.',
    url: '/',
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

const HOME_PRIMARY_CALCULATOR_HREF =
  '/tools/senior-pet-quality-of-life-calculator?guide=homepage&intent=general_quality_of_life';
const HOME_SUPPORT_MATCHER_HREF =
  '/tools/senior-safe-product-matcher?source=homepage_hero&intent=before_product_purchase';

const HOME_INTENT_LINKS = [
  {
    label: 'Night waking or pacing',
    body: 'Track wake time, food requests, medication timing, and caregiver sleep.',
    href: '/guides/senior-dog-night-waking-log',
  },
  {
    label: 'Accidents or burnout',
    body: 'Organize cleanup burden, barking when alone, and what is realistic at home.',
    href: '/guides/senior-dog-caregiver-burnout-notes',
  },
  {
    label: 'Confusion or dementia worries',
    body: 'Track night waking, pacing, accidents, medication effects, and caregiver sleep.',
    href: '/guides/senior-dog-dementia-vet-checklist',
  },
  {
    label: 'Mobility or slipping',
    body: 'Track stairs, standing, restricted activity, medication effects, and caregiver limits.',
    href: '/guides/senior-dog-mobility-notes',
  },
  {
    label: 'Eating less or only late',
    body: 'Track skipped breakfast, dental changes, 24-hour food total, water, stool, and weight.',
    href: '/guides/senior-dog-low-appetite-log',
  },
] as const;

const HOME_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'A gentle tool for families caring for aging pets to track quality-of-life changes, prepare vet questions, and follow up over time.',
    inLanguage: 'en-US',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  },
];

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen overflow-x-hidden bg-cream-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSON_LD) }}
      />
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-100/80 pb-5">
          <span className="text-sm font-semibold text-navy-700">
            SENIOR PET CARE
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base">
            <Link
              href="/approach"
              className="font-semibold text-navy-500 transition hover:text-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            >
              How it works
            </Link>
            <Link
              href="/tools"
              className="font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 transition hover:text-sage-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            >
              Free tools
            </Link>
            <Link
              href={HOME_SUPPORT_MATCHER_HREF}
              className="font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 transition hover:text-sage-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            >
              Support matcher
            </Link>
            <span className="hidden text-navy-500 lg:block">
              Assessment, report, journal, 7-day follow-up
            </span>
          </div>
        </nav>

        {/* Hero */}
        <section className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,0.96fr)_minmax(25rem,0.82fr)] lg:items-start">
          <div className="max-w-3xl">
            <p className="mb-5 max-w-xl text-base font-semibold leading-7 text-sage-700">
              A gentle quality-of-life tracker for aging pets
            </p>
            <h1 className="max-w-5xl font-display text-4xl leading-[1.08] text-navy-800 sm:text-6xl lg:text-7xl">
              Track subtle changes in your aging pet before the vet visit.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-navy-600 sm:mt-7 sm:text-xl sm:leading-9">
              A gentle, non-diagnostic way to notice patterns, prepare better
              questions, and check back in 7 days with a clearer trend.
            </p>
            <div className="mt-8">
              <CTAButton href={HOME_PRIMARY_CALCULATOR_HREF}>
                Check my pet&apos;s quality of life
              </CTAButton>
              <p className="mt-5 text-base leading-7 text-navy-500">
                Considering supplements or home products?{' '}
                <Link
                  href={HOME_SUPPORT_MATCHER_HREF}
                  className="font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 transition hover:text-sage-800"
                >
                  Match the support category first.
                </Link>
              </p>
              <p className="mt-2 text-base leading-7 text-navy-500">
                Facing a difficult goodbye?{' '}
                <Link
                  href="/end-of-life/checklist"
                  className="font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 transition hover:text-sage-800"
                >
                  Read our gentle end-of-life guide.
                </Link>
              </p>
            </div>
          </div>

          <div className="space-y-4 lg:pt-2">
            <Link
              href={HOME_SUPPORT_MATCHER_HREF}
              className="group block rounded-2xl border border-sage-200 bg-sage-50/92 p-6 shadow-soft shadow-sage-700/10 transition hover:-translate-y-0.5 hover:border-sage-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            >
              <span className="text-sm font-semibold text-sage-700">
                BEFORE BUYING SUPPLEMENTS
              </span>
              <span className="mt-3 block font-display text-3xl leading-tight text-navy-800">
                Support Matcher
              </span>
              <span className="mt-3 block text-base leading-7 text-navy-600">
                Match mobility, night waking, appetite, accidents, or caregiver
                sleep pressure to safer support categories and vet questions.
              </span>
              <span className="mt-5 inline-flex items-center justify-center rounded-xl bg-navy-800 px-5 py-3 text-base font-semibold text-white transition group-hover:bg-sage-800">
                Open support matcher
              </span>
              <span className="mt-4 grid gap-2 text-sm font-medium text-navy-600 sm:grid-cols-3">
                <span className="rounded-lg bg-white/70 px-3 py-2">
                  Category-first
                </span>
                <span className="rounded-lg bg-white/70 px-3 py-2">
                  Vet-first warnings
                </span>
                <span className="rounded-lg bg-white/70 px-3 py-2">
                  Paid-intent test
                </span>
              </span>
            </Link>

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
                <p className="max-w-sm text-base font-medium leading-7 text-white/90">
                  A calmer way to catch subtle changes before they turn into
                  urgent concerns.
                </p>
              </figcaption>
            </figure>

            <aside className="paper-panel rounded-2xl p-6">
              <p className="text-sm font-semibold text-navy-400">
                CARE LOOP
              </p>
              <ol className="mt-5 space-y-3">
                {CARE_LOOP.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sage-50 text-xs font-semibold tabular-nums text-sage-700">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-base leading-7 text-navy-600">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <section className="grid gap-5 border-t border-navy-100/70 pt-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-sage-700">
              Start from this week&apos;s pressure
            </p>
            <h2 className="mt-2 max-w-sm font-display text-3xl leading-tight text-navy-800">
              Pick the pattern that feels most urgent.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {HOME_INTENT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-xl border border-navy-100 bg-white/78 p-5 shadow-sm shadow-navy-800/5 transition hover:-translate-y-0.5 hover:border-sage-300 hover:bg-sage-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
              >
                <span className="block text-base font-semibold leading-6 text-navy-800 group-hover:text-sage-700">
                  {link.label}
                </span>
                <span className="mt-2 block text-base leading-7 text-navy-600">
                  {link.body}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust strip */}
        <section className="flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-navy-100/80 py-5 text-base font-medium text-navy-600">
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

        <section className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-sage-700">
                Common senior-pet questions
              </p>
              <h2 className="mt-2 max-w-3xl font-display text-4xl leading-tight text-navy-800">
                Start with the checklist that matches your week.
              </h2>
            </div>
            <Link
              href={HOME_PRIMARY_CALCULATOR_HREF}
              className="text-sm font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 transition hover:text-sage-800"
            >
              Or go straight to the calculator
            </Link>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {SEO_GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="rounded-xl border border-navy-100 bg-white/82 p-6 shadow-sm shadow-navy-800/5 transition hover:-translate-y-0.5 hover:border-sage-200 hover:bg-sage-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
              >
                <p className="text-sm font-semibold text-sage-700">
                  {guide.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl leading-tight text-navy-800">
                  {guide.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-navy-600">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Report and journal preview */}
        <section className="mt-20 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold text-sage-700">
              What the assessment becomes
            </p>
            <h2 className="max-w-xl font-display text-5xl leading-tight text-navy-800">
              A printable report today. A care journal next week.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-navy-600">
              The point is not a one-time score. It is a record you can print,
              revisit, and bring to a more focused conversation with your vet.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-lg border border-navy-100 bg-white/92 p-5 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-navy-400">
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
                    <dt className="text-base text-navy-600">{label}</dt>
                    <dd className="text-base font-semibold tabular-nums text-navy-800">
                      {score}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-navy-100 bg-white/92 p-5 shadow-sm shadow-navy-800/5">
                <p className="text-sm font-semibold text-navy-400">
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
                <p className="mt-4 text-base leading-7 text-navy-600">
                  A simple place to mark appetite, comfort, mobility, and
                  notes.
                </p>
              </div>

              <div className="rounded-lg border border-navy-100 bg-white/92 p-5 shadow-sm shadow-navy-800/5">
                <p className="text-sm font-semibold text-navy-400">
                  JOURNAL TREND
                </p>
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-cream-100 px-3 py-2">
                    <span className="text-base text-navy-600">Today</span>
                    <span className="text-base font-semibold tabular-nums text-navy-800">
                      55 / 70
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-cream-100 px-3 py-2">
                    <span className="text-base text-navy-600">
                      7 days later
                    </span>
                    <span className="text-base font-semibold text-sage-700">
                      Reassess
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary paths, deliberately lighter than the primary assessment CTA. */}
        <section className="mt-16 grid gap-5 sm:grid-cols-2">
          <Link
            href="/share-your-situation"
            className="rounded-xl border border-navy-100 bg-white/84 p-7 shadow-sm shadow-navy-800/5 transition hover:-translate-y-0.5 hover:border-sage-200 hover:bg-sage-50"
          >
            <p className="text-sm font-semibold text-sage-700">
              SHARE YOUR SITUATION
            </p>
            <h2 className="mt-3 font-display text-2xl leading-tight text-navy-800">
              Need a place to explain what&apos;s going on?
            </h2>
            <p className="mt-3 text-base leading-7 text-navy-600">
              Tell us what you&apos;re noticing, what feels confusing, and what
              resources would actually help.
            </p>
          </Link>

          <Link
            href="/end-of-life/checklist"
            className="rounded-xl border border-navy-100 bg-white/84 p-7 shadow-sm shadow-navy-800/5 transition hover:-translate-y-0.5 hover:border-sage-200 hover:bg-cream-100"
          >
            <p className="text-sm font-semibold text-navy-400">
              GENTLE RESOURCE
            </p>
            <h2 className="mt-3 font-display text-2xl leading-tight text-navy-800">
              Facing a difficult goodbye?
            </h2>
            <p className="mt-3 text-base leading-7 text-navy-600">
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
