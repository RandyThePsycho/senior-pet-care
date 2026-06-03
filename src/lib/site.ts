// src/lib/site.ts
// Public site constants used by metadata, sitemap, and structured data.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://senior-pet-care-egel.vercel.app';

export const SITE_NAME = 'Senior Pet Care';
export const SITE_DESCRIPTION =
  'A gentle quality-of-life tracker for families caring for aging pets, built to organize observations, prepare vet questions, and track changes over time.';

export const DEFAULT_OG_IMAGE = '/images/senior-pet-home.jpg';
