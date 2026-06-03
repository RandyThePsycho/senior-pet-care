// src/lib/site.ts
// Public site constants used by metadata, sitemap, and structured data.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://senior-pet-care-egel.vercel.app';

export const SITE_NAME = 'Senior Pet Care';
export const SITE_DESCRIPTION =
  'A decision-support platform for senior pet parents to assess quality of life, prepare vet questions, and track changes over time.';

export const DEFAULT_OG_IMAGE = '/images/senior-pet-home.jpg';
