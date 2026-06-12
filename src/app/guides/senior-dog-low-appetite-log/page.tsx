import type { Metadata } from 'next';
import GuidePage from '@/components/guides/GuidePage';
import { buildGuideMetadata, getSeoGuide } from '@/lib/seoGuides';

const guide = getSeoGuide('senior-dog-low-appetite-log');

export function generateMetadata(): Metadata {
  return buildGuideMetadata(guide);
}

export default function SeniorDogLowAppetiteLogPage() {
  return <GuidePage guide={guide} />;
}
