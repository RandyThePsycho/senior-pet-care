import type { Metadata } from 'next';
import Link from 'next/link';
import AffiliateDisclosure from '@/components/common/AffiliateDisclosure';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import SeniorSupportMatcherClient from '@/components/product-matcher/SeniorSupportMatcherClient';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Senior Pet Support Matcher',
  description:
    'Match senior pet concerns to supportive product categories, vet-first questions, and early-access support-plan validation before buying random supplements.',
  alternates: {
    canonical: '/tools/senior-safe-product-matcher',
  },
  openGraph: {
    title: 'Senior Pet Support Matcher',
    description:
      'A category-first senior pet support matcher for mobility, night waking, digestion, accidents, and caregiver sleep pressure. Not a diagnosis.',
    url: '/tools/senior-safe-product-matcher',
    siteName: SITE_NAME,
  },
};

interface SeniorSafeProductMatcherPageProps {
  searchParams?: {
    focus?: string;
  };
}

export default function SeniorSafeProductMatcherPage({
  searchParams,
}: SeniorSafeProductMatcherPageProps) {
  return (
    <main id="main-content" className="min-h-screen overflow-x-hidden bg-cream-50">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-10">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-100/80 pb-5">
          <Link
            href="/tools"
            className="text-sm font-semibold text-navy-500 transition-colors hover:text-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            Free tools
          </Link>
          <Link
            href="/tools/senior-pet-quality-of-life-calculator?guide=support-matcher&intent=before_product_purchase"
            className="text-sm font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4 transition hover:text-sage-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            Start with quality-of-life check-in
          </Link>
        </nav>

        <header className="py-12">
          <p className="mb-4 text-sm font-semibold tracking-[0.14em] text-sage-700">
            CATEGORY-FIRST PRODUCT GUIDANCE
          </p>
          <h1 className="max-w-5xl font-display text-[2.45rem] leading-[1.05] text-navy-800 sm:text-[4rem]">
            Senior Pet Support Matcher
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-navy-600">
            Before buying another supplement or home product, match the pattern
            you are seeing to safer support categories, why-not boundaries, and
            questions for a licensed veterinarian. This is not a diagnosis, a
            treatment plan, or a substitute for veterinary care.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-navy-600 md:grid-cols-3">
            {[
              'Support categories first',
              'Vet-first warnings where risk is higher',
              'Paid-intent test before building a store',
            ].map((point) => (
              <p
                key={point}
                className="rounded-lg border border-navy-100 bg-white/88 px-4 py-3 shadow-sm shadow-navy-800/5"
              >
                {point}
              </p>
            ))}
          </div>
        </header>

        <SeniorSupportMatcherClient initialFocus={searchParams?.focus} />

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-navy-100 bg-white p-5 shadow-sm shadow-navy-800/5">
            <p className="text-sm font-semibold text-navy-800">
              Commercial test
            </p>
            <p className="mt-2 text-sm leading-6 text-navy-500">
              The current goal is to learn whether senior-pet families would pay
              for a clearer vet-prep support plan and category shortlist before
              we source real products or affiliate links.
            </p>
          </div>
          <div className="rounded-lg border border-navy-100 bg-white p-5 shadow-sm shadow-navy-800/5">
            <p className="text-sm font-semibold text-navy-800">
              Product disclosure
            </p>
            <div className="mt-2">
              <AffiliateDisclosure />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <MedicalDisclaimer />
        </div>
      </div>
    </main>
  );
}
