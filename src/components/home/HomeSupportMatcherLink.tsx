'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { track } from '@/lib/analytics';

interface HomeSupportMatcherLinkProps {
  children: ReactNode;
  className: string;
  href: string;
  placement: 'nav' | 'hero_inline' | 'hero_card';
}

export default function HomeSupportMatcherLink({
  children,
  className,
  href,
  placement,
}: HomeSupportMatcherLinkProps) {
  const handleClick = () => {
    track('support_matcher_home_cta_clicked', {
      source: 'homepage',
      placement,
      intent: 'before_product_purchase',
      href,
    });
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
