import type { Metadata } from 'next';
import GuidePage from '@/components/guides/GuidePage';
import { buildGuideMetadata, getSeoGuide } from '@/lib/seoGuides';

const guide = getSeoGuide('senior-cat-quality-of-life-checklist');

export function generateMetadata(): Metadata {
  return buildGuideMetadata(guide);
}

export default function SeniorCatQualityOfLifeChecklistPage() {
  return <GuidePage guide={guide} />;
}
