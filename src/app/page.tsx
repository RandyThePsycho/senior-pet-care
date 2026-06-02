// src/app/page.tsx
import type { Metadata } from 'next';
import CTAButton from '@/components/common/CTAButton';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Senior Pet Care — Track Your Aging Dog or Cat’s Quality of Life',
  description:
    'A gentle, vet-informed way to understand, track, and care for senior dogs and cats. Not a substitute for veterinary care.',
};

const ENTRIES = [
  {
    title: "Check My Pet's Quality of Life",
    body: 'A gentle, non-diagnostic assessment based on the HHHHHMM scale.',
    href: '/tools/senior-pet-quality-of-life-calculator',
    primary: true,
  },
  // QA: 暂时隐藏 Product Matcher 入口（页面未实现）。Feature B 上线后取消注释即可恢复。
  // {
  //   title: 'Find Senior-Safe Products',
  //   body: 'Tell us your pet’s needs and get the right product categories — not a cluttered shelf.',
  //   href: '/tools/senior-safe-product-matcher',
  //   primary: false,
  // },
  {
    title: 'Prepare for End-of-Life Care',
    body: 'Gentle resources to help you understand options and talk with your vet.',
    href: '/end-of-life/checklist',
    primary: false,
  },
];

const CARE_LOOP = [
  'Score the HHHHHMM dimensions',
  'Save a printable report',
  'Return for a 7-day reassessment',
  'Build the care journal over time',
];

const PREVIEW_SCORES = [
  ['Hurt', '6 / 10'],
  ['Hunger', '7 / 10'],
  ['Mobility', '5 / 10'],
  ['More good days', '7 / 10'],
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
            Assessment, report, journal, reassessment
          </span>
        </nav>

        {/* Hero */}
        <section className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div>
            <p className="mb-5 max-w-xl text-sm font-semibold leading-6 tracking-[0.14em] text-sage-700">
              A decision-support tool for senior pet parents
            </p>
            <h1 className="max-w-5xl font-display text-[clamp(2.9rem,5.2vw,4.8rem)] leading-[1.02] text-navy-800">
              Track senior pet changes before the vet visit.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-navy-600">
              A gentle, non-diagnostic way to assess your senior dog or cat,
              prepare better questions, and return in 7 days with a clearer
              trend.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/tools/senior-pet-quality-of-life-calculator">
                Check my pet&apos;s quality of life
              </CTAButton>
              <CTAButton href="/end-of-life/checklist" variant="secondary">
                Prepare for end-of-life care
              </CTAButton>
            </div>
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
            Vet-informed guidance
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
              revisit, and bring into a more focused conversation with your
              vet.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-lg border border-navy-100 bg-white/92 p-5 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
                    QUALITY OF LIFE SUMMARY
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

        {/* Three entry cards */}
        <section className="mt-12 grid gap-5 sm:grid-cols-2">
          {/* QA: Product Matcher 入口暂时隐藏，故由 3 列改为 2 列；恢复时改回 sm:grid-cols-3 */}
          {ENTRIES.map((e) => (
            <div
              key={e.href}
              className={`flex min-h-56 flex-col rounded-lg border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 ${
                e.primary
                  ? 'border-sage-200 bg-sage-50 shadow-sage-700/10'
                  : 'border-navy-100 bg-white/88 shadow-navy-800/5'
              }`}
            >
              <h2 className="font-display text-2xl leading-tight text-navy-800">
                {e.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-navy-500">
                {e.body}
              </p>
              <div className="mt-4">
                <CTAButton
                  href={e.href}
                  variant={e.primary ? 'primary' : 'secondary'}
                  fullWidth
                >
                  {e.primary ? 'Start now' : 'Learn more'}
                </CTAButton>
              </div>
            </div>
          ))}
        </section>

        {/* Why tracking */}
        <section className="mt-16 rounded-lg border border-navy-100 bg-white/88 p-8 shadow-soft">
          <h2 className="font-display text-3xl leading-tight text-navy-800">
            Aging isn&apos;t one moment — it&apos;s a trend
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-navy-600">
            Tracking small changes week by week helps you and your vet make
            better decisions, together. Our calculator gives you a clear,
            non-diagnostic picture you can act on and revisit.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mt-10">
          <MedicalDisclaimer />
        </section>
      </div>
    </main>
  );
}
