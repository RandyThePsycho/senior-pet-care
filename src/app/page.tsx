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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-4xl font-bold leading-tight text-navy-800 sm:text-5xl">
            Helping senior pet parents understand, track, and care for aging
            dogs and cats.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-navy-500">
            A gentle, non-diagnostic way to understand how your senior pet is
            doing — and what to track next.
          </p>
        </section>

        {/* Trust strip */}
        <section className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-navy-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sage-500" aria-hidden />
            Vet-informed guidance
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sage-500" aria-hidden />
            Not a substitute for veterinary care
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sage-500" aria-hidden />
            Built for senior dogs and cats
          </span>
        </section>

        {/* Three entry cards */}
        <section className="mt-12 grid gap-4 sm:grid-cols-2">
          {/* QA: Product Matcher 入口暂时隐藏，故由 3 列改为 2 列；恢复时改回 sm:grid-cols-3 */}
          {ENTRIES.map((e) => (
            <div
              key={e.href}
              className={`flex flex-col rounded-3xl border p-6 ${
                e.primary
                  ? 'border-sage-200 bg-sage-50'
                  : 'border-navy-100 bg-white'
              }`}
            >
              <h2 className="text-lg font-bold text-navy-800">{e.title}</h2>
              <p className="mt-2 flex-1 text-sm text-navy-500">{e.body}</p>
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
        <section className="mt-16 rounded-3xl border border-navy-100 bg-white p-8">
          <h2 className="text-2xl font-bold text-navy-800">
            Aging isn&apos;t one moment — it&apos;s a trend
          </h2>
          <p className="mt-3 leading-relaxed text-navy-600">
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
