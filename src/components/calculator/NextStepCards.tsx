// src/components/calculator/NextStepCards.tsx
'use client';

import type { AssessmentResult } from '@/types/assessment';
import CTAButton from '@/components/common/CTAButton';
import { track } from '@/lib/analytics';

interface NextStepCardsProps {
  result: AssessmentResult;
}

export default function NextStepCards({ result }: NextStepCardsProps) {
  const { routes, riskLevel } = result;

  // 重要：end_of_life 等级时，不显示任何产品卡，只显示温柔资源卡。
  const isEndOfLife = riskLevel === 'end_of_life' || routes.endOfLife;

  const cards: {
    key: string;
    title: string;
    body: string;
    cta: string;
    href: string;
    event: 'product_matcher_cta_clicked' | 'end_of_life_cta_clicked';
    tone: 'product' | 'gentle';
  }[] = [];

  if (isEndOfLife) {
    // 仅温柔资源卡
    cards.push({
      key: 'eol',
      title: 'Gentle end-of-life resources',
      body: "When you're ready, these resources can help you prepare questions, understand options, and talk with your vet.",
      cta: 'View end-of-life checklist',
      href: '/end-of-life/checklist',
      event: 'end_of_life_cta_clicked',
      tone: 'gentle',
    });
  } else {
    // Product/support CTAs stay hidden for end-of-life results above.
    const SHOW_PRODUCT_CTAS = true;
    if (SHOW_PRODUCT_CTAS && routes.matcher) {
      cards.push({
        key: 'mobility',
        title: 'Do not buy mobility products at random',
        body: 'Match slipping, stairs, stiffness, and known conditions to safer support categories and vet-first questions.',
        cta: 'Match support categories',
        href: '/tools/senior-safe-product-matcher?focus=mobility',
        event: 'product_matcher_cta_clicked',
        tone: 'product',
      });
    }
    if (SHOW_PRODUCT_CTAS && routes.incontinence) {
      cards.push({
        key: 'hygiene',
        title: 'Accidents need a safer buying plan',
        body: "Sort cleanup, bathroom access, washable bedding, and vet-first warning signs before spending money.",
        cta: 'Match support categories',
        href: '/tools/senior-safe-product-matcher?focus=hygiene',
        event: 'product_matcher_cta_clicked',
        tone: 'product',
      });
    }
  }

  if (cards.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-display text-2xl leading-tight text-navy-800">
        Recommended next steps
      </h3>
      {cards.map((c) => (
        <div
          key={c.key}
          className={`rounded-lg border p-6 shadow-sm ${
            c.tone === 'gentle'
              ? 'border-navy-200 bg-navy-50 shadow-navy-800/5'
              : 'border-sage-200 bg-sage-50 shadow-sage-700/10'
          }`}
        >
          <h4 className="text-lg font-semibold text-navy-800">{c.title}</h4>
          <p className="mt-1 text-navy-600">{c.body}</p>
          <div className="mt-4">
            <CTAButton
              href={c.href}
              variant="secondary"
              onClick={() => track(c.event, {})}
            >
              {c.cta}
            </CTAButton>
          </div>
        </div>
      ))}
    </div>
  );
}
