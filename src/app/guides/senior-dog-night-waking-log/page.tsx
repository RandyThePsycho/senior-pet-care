import type { Metadata } from 'next';
import GuidePage from '@/components/guides/GuidePage';
import { buildGuideMetadata, getSeoGuide } from '@/lib/seoGuides';

const guide = getSeoGuide('senior-dog-night-waking-log');

export function generateMetadata(): Metadata {
  return buildGuideMetadata(guide);
}

export default function SeniorDogNightWakingLogPage() {
  return <GuidePage guide={guide} />;
}
