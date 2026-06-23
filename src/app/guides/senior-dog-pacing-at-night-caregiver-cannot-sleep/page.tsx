import type { Metadata } from 'next';
import GuidePage from '@/components/guides/GuidePage';
import { buildGuideMetadata, getSeoGuide } from '@/lib/seoGuides';

const guide = getSeoGuide('senior-dog-pacing-at-night-caregiver-cannot-sleep');

export function generateMetadata(): Metadata {
  return buildGuideMetadata(guide);
}

export default function SeniorDogPacingAtNightCaregiverCannotSleepPage() {
  return <GuidePage guide={guide} />;
}
