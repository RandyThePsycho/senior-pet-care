import type { Metadata } from 'next';
import GuidePage from '@/components/guides/GuidePage';
import { buildGuideMetadata, getSeoGuide } from '@/lib/seoGuides';

const guide = getSeoGuide('senior-dog-accidents-in-house-caregiver-exhausted');

export function generateMetadata(): Metadata {
  return buildGuideMetadata(guide);
}

export default function SeniorDogAccidentsInHouseCaregiverExhaustedPage() {
  return <GuidePage guide={guide} />;
}
