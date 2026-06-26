import type { Metadata } from 'next';
import Link from 'next/link';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'How PawCheckin Works',
  description:
    'How PawCheckin helps senior pet families organize quality-of-life observations, prepare vet questions, save a printable report, and return for a 7-day reassessment without replacing veterinary care.',
  alternates: {
    canonical: '/approach',
  },
  openGraph: {
    title: 'How PawCheckin Works',
    description:
      'A non-diagnostic senior pet care approach for organizing observations, preparing vet questions, and checking back in 7 days.',
    url: '/approach',
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

const CALCULATOR_HREF =
  '/tools/senior-pet-quality-of-life-calculator?guide=approach&intent=trust_to_quality_of_life';

const HELP_POINTS = [
  {
    title: 'Notice patterns without trying to diagnose',
    body: 'Use simple prompts for comfort, appetite, hydration, hygiene, mobility, mood, and good days so gradual changes are easier to describe.',
  },
  {
    title: 'Prepare a clearer vet conversation',
    body: 'Turn scattered memories into notes and questions you can bring to a licensed veterinarian.',
  },
  {
    title: 'Check back in 7 days',
    body: 'A single score can feel too final. Reassessment helps families see whether this week is stable, improving, or getting harder.',
  },
] as const;

const CARE_LOOP = [
  {
    title: 'Choose the closest starting point',
    body: 'Start with the calculator or a focused guide such as night waking, low appetite, mobility, or caregiver capacity.',
  },
  {
    title: 'Rate the HHHHHMM dimensions',
    body: 'Review hurt, hunger, hydration, hygiene, happiness, mobility, and more good days than bad using calm, non-diagnostic prompts.',
  },
  {
    title: 'Save a printable report',
    body: 'Keep the summary for your own notes and for a more focused licensed-veterinarian conversation.',
  },
  {
    title: 'Return for the 7-day reassessment',
    body: 'Compare the next check-in against the first one so the journal shows what changed instead of relying on memory.',
  },
] as const;

const BOUNDARIES = [
  'It does not diagnose illness, pain, dementia, cancer, organ disease, or end-of-life timing.',
  'It does not replace a licensed veterinarian, emergency clinic, or specialist.',
  'It does not tell families to change medication, supplements, food, activity limits, or treatment.',
  'It does not show product recommendations in end-of-life contexts.',
] as const;

export default function ApproachPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-cream-50">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-10">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-100/80 pb-5">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.18em] text-navy-700 transition-colors hover:text-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            SENIOR PET CARE
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/tools"
              className="font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 transition hover:text-sage-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            >
              Free tools
            </Link>
            <Link
              href={CALCULATOR_HREF}
              className="font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 transition hover:text-sage-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            >
              Calculator
            </Link>
          </div>
        </nav>

        <header className="grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold tracking-[0.14em] text-sage-700">
              HOW PAWCHECKIN WORKS
            </p>
            <h1 className="max-w-5xl font-display text-[2.45rem] leading-[1.05] text-navy-800 sm:text-[4rem]">
              A clearer way to organize senior-pet changes before the vet
              conversation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-navy-600">
              PawCheckin is a decision-support tool for families caring for
              older dogs and cats. It helps organize observations, prepare
              questions, and return for a 7-day check-in. It is not veterinary
              advice, diagnosis, or emergency triage.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-lg bg-navy-800 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
              >
                View free tools
              </Link>
              <Link
                href={CALCULATOR_HREF}
                className="inline-flex items-center justify-center rounded-lg border border-sage-200 bg-white/88 px-5 py-3 text-sm font-semibold text-sage-700 transition hover:-translate-y-0.5 hover:bg-sage-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
              >
                Start the calculator
              </Link>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-lg border border-navy-100 bg-navy-800 shadow-soft">
            <img
              src="/images/senior-pet-home.jpg"
              alt="A senior dog resting in soft natural light"
              className="aspect-[4/3] w-full object-cover opacity-90 saturate-[0.82] contrast-[1.02]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy-800/72 via-navy-800/10 to-transparent"
              aria-hidden="true"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 p-5">
              <p className="max-w-md text-sm font-medium leading-6 text-white/90">
                The goal is not to make a medical call online. The goal is to
                bring clearer notes to the people who can examine your pet.
              </p>
            </figcaption>
          </figure>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {HELP_POINTS.map((point) => (
            <article
              key={point.title}
              className="rounded-lg border border-navy-100 bg-white/88 p-5 shadow-sm shadow-navy-800/5"
            >
              <h2 className="font-display text-2xl leading-tight text-navy-800">
                {point.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-navy-500">
                {point.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
              THE CARE LOOP
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-navy-800">
              Built around follow-up, not a one-time score.
            </h2>
            <p className="mt-4 leading-8 text-navy-600">
              Feature A stays focused on the loop that matters most:
              assessment, email capture, printable report, 7-day reassessment,
              and the care journal over time.
            </p>
          </div>

          <ol className="grid gap-4">
            {CARE_LOOP.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-lg border border-navy-100 bg-white/88 p-5 shadow-sm shadow-navy-800/5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-sage-50 text-sm font-semibold tabular-nums text-sage-700">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-navy-800">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-navy-500">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12 rounded-lg border border-navy-100 bg-white/90 p-6 shadow-sm shadow-navy-800/5">
          <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
            CLEAR BOUNDARIES
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy-800">
            What PawCheckin does not do.
          </h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {BOUNDARIES.map((boundary) => (
              <li
                key={boundary}
                className="rounded-lg border border-amber-100 bg-amber-50/70 px-4 py-3 text-sm leading-6 text-navy-600"
              >
                {boundary}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-lg border border-sage-200 bg-sage-50/80 p-6 shadow-sm shadow-sage-700/5">
          <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
            WHY TRUST THIS NARROW TOOL
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy-800">
            The promise is intentionally modest.
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-navy-600">
            Senior-pet care often gets blurry because the changes are gradual
            and the caregiver is tired. PawCheckin does not claim to know what
            is medically happening. It gives families a structured way to name
            what they are seeing, print it, and bring it into a professional
            conversation.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-lg bg-navy-800 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            >
              View the free tools
            </Link>
            <Link
              href="/guides/older-pet-vet-visit-notes"
              className="inline-flex items-center justify-center rounded-lg border border-sage-200 bg-white/88 px-5 py-3 text-sm font-semibold text-sage-700 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            >
              Read vet-visit notes guide
            </Link>
          </div>
        </section>

        <div className="mt-8">
          <MedicalDisclaimer />
        </div>
      </div>
    </main>
  );
}
