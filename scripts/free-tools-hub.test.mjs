import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const toolsPagePath = 'src/app/tools/page.tsx';
assert.ok(existsSync(toolsPagePath), 'Expected a public /tools hub page.');

const toolsSource = readFileSync(toolsPagePath, 'utf8');
const sitemapSource = readFileSync('src/app/sitemap.ts', 'utf8');
const homepageSource = readFileSync('src/app/page.tsx', 'utf8');

for (const expected of [
  'Free Senior Pet Care Tools',
  'Quality-of-life calculator',
  'Night-waking logs',
  'Appetite and mobility notes',
  'Caregiver capacity checklists',
  '7-day reassessment',
  'printable report',
  'Free to start',
  'Printable report for your vet conversation',
  'not a diagnosis',
  'licensed veterinarian',
  '/tools/senior-pet-quality-of-life-calculator?guide=tools-hub&intent=free_tools_quality_of_life',
  '/guides/senior-dog-night-waking-log',
  '/guides/senior-dog-low-appetite-log',
  '/guides/senior-dog-mobility-notes',
  '/guides/senior-dog-caregiver-burnout-notes',
  '/share-your-situation',
]) {
  assert.match(
    toolsSource,
    new RegExp(expected.replaceAll('/', '\\/').replaceAll('?', '\\?')),
    `Expected /tools page to include ${expected}`,
  );
}

assert.match(
  sitemapSource,
  /path: '\/tools'/,
  'Expected /tools to be included in the sitemap.',
);

assert.match(
  homepageSource,
  /href="\/tools"/,
  'Expected homepage navigation to expose the free tools hub.',
);

assert.doesNotMatch(
  toolsSource,
  /utm_source=tools/,
  'Internal tools hub links should not overwrite external UTM attribution.',
);

console.log('free-tools-hub checks passed');
