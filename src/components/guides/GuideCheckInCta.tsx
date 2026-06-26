'use client';

import type { ReactNode } from 'react';
import CTAButton from '@/components/common/CTAButton';
import { track } from '@/lib/analytics';

interface GuideCheckInCtaProps {
  children: ReactNode;
  href: string;
  guideSlug: string;
  guideIntent?: string;
  ctaPlacement: 'hero' | 'next_step';
  eventName?: 'guide_checkin_clicked' | 'product_matcher_cta_clicked';
  fullWidth?: boolean;
}

export default function GuideCheckInCta({
  children,
  href,
  guideSlug,
  guideIntent,
  ctaPlacement,
  eventName = 'guide_checkin_clicked',
  fullWidth = false,
}: GuideCheckInCtaProps) {
  const handleClick = () => {
    track(eventName, {
      guideSlug,
      ...(guideIntent ? { guideIntent } : {}),
      ctaPlacement,
    });
  };

  return (
    <CTAButton href={href} onClick={handleClick} fullWidth={fullWidth}>
      {children}
    </CTAButton>
  );
}
