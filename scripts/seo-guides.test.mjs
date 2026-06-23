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
    slug: 'old-dog-waking-up-at-night-asking-for-food',
    title: 'Old Dog Waking Up at Night Asking for Food',
  },
  {
    slug: 'senior-dog-low-appetite-log',
    title: 'Senior Dog Low Appetite Log',
  },
  {
    slug: 'senior-dog-caregiver-burnout-notes',
    title: 'Senior Dog Caregiver Burnout Notes',
  },
  {
    slug: 'senior-dog-accidents-in-house-caregiver-exhausted',
    title: 'Senior Dog Accidents in the House and Caregiver Exhaustion',
  },
  {
    slug: 'senior-dog-separation-anxiety-when-left-alone',
    title: 'Senior Dog Separation Anxiety When Left Alone',
  },
  {
    slug: 'senior-dog-pacing-at-night-caregiver-cannot-sleep',
    title: 'Senior Dog Pacing at Night and Caregiver Cannot Sleep',
  },
  {
    slug: 'senior-dog-dementia-vet-checklist',
    title: 'Senior Dog Dementia Vet Checklist',
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

assert.match(
  guideSource,
  /caregiver capacity/i,
  'Expected caregiver-burnout guide to include caregiver capacity language.',
);

assert.match(
  guideSource,
  /intent=caregiver_capacity/,
  'Expected caregiver-burnout guide CTA to preserve caregiver capacity intent.',
);

assert.match(
  guideSource,
  /sitter, groomer, or family reports/i,
  'Expected caregiver-burnout guide to capture third-party care reports.',
);

assert.match(
  guideSource,
  /food-driven night check-in/i,
  'Expected old-dog food-waking guide to have a high-intent calculator CTA.',
);

assert.match(
  guideSource,
  /intent=food_driven_night_waking/,
  'Expected old-dog food-waking guide CTA to preserve food-driven night-waking intent.',
);

assert.match(
  guideSource,
  /Caregiver sleep/i,
  'Expected old-dog food-waking guide to include caregiver sleep context.',
);

assert.match(
  guideSource,
  /accidents and care-capacity check-in/i,
  'Expected accident guide to have a care-capacity calculator CTA.',
);

assert.match(
  guideSource,
  /intent=accidents_caregiver_capacity/,
  'Expected accident guide CTA to preserve accidents caregiver-capacity intent.',
);

assert.match(
  guideSource,
  /cleanup burden/i,
  'Expected accident guide to capture cleanup burden language.',
);

assert.match(
  guideSource,
  /intent=separation_anxiety_caregiver_capacity/,
  'Expected separation anxiety guide CTA to preserve caregiver-capacity intent.',
);

assert.match(
  guideSource,
  /Start a separation-support check-in/,
  'Expected separation anxiety guide to have a calculator CTA.',
);

assert.match(
  guideSource,
  /intent=night_pacing_caregiver_sleep/,
  'Expected night-pacing guide CTA to preserve caregiver sleep intent.',
);

assert.match(
  guideSource,
  /Start a night-pacing check-in/,
  'Expected night-pacing guide to have a calculator CTA.',
);

assert.match(
  guideSource,
  /intent=cognitive_change_caregiver_capacity/,
  'Expected dementia vet checklist guide CTA to preserve cognitive-change caregiver-capacity intent.',
);

assert.match(
  guideSource,
  /This checklist does not diagnose dementia/,
  'Expected dementia vet checklist to avoid diagnostic framing.',
);

assert.match(
  guideSource,
  /medication effects/i,
  'Expected dementia vet checklist to include medication-effect tracking.',
);

assert.match(
  guideSource,
  /twitter:\s*\{/,
  'Expected guide metadata to define page-specific Twitter card metadata.',
);

assert.match(
  guideSource,
  /title:\s*guide\.title/,
  'Expected guide metadata title to rely on the layout template without duplicating the site name.',
);

assert.match(
  guideSource,
  /socialImage:\s*\{/,
  'Expected high-intent guides to support page-specific social preview images.',
);

assert.match(
  guideSource,
  /\/growth\/pinterest\/jpg\/senior-dog-night-waking-log\.jpg/,
  'Expected night-waking guide to use its own social preview image.',
);

assert.match(
  guideSource,
  /\/growth\/pinterest\/jpg\/old-dog-waking-up-at-night-asking-for-food\.jpg/,
  'Expected old-dog food-waking guide to use its own social preview image.',
);

assert.match(
  guideSource,
  /\/growth\/pinterest\/jpg\/senior-dog-low-appetite-log\.jpg/,
  'Expected low-appetite guide to use its own social preview image.',
);

assert.match(
  guideSource,
  /\/growth\/pinterest\/jpg\/senior-dog-caregiver-burnout-notes\.jpg/,
  'Expected caregiver-burnout guide to use its own social preview image.',
);

assert.match(
  guideSource,
  /\/growth\/pinterest\/jpg\/senior-dog-dementia-vet-checklist\.jpg/,
  'Expected dementia vet checklist guide to use its own social preview image.',
);

assert.match(
  guideSource,
  /\/growth\/pinterest\/jpg\/senior-dog-accidents-in-house-caregiver-exhausted\.jpg/,
  'Expected accident guide to use its own social preview image.',
);

assert.ok(
  existsSync('public/growth/pinterest/jpg/senior-dog-night-waking-log.jpg'),
  'Expected night-waking guide social image asset to exist.',
);

assert.ok(
  existsSync(
    'public/growth/pinterest/jpg/old-dog-waking-up-at-night-asking-for-food.jpg',
  ),
  'Expected old-dog food-waking guide social image asset to exist.',
);

assert.ok(
  existsSync('public/growth/pinterest/jpg/senior-dog-low-appetite-log.jpg'),
  'Expected low-appetite guide social image asset to exist.',
);

assert.ok(
  existsSync(
    'public/growth/pinterest/jpg/senior-dog-caregiver-burnout-notes.jpg',
  ),
  'Expected caregiver-burnout guide social image asset to exist.',
);

assert.ok(
  existsSync(
    'public/growth/pinterest/jpg/senior-dog-accidents-in-house-caregiver-exhausted.jpg',
  ),
  'Expected accident guide social image asset to exist.',
);
