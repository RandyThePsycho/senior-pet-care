import type { Metadata } from 'next';
import GuidePage from '@/components/guides/GuidePage';
import { buildGuideMetadata, getSeoGuide } from '@/lib/seoGuides';

const guide = getSeoGuide('older-pet-vet-visit-notes');

export function generateMetadata(): Metadata {
  return buildGuideMetadata(guide);
}

export default function OlderPetVetVisitNotesPage() {
  return <GuidePage guide={guide} />;
}
