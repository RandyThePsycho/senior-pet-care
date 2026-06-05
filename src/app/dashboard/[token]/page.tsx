import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Dashboard shortcut | Senior Pet Care',
  robots: {
    index: false,
    follow: false,
  },
};

interface DashboardShortcutPageProps {
  params: {
    token: string;
  };
}

export default function DashboardShortcutPage({
  params,
}: DashboardShortcutPageProps) {
  redirect(`/internal/dashboard?token=${encodeURIComponent(params.token)}`);
}
