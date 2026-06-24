import Link from 'next/link';
import CTAButton from '@/components/common/CTAButton';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import { buildGuideJsonLd, type SeoGuide } from '@/lib/seoGuides';

interface GuidePageProps {
  guide: SeoGuide;
}

export default function GuidePage({ guide }: GuidePageProps) {
  const jsonLd = buildGuideJsonLd(guide);
  const calculatorHref =
    guide.ctaHref ?? '/tools/senior-pet-quality-of-life-calculator';
  const nextStepBody =
    guide.nextStepBody ??
    'Turn these notes into a printable quality-of-life report and a 7-day follow-up journal. The calculator uses the same observation-first approach.';

  return (
    <main className="min-h-screen overflow-x-hidden bg-cream-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
        <nav className="flex items-center justify-between border-b border-navy-100/80 pb-5">
          <Link
            href="/"
            className="text-sm font-semibold text-navy-500 transition-colors hover:text-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            Senior Pet Care
          </Link>
          <span className="hidden text-sm text-navy-400 sm:block">
            Observation guide
          </span>
        </nav>

        <header className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-sage-700">
              {guide.eyebrow}
            </p>
            <h1 className="max-w-4xl font-display text-[clamp(2.5rem,5.4vw,4.65rem)] leading-[1.02] text-navy-800">
              {guide.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-navy-600">
              {guide.intro}
            </p>
          </div>

          <aside className="rounded-lg border border-navy-100 bg-white/88 p-5 shadow-sm shadow-navy-800/5">
            <div data-guide-primary-cta>
              <p className="text-xs font-semibold tracking-[0.14em] text-sage-700">
                TURN NOTES INTO A CHECK-IN
              </p>
              <p className="mt-2 text-sm leading-6 text-navy-500">
                Use this guide as context for a printable quality-of-life
                report and 7-day follow-up.
              </p>
              <div className="mt-4">
                <CTAButton href={calculatorHref} fullWidth>
                  Start check-in
                </CTAButton>
              </div>
            </div>
            <div className="mt-5 border-t border-navy-100 pt-4">
              <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
                BEST FOR
              </p>
              <p className="mt-3 text-sm leading-6 text-navy-600">
                {guide.audience}
              </p>
            </div>
            <p className="mt-5 border-t border-navy-100 pt-4 text-xs font-semibold tracking-[0.14em] text-navy-400">
              LAST UPDATED
            </p>
            <p className="mt-2 text-sm text-navy-500">{guide.lastUpdated}</p>
          </aside>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <article className="rounded-lg border border-navy-100 bg-white/94 p-6 shadow-soft sm:p-7">
            <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
              CHECKLIST
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-navy-800">
              {guide.checklistTitle}
            </h2>
            <ul className="mt-6 space-y-4">
              {guide.checklist.map((item, index) => (
                <li key={item} className="flex gap-4 text-navy-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sage-50 text-xs font-semibold tabular-nums text-sage-700">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <div className="space-y-6">
            <section className="rounded-lg border border-navy-100 bg-white/90 p-6 shadow-sm shadow-navy-800/5 sm:p-7">
              <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
                NOTES
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-navy-800">
                {guide.notesTitle}
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-navy-600">
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

            <section className="rounded-lg border border-navy-100 bg-white/90 p-6 shadow-sm shadow-navy-800/5 sm:p-7">
              <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
                VET QUESTIONS
              </p>
              <ol className="mt-5 space-y-4">
                {guide.vetQuestions.map((question, index) => (
                  <li key={question} className="flex gap-4 text-navy-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cream-100 text-xs font-semibold tabular-nums text-navy-500">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 leading-7">{question}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-sage-200 bg-sage-50/80 p-6 shadow-sm shadow-sage-700/5">
          <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
            NEXT STEP
          </p>
          <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="max-w-2xl leading-7 text-navy-600">
              {nextStepBody}
            </p>
            <CTAButton href={calculatorHref}>
              {guide.ctaLabel ?? 'Start the quality-of-life calculator'}
            </CTAButton>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          {guide.faq.map((item) => (
            <div
              key={item.question}
              className="rounded-lg border border-navy-100 bg-white/82 p-5 shadow-sm shadow-navy-800/5"
            >
              <h2 className="text-base font-semibold leading-6 text-navy-800">
                {item.question}
              </h2>
              <p className="mt-3 text-sm leading-6 text-navy-500">
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
