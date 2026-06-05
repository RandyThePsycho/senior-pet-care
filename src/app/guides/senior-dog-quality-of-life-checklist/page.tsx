import type { Metadata } from 'next';
import GuidePage from '@/components/guides/GuidePage';
import { buildGuideMetadata, getSeoGuide } from '@/lib/seoGuides';

const guide = getSeoGuide('senior-dog-quality-of-life-checklist');

export function generateMetadata(): Metadata {
  return buildGuideMetadata(guide);
}

export default function SeniorDogQualityOfLifeChecklistPage() {
  return <GuidePage guide={guide} />;
}
