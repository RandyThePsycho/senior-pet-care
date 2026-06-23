import type { Metadata } from 'next';
import GuidePage from '@/components/guides/GuidePage';
import { buildGuideMetadata, getSeoGuide } from '@/lib/seoGuides';

const guide = getSeoGuide('old-dog-waking-up-at-night-asking-for-food');

export function generateMetadata(): Metadata {
  return buildGuideMetadata(guide);
}

export default function OldDogWakingUpAtNightAskingForFoodPage() {
  return <GuidePage guide={guide} />;
}
