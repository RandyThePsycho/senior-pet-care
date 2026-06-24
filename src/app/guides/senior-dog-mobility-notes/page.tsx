import type { Metadata } from 'next';
import GuidePage from '@/components/guides/GuidePage';
import { buildGuideMetadata, getSeoGuide } from '@/lib/seoGuides';

const guide = getSeoGuide('senior-dog-mobility-notes');

export function generateMetadata(): Metadata {
  return buildGuideMetadata(guide);
}

export default function SeniorDogMobilityNotesPage() {
  return <GuidePage guide={guide} />;
}
