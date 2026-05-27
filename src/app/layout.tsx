// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Senior Pet Care',
    template: '%s · Senior Pet Care',
  },
  description:
    'A decision-support platform for senior pet parents. Understand, track, and care for aging dogs and cats.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream-50 text-navy-700 antialiased">{children}</body>
    </html>
  );
}
