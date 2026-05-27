// src/app/journal/[petId]/page.tsx
// My Senior Pet Care Journal（server 壳 + client 读取 localStorage 历史）。

import type { Metadata } from 'next';
import JournalClient from '@/components/calculator/JournalClient';

export const metadata: Metadata = {
  title: 'My Senior Pet Care Journal',
  robots: { index: false, follow: false },
};

export default function JournalPage({
  params,
}: {
  params: { petId: string };
}) {
  return <JournalClient petId={params.petId} />;
}
