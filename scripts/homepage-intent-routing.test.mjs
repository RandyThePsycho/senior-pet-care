import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('src/app/page.tsx', 'utf8');

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
  'Eating less',
  'Unsure where to start',
  '/guides/senior-dog-night-waking-log',
  '/guides/senior-dog-caregiver-burnout-notes',
  '/guides/senior-dog-dementia-vet-checklist',
  '/guides/senior-dog-low-appetite-log',
  '/share-your-situation',
]) {
  assert.match(source, new RegExp(expected.replaceAll('/', '\\/')));
}

console.log('homepage-intent-routing checks passed');
