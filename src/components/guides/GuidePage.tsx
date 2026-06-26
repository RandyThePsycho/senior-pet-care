import Link from 'next/link';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import GuideCheckInCta from '@/components/guides/GuideCheckInCta';
import { buildGuideJsonLd, type SeoGuide } from '@/lib/seoGuides';

interface GuidePageProps {
  guide: SeoGuide;
}

export default function GuidePage({ guide }: GuidePageProps) {
  const jsonLd = buildGuideJsonLd(guide);
  const calculatorHref =
    guide.ctaHref ?? '/tools/senior-pet-quality-of-life-calculator';
  const guideIntent = getQueryParam(calculatorHref, 'intent');
  const isSupportMatcherCta = calculatorHref.startsWith(
    '/tools/senior-safe-product-matcher',
  );
  const ctaEventName = isSupportMatcherCta
    ? 'product_matcher_cta_clicked'
    : 'guide_checkin_clicked';
  const nextStepBody =
    guide.nextStepBody ??
    'Turn these notes into a printable quality-of-life report and a 7-day follow-up journal. The calculator uses the same observation-first approach.';
  const heroCtaEyebrow = isSupportMatcherCta
    ? 'MATCH SUPPORT CATEGORIES'
    : 'TURN NOTES INTO A CHECK-IN';
  const heroCtaBody = isSupportMatcherCta
    ? 'Use this guide to sort the pattern before buying supplements or home products.'
    : 'Use this guide as context for a printable quality-of-life report and 7-day follow-up.';
  const heroCtaLabel = isSupportMatcherCta
    ? 'Match support categories'
    : 'Start check-in';

  return (
    <main id="main-content" className="min-h-screen overflow-x-hidden bg-cream-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-10">
        <nav className="flex items-center justify-between border-b border-navy-100/80 pb-5">
          <Link
            href="/"
            className="text-base font-semibold text-navy-500 transition-colors hover:text-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            Senior Pet Care
          </Link>
          <span className="hidden text-sm text-navy-400 sm:block">
            Observation guide
          </span>
        </nav>

        <header className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[1fr_22rem] lg:items-end">
          <div>
            <p className="mb-4 text-base font-semibold text-sage-700">
              {guide.eyebrow}
            </p>
            <h1 className="max-w-5xl font-display text-4xl leading-[1.08] text-navy-800 sm:text-6xl lg:text-7xl">
              {guide.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-navy-600 sm:mt-7 sm:text-xl sm:leading-9">
              {guide.intro}
            </p>
          </div>

          <aside className="paper-panel rounded-2xl p-6">
            <div data-guide-primary-cta>
              <p className="text-sm font-semibold text-sage-700">
                {heroCtaEyebrow}
              </p>
              <p className="mt-3 text-base leading-7 text-navy-600">
                {heroCtaBody}
              </p>
              <div className="mt-4">
                <GuideCheckInCta
                  href={calculatorHref}
                  guideSlug={guide.slug}
                  guideIntent={guideIntent}
                  ctaPlacement="hero"
                  eventName={ctaEventName}
                  fullWidth
                >
                  {heroCtaLabel}
                </GuideCheckInCta>
              </div>
            </div>
            <div className="mt-5 border-t border-navy-100 pt-4">
              <p className="text-sm font-semibold text-navy-400">
                BEST FOR
              </p>
              <p className="mt-3 text-base leading-7 text-navy-600">
                {guide.audience}
              </p>
            </div>
            <p className="mt-5 border-t border-navy-100 pt-4 text-sm font-semibold text-navy-400">
              LAST UPDATED
            </p>
            <p className="mt-2 text-base text-navy-500">{guide.lastUpdated}</p>
          </aside>
        </header>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <article className="paper-panel rounded-2xl p-6 sm:p-8">
            <p className="text-sm font-semibold text-sage-700">
              CHECKLIST
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-navy-800">
              {guide.checklistTitle}
            </h2>
            <ul className="mt-6 space-y-4">
              {guide.checklist.map((item, index) => (
                <li key={item} className="flex gap-4 text-navy-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sage-50 text-xs font-semibold tabular-nums text-sage-700">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-lg leading-8">{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <div className="space-y-6">
            <section className="rounded-2xl border border-navy-100 bg-white/86 p-6 shadow-sm shadow-navy-800/5 sm:p-7">
              <p className="text-sm font-semibold text-sage-700">
                NOTES
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-navy-800">
                {guide.notesTitle}
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-navy-600">
                {guide.notes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-500"
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-navy-100 bg-white/86 p-6 shadow-sm shadow-navy-800/5 sm:p-7">
              <p className="text-sm font-semibold text-sage-700">
                VET QUESTIONS
              </p>
              <ol className="mt-5 space-y-4">
                {guide.vetQuestions.map((question, index) => (
                  <li key={question} className="flex gap-4 text-navy-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cream-100 text-xs font-semibold tabular-nums text-navy-500">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-lg leading-8">
                      {question}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </section>

        <section className="warm-callout mt-8 rounded-2xl p-7 shadow-sm shadow-sage-700/5">
          <p className="text-sm font-semibold text-sage-700">
            NEXT STEP
          </p>
          <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="max-w-3xl text-lg leading-8 text-navy-600">
              {nextStepBody}
            </p>
            <GuideCheckInCta
              href={calculatorHref}
              guideSlug={guide.slug}
              guideIntent={guideIntent}
              ctaPlacement="next_step"
              eventName={ctaEventName}
            >
              {guide.ctaLabel ?? 'Start the quality-of-life calculator'}
            </GuideCheckInCta>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {guide.faq.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-navy-100 bg-white/82 p-6 shadow-sm shadow-navy-800/5"
            >
              <h2 className="text-lg font-semibold leading-7 text-navy-800">
                {item.question}
              </h2>
              <p className="mt-3 text-base leading-7 text-navy-600">
                {item.answer}
              </p>
            </div>
          ))}
        </section>

        <div className="mt-8">
          <MedicalDisclaimer />
        </div>
      </div>
    </main>
  );
}

function getQueryParam(href: string, key: string): string | undefined {
  try {
    return (
      new URL(href, 'https://pawcheckin.com').searchParams.get(key) ??
      undefined
    );
  } catch {
    return undefined;
  }
}
