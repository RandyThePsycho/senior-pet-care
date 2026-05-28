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
    // QA: Product Matcher 页面未实现，暂时隐藏所有产品 CTA，避免跳转到 404。
    //     Feature B 上线后把下面的 SHOW_PRODUCT_CTAS 改为 true 即可恢复。
    const SHOW_PRODUCT_CTAS = false;
    if (SHOW_PRODUCT_CTAS && routes.matcher) {
      cards.push({
        key: 'mobility',
        title: 'Mobility support may help',
        body: 'Small home changes can make standing, walking, and resting easier for senior pets.',
        cta: 'Find senior-safe mobility products',
        href: '/tools/senior-safe-product-matcher?focus=mobility',
        event: 'product_matcher_cta_clicked',
        tone: 'product',
      });
    }
    if (SHOW_PRODUCT_CTAS && routes.incontinence) {
      cards.push({
        key: 'hygiene',
        title: 'Comfort and hygiene support',
        body: "Washable bedding, easier bathroom access, and gentle cleaning routines can help protect your pet's comfort and dignity.",
        cta: 'See hygiene care ideas',
        href: '/tools/senior-safe-product-matcher?focus=hygiene',
        event: 'product_matcher_cta_clicked',
        tone: 'product',
      });
    }
  }

  if (cards.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-navy-800">Recommended next steps</h3>
      {cards.map((c) => (
        <div
          key={c.key}
          className={`rounded-3xl border p-6 ${
            c.tone === 'gentle'
              ? 'border-navy-200 bg-navy-50'
              : 'border-sage-200 bg-sage-50'
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
