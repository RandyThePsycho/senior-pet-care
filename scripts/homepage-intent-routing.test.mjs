import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('src/app/page.tsx', 'utf8');
const homeSupportMatcherLinkSource = readFileSync(
  'src/components/home/HomeSupportMatcherLink.tsx',
  'utf8',
);

assert.match(
  source,
  /guide=homepage&intent=general_quality_of_life/,
  'Expected the homepage primary CTA to preserve homepage intent context.',
);

assert.doesNotMatch(
  source,
  /utm_source=homepage/,
  'Homepage internal links should not overwrite real external UTM attribution.',
);

for (const expected of [
  'Night waking or pacing',
  'Accidents or burnout',
  'Confusion or dementia worries',
  'Mobility or slipping',
  'Eating less or only late',
  'dental changes',
  '24-hour food total',
  '/guides/senior-dog-night-waking-log',
  '/guides/senior-dog-caregiver-burnout-notes',
  '/guides/senior-dog-dementia-vet-checklist',
  '/guides/senior-dog-mobility-notes',
  '/guides/senior-dog-low-appetite-log',
  '/share-your-situation',
  'HomeSupportMatcherLink',
  'placement="nav"',
  'placement="hero_inline"',
  'placement="hero_card"',
]) {
  assert.match(source, new RegExp(expected.replaceAll('/', '\\/')));
}

for (const expected of [
  'support_matcher_home_cta_clicked',
  'before_product_purchase',
  'placement',
]) {
  assert.match(homeSupportMatcherLinkSource, new RegExp(expected));
}

console.log('homepage-intent-routing checks passed');
