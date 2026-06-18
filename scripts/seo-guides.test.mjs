import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const guides = [
  {
    slug: 'senior-dog-quality-of-life-checklist',
    title: 'Senior Dog Quality of Life Checklist',
  },
  {
    slug: 'senior-cat-quality-of-life-checklist',
    title: 'Senior Cat Quality of Life Checklist',
  },
  {
    slug: 'older-pet-vet-visit-notes',
    title: 'What to Track Before a Vet Visit for an Older Pet',
  },
  {
    slug: 'senior-dog-night-waking-log',
    title: 'Senior Dog Night-Waking Log',
  },
  {
    slug: 'senior-dog-low-appetite-log',
    title: 'Senior Dog Low Appetite Log',
  },
];

assert.ok(
  existsSync('src/lib/seoGuides.ts'),
  'Expected shared SEO guide content at src/lib/seoGuides.ts',
);

const guideSource = readFileSync('src/lib/seoGuides.ts', 'utf8');
const sitemapSource = readFileSync('src/app/sitemap.ts', 'utf8');

for (const guide of guides) {
  const route = `/guides/${guide.slug}`;
  const pagePath = `src/app${route}/page.tsx`;

  assert.ok(existsSync(pagePath), `Expected guide page ${pagePath}`);

  const pageSource = readFileSync(pagePath, 'utf8');

  assert.match(guideSource, new RegExp(guide.slug));
  assert.match(guideSource, new RegExp(guide.title));
  assert.match(guideSource, /not a diagnosis/i);
  assert.match(guideSource, /licensed veterinarian/i);
  assert.match(pageSource, /GuidePage/);
  assert.match(pageSource, /generateMetadata/);
  assert.match(sitemapSource, new RegExp(route));
}

assert.match(
  guideSource,
  /caregiver sustainability/i,
  'Expected night-waking guide to address caregiver sustainability.',
);

assert.match(
  guideSource,
  /intent=caregiver_sustainability/,
  'Expected night-waking guide CTA to preserve the caregiver sustainability intent.',
);

assert.match(
  guideSource,
  /Start a night-waking check-in/,
  'Expected night-waking guide CTA to match the high-intent entry path.',
);

assert.match(
  guideSource,
  /Food-driven waking/,
  'Expected night-waking guide to include food-driven overnight waking language.',
);

assert.match(
  guideSource,
  /medication timing/i,
  'Expected night-waking guide to include medication timing language.',
);
