import type { Metadata } from 'next';
import Link from 'next/link';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import { SEO_GUIDES } from '@/lib/seoGuides';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free Senior Pet Care Tools',
  description:
    'Free senior pet care tools for quality-of-life check-ins, night-waking logs, appetite notes, mobility notes, caregiver capacity checklists, printable reports, and 7-day reassessment.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Free Senior Pet Care Tools',
    description:
      'Start with a quality-of-life calculator or a focused senior pet care checklist, then turn observations into a printable report and 7-day reassessment.',
    url: '/tools',
    siteName: SITE_NAME,
  },
};

const CALCULATOR_HREF =
  '/tools/senior-pet-quality-of-life-calculator?guide=tools-hub&intent=free_tools_quality_of_life';

const FEATURED_GUIDE_SLUGS = [
  'senior-dog-night-waking-log',
  'senior-dog-low-appetite-log',
  'senior-dog-supplements-before-buying',
  'senior-dog-mobility-notes',
  'senior-dog-caregiver-burnout-notes',
] as const;

const FEATURED_GUIDES = FEATURED_GUIDE_SLUGS.map((slug) => {
  const guide = SEO_GUIDES.find((item) => item.slug === slug);
  if (!guide) {
    throw new Error(`Missing featured guide: ${slug}`);
  }
  return guide;
});

const TOOL_GROUPS = [
  {
    title: 'Support product matcher',
    body: 'Match mobility, night-waking, digestion, accidents, and caregiver sleep pressure to support categories before buying random products.',
    href: '/tools/senior-safe-product-matcher',
  },
  {
    title: 'Night-waking logs',
    body: 'Track waking time, pacing, food requests, medication timing, potty needs, and caregiver sleep.',
    href: '/guides/senior-dog-night-waking-log',
  },
  {
    title: 'Appetite and mobility notes',
    body: 'Organize skipped meals, 24-hour food totals, stairs, slipping, standing, and safe-care limits.',
    href: '/guides/senior-dog-low-appetite-log',
  },
  {
    title: 'Mobility and safe-care notes',
    body: 'Track stairs, standing, restricted activity, medication effects, lifting risk, and caregiver sleep.',
    href: '/guides/senior-dog-mobility-notes',
  },
  {
    title: 'Caregiver capacity checklists',
    body: 'Name accidents, cleanup burden, separation distress, sitter reports, sleep loss, and what is realistic at home.',
    href: '/guides/senior-dog-caregiver-burnout-notes',
  },
] as const;

const CARE_LOOP = [
  'Start with the focused checklist that matches this week.',
  'Use the Quality-of-life calculator to rate comfort, appetite, hydration, hygiene, mobility, mood, and good days.',
  'Save a printable report for your next licensed veterinarian conversation.',
  'Return for a 7-day reassessment so the journal shows what changed.',
] as const;

const TRUST_POINTS = [
  'Free to start',
  'Not a diagnosis',
  'Printable report for your vet conversation',
] as const;

export default function ToolsHubPage() {
  return (
    <main id="main-content" className="min-h-screen overflow-x-hidden bg-cream-50">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-10">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-100/80 pb-5">
          <Link
            href="/"
            className="text-base font-semibold text-navy-500 transition-colors hover:text-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            Senior Pet Care
          </Link>
          <div className="flex items-center gap-4 text-base">
            <Link
              href="/approach"
              className="font-semibold text-navy-500 transition hover:text-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            >
              How it works
            </Link>
            <Link
              href={CALCULATOR_HREF}
              className="font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 transition hover:text-sage-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            >
              Quality-of-life calculator
            </Link>
          </div>
        </nav>

        <header className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_24rem] lg:items-end">
          <div>
            <p className="mb-4 text-base font-semibold text-sage-700">
              FREE SENIOR PET CARE TOOLS
            </p>
            <h1 className="max-w-5xl font-display text-5xl leading-[1.04] text-navy-800 sm:text-6xl lg:text-7xl">
              Free Senior Pet Care Tools
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-navy-600">
              Start with the senior pet situation that matches this week, then
              turn the notes into a printable report and 7-day reassessment.
              PawCheckin is not a diagnosis or a substitute for a licensed
              veterinarian.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={CALCULATOR_HREF}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-navy-800 px-6 py-3 text-base font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
              >
                Start the quality-of-life calculator
              </Link>
              <Link
                href="/share-your-situation"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-sage-200 bg-white/88 px-6 py-3 text-base font-semibold text-sage-700 transition hover:-translate-y-0.5 hover:bg-sage-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
              >
                Share your situation
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2 text-base text-navy-600">
              {TRUST_POINTS.map((point) => (
                <li
                  key={point}
                  className="rounded-lg border border-navy-100 bg-white/80 px-3 py-1.5"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

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
        </header>

        <section className="grid gap-4 lg:grid-cols-6">
          {TOOL_GROUPS.map((tool, index) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`rounded-2xl border p-6 shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300 ${
                index === 0
                  ? 'border-sage-200 bg-sage-50/90 shadow-sage-700/10 lg:col-span-2 lg:row-span-2'
                  : 'border-navy-100 bg-white/84 shadow-navy-800/5 hover:border-sage-200 hover:bg-sage-50 lg:col-span-2'
              }`}
            >
              <h2
                className={`font-display leading-tight text-navy-800 ${
                  index === 0 ? 'text-4xl' : 'text-3xl'
                }`}
              >
                {tool.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-navy-600">
                {tool.body}
              </p>
              <span className="mt-5 inline-flex text-base font-semibold text-sage-700">
                Open tool
              </span>
            </Link>
          ))}
        </section>

        <section className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-sage-700">
                FOCUSED CHECKLISTS
              </p>
              <h2 className="mt-2 max-w-3xl font-display text-4xl leading-tight text-navy-800">
                Choose the clearest starting point.
              </h2>
            </div>
            <Link
              href={CALCULATOR_HREF}
              className="text-base font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 transition hover:text-sage-800"
            >
              Or start with the calculator
            </Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {FEATURED_GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="rounded-2xl border border-navy-100 bg-white/84 p-6 shadow-sm shadow-navy-800/5 transition hover:-translate-y-0.5 hover:border-sage-200 hover:bg-sage-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
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

        <section className="warm-callout mt-16 rounded-2xl p-7 shadow-sm shadow-sage-700/5">
          <p className="text-sm font-semibold text-sage-700">
            WHY THESE TOOLS EXIST
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-navy-800">
            A clearer vet conversation starts with calmer notes.
          </h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-navy-600">
            These tools are built for families who are tired, worried, or
            unsure how to explain gradual changes. They organize observations;
            they do not diagnose, treat, or replace veterinary care.
          </p>
        </section>

        <div className="mt-8">
          <MedicalDisclaimer />
        </div>
      </div>
    </main>
  );
}
