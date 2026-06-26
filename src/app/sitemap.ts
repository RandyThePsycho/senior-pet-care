// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const PUBLIC_ROUTES = [
  {
    path: '/',
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    path: '/tools/senior-pet-quality-of-life-calculator',
    changeFrequency: 'weekly',
    priority: 0.95,
  },
  {
    path: '/tools',
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    path: '/tools/senior-safe-product-matcher',
    changeFrequency: 'weekly',
    priority: 0.86,
  },
  {
    path: '/approach',
    changeFrequency: 'monthly',
    priority: 0.78,
  },
  {
    path: '/guides/senior-dog-quality-of-life-checklist',
    changeFrequency: 'weekly',
    priority: 0.82,
  },
  {
    path: '/guides/senior-dog-night-waking-log',
    changeFrequency: 'weekly',
    priority: 0.84,
  },
  {
    path: '/guides/old-dog-waking-up-at-night-asking-for-food',
    changeFrequency: 'weekly',
    priority: 0.84,
  },
  {
    path: '/guides/senior-dog-low-appetite-log',
    changeFrequency: 'weekly',
    priority: 0.84,
  },
  {
    path: '/guides/senior-dog-supplements-before-buying',
    changeFrequency: 'weekly',
    priority: 0.84,
  },
  {
    path: '/guides/senior-dog-caregiver-burnout-notes',
    changeFrequency: 'weekly',
    priority: 0.83,
  },
  {
    path: '/guides/senior-dog-accidents-in-house-caregiver-exhausted',
    changeFrequency: 'weekly',
    priority: 0.83,
  },
  {
    path: '/guides/senior-dog-mobility-notes',
    changeFrequency: 'weekly',
    priority: 0.83,
  },
  {
    path: '/guides/senior-dog-separation-anxiety-when-left-alone',
    changeFrequency: 'weekly',
    priority: 0.83,
  },
  {
    path: '/guides/senior-dog-pacing-at-night-caregiver-cannot-sleep',
    changeFrequency: 'weekly',
    priority: 0.83,
  },
  {
    path: '/guides/senior-dog-dementia-vet-checklist',
    changeFrequency: 'weekly',
    priority: 0.83,
  },
  {
    path: '/guides/senior-cat-quality-of-life-checklist',
    changeFrequency: 'weekly',
    priority: 0.82,
  },
  {
    path: '/guides/older-pet-vet-visit-notes',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    path: '/end-of-life/checklist',
    changeFrequency: 'monthly',
    priority: 0.75,
  },
  {
    path: '/share-your-situation',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/partners/senior-pet-check-in-kit',
    changeFrequency: 'monthly',
    priority: 0.55,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
