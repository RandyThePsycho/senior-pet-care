import type { Metadata } from 'next';
import GuidePage from '@/components/guides/GuidePage';
import { buildGuideMetadata, getSeoGuide } from '@/lib/seoGuides';

const guide = getSeoGuide('senior-dog-dementia-vet-checklist');

export function generateMetadata(): Metadata {
  return buildGuideMetadata(guide);
}

export default function SeniorDogDementiaVetChecklistPage() {
  return <GuidePage guide={guide} />;
}
