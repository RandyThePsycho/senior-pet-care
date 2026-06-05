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
    path: '/guides/senior-dog-quality-of-life-checklist',
    changeFrequency: 'weekly',
    priority: 0.82,
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
