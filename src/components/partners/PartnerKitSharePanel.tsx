'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CTAButton from '@/components/common/CTAButton';

const ATTRIBUTION_CAMPAIGN = 'senior_pet_checkin_kit';

const SHARE_RESOURCES = [
  {
    label: 'Senior dog checklist',
    path: '/guides/senior-dog-quality-of-life-checklist',
    fallbackContent: 'senior_dog_checklist',
    description:
      'A weekly way to notice comfort, appetite, mobility, mood, and good days vs. hard days.',
  },
  {
    label: 'Senior cat checklist',
    path: '/guides/senior-cat-quality-of-life-checklist',
    fallbackContent: 'senior_cat_checklist',
    description:
      'A gentle checklist for appetite, water, litter box changes, grooming, jumping, hiding, and sleep.',
  },
  {
    label: 'Vet visit notes',
    path: '/guides/older-pet-vet-visit-notes',
    fallbackContent: 'vet_visit_notes',
    description:
      'A simple prompt for organizing what changed, when it started, and what to ask the vet.',
  },
  {
    label: 'Quality-of-life calculator',
    path: '/tools/senior-pet-quality-of-life-calculator',
    fallbackContent: 'calculator',
    description:
      'A printable HHHHHMM-based report and 7-day follow-up journal for senior pet families.',
  },
];

export default function PartnerKitSharePanel() {
  const [currentSearch, setCurrentSearch] = useState('');

  useEffect(() => {
    setCurrentSearch(window.location.search);
  }, []);

  const primaryHref = buildTrackedHref({
    path: '/tools/senior-pet-quality-of-life-calculator',
    fallbackContent: 'primary_cta',
    currentSearch,
  });

  return (
    <>
      <section className="mt-10 rounded-lg border border-sage-200 bg-sage-50/80 p-6 shadow-sm shadow-sage-700/5 sm:p-7">
        <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
          FAMILY-FACING LINK
        </p>
        <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <p className="leading-7 text-navy-600">
              If this seems useful for your audience, forward this calculator
              link to one senior pet family or include the short blurb below.
              Each family receives its own private report and journal link; you
              do not need to collect their information.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-navy-600 sm:grid-cols-3">
              <li className="rounded-lg bg-white/80 px-3 py-2">
                No account required
              </li>
              <li className="rounded-lg bg-white/80 px-3 py-2">
                Printable vet-prep summary
              </li>
              <li className="rounded-lg bg-white/80 px-3 py-2">
                7-day follow-up journal
              </li>
            </ul>
          </div>
          <CTAButton href={primaryHref}>Review family calculator</CTAButton>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {SHARE_RESOURCES.map((resource) => (
          <Link
            key={resource.path}
            href={buildTrackedHref({
              path: resource.path,
              fallbackContent: resource.fallbackContent,
              currentSearch,
            })}
            className="rounded-lg border border-navy-100 bg-white/90 p-5 shadow-sm shadow-navy-800/5 transition hover:-translate-y-0.5 hover:border-sage-200 hover:bg-sage-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
          >
            <h2 className="font-display text-2xl leading-tight text-navy-800">
              {resource.label}
            </h2>
            <p className="mt-3 text-sm leading-6 text-navy-500">
              {resource.description}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}

function buildTrackedHref({
  path,
  fallbackContent,
  currentSearch,
}: {
  path: string;
  fallbackContent: string;
  currentSearch: string;
}) {
  const current = new URLSearchParams(currentSearch);
  const next = new URLSearchParams();

  const currentSource = textParam(current, 'utm_source');
  const currentMedium = textParam(current, 'utm_medium');
  const currentCampaign = textParam(current, 'utm_campaign');
  const currentContent = textParam(current, 'utm_content');

  next.set('utm_source', currentSource ?? 'partner');
  next.set('utm_medium', currentMedium ?? 'referral');
  next.set('utm_campaign', currentCampaign ?? ATTRIBUTION_CAMPAIGN);
  next.set('utm_content', currentContent ?? fallbackContent);

  return `${path}?${next.toString()}`;
}

function textParam(params: URLSearchParams, key: string): string | null {
  const value = params.get(key)?.trim();
  return value ? value.slice(0, 120) : null;
}
