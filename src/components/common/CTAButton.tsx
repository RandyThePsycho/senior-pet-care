// src/components/common/CTAButton.tsx
'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface CTAButtonProps {
  children: ReactNode;
  href?: string; // 提供 href 渲染为 Link，否则渲染为 button
  onClick?: () => void;
  variant?: Variant;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-sage-600 text-white hover:bg-sage-700 focus-visible:ring-sage-400',
  secondary:
    'bg-white text-navy-700 border border-navy-200 hover:bg-cream-100 focus-visible:ring-navy-300',
  ghost:
    'bg-transparent text-navy-700 hover:bg-cream-100 focus-visible:ring-navy-300',
};

export default function CTAButton({
  children,
  href,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  fullWidth = false,
}: CTAButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  const classes = `${base} ${VARIANT_CLASSES[variant]} ${
    fullWidth ? 'w-full' : ''
  }`;

  if (href && !disabled) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
