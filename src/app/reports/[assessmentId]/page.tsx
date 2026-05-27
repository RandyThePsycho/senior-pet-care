// src/app/reports/[assessmentId]/page.tsx
// Print-friendly Report 页面（server 壳 + client 读取 localStorage 快照）。

import type { Metadata } from 'next';
import ReportClient from '@/components/calculator/ReportClient';

export const metadata: Metadata = {
  title: 'Quality of Life Report',
  robots: { index: false, follow: false },
};

export default function ReportPage({
  params,
}: {
  params: { assessmentId: string };
}) {
  return <ReportClient assessmentId={params.assessmentId} />;
}
