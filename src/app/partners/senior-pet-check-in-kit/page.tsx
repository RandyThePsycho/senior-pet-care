import type { Metadata } from 'next';
import Link from 'next/link';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import PartnerKitSharePanel from '@/components/partners/PartnerKitSharePanel';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Senior Pet Check-In Kit for Partners',
  description:
    'A free, non-diagnostic senior pet check-in kit that rescues, newsletters, creators, and care providers can share with older pet families.',
  alternates: {
    canonical: '/partners/senior-pet-check-in-kit',
  },
  openGraph: {
    title: 'Senior Pet Check-In Kit for Partners',
    description:
      'Share a free senior pet tools hub with older pet families, including checklists, vet-visit notes, and a quality-of-life calculator.',
    url: '/partners/senior-pet-check-in-kit',
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 800,
        alt: 'A senior pet resting in soft natural light',
      },
    ],
  },
};

const PARTNER_TYPES = [
  'Senior dog and cat rescues',
  'Pet hospice and mobile care newsletters',
  'Shelter alumni communities',
  'Pet parent creators and newsletters',
  'Local clinics sharing non-diagnostic prep resources',
];

const COPY_BLOCKS = [
  {
    title: 'Short blurb',
    text: 'Free senior pet check-in kit: simple checklists for older dogs and cats, vet-visit notes, and a quality-of-life calculator. Not a diagnosis or medical advice, just a way to organize observations before talking with a licensed veterinarian.',
  },
  {
    title: 'Longer newsletter copy',
    text: 'Caring for an older dog or cat can feel blurry when changes happen slowly. PawCheckin offers a free senior pet check-in kit with weekly observation checklists, vet-visit notes, and a gentle quality-of-life calculator. It is not a diagnosis and does not replace veterinary care. It helps families organize what they are noticing so they can have a clearer conversation with a licensed veterinarian.',
  },
];

export default function SeniorPetCheckInKitPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-cream-50">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
        <nav className="flex items-center justify-between border-b border-navy-100/80 pb-5">
          <Link
            href="/"
            className="text-sm font-semibold text-navy-500 transition-colors hover:text-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            Senior Pet Care
          </Link>
          <span className="hidden text-sm text-navy-400 sm:block">
            Partner resource
          </span>
        </nav>

        <header className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-sage-700">
              Free partner resource
            </p>
            <h1 className="max-w-4xl font-display text-[clamp(2.55rem,5.4vw,4.75rem)] leading-[1.02] text-navy-800">
              Senior Pet Check-In Kit
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-navy-600">
              Share a calm tools hub with checklists, vet-visit notes, and a
              printable quality-of-life calculator for families caring for
              older dogs and cats. Review the kit first, then forward one
              family-facing link when it fits your audience.
            </p>
          </div>

          <aside className="rounded-lg border border-navy-100 bg-white/88 p-5 shadow-sm shadow-navy-800/5">
            <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
              BOUNDARY
            </p>
            <p className="mt-3 text-sm leading-6 text-navy-600">
              This kit is not a diagnosis, triage tool, or veterinary advice.
              It helps families organize observations before speaking with a
              licensed veterinarian.
            </p>
          </aside>
        </header>

        <PartnerKitSharePanel />

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-navy-100 bg-white/90 p-6 shadow-sm shadow-navy-800/5">
            <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
              WHO THIS FITS
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-navy-600">
              {PARTNER_TYPES.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-500"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {COPY_BLOCKS.map((block) => (
              <section
                key={block.title}
                className="rounded-lg border border-navy-100 bg-white/90 p-6 shadow-sm shadow-navy-800/5"
              >
                <h2 className="text-base font-semibold text-navy-800">
                  {block.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-navy-500">
                  {block.text}
                </p>
              </section>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <MedicalDisclaimer />
        </div>
      </div>
    </main>
  );
}
