import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const slug = 'senior-dog-supplements-before-buying';
const route = `/guides/${slug}`;
const pagePath = `src/app${route}/page.tsx`;

for (const path of [
  pagePath,
  'src/lib/seoGuides.ts',
  'src/components/guides/GuidePage.tsx',
  'src/components/guides/GuideCheckInCta.tsx',
  'src/app/sitemap.ts',
  'src/app/tools/page.tsx',
]) {
  assert.ok(existsSync(path), `Expected ${path} to exist.`);
}

const pageSource = readFileSync(pagePath, 'utf8');
const guideSource = readFileSync('src/lib/seoGuides.ts', 'utf8');
const guidePageSource = readFileSync('src/components/guides/GuidePage.tsx', 'utf8');
const guideCtaSource = readFileSync(
  'src/components/guides/GuideCheckInCta.tsx',
  'utf8',
);
const sitemapSource = readFileSync('src/app/sitemap.ts', 'utf8');
const toolsSource = readFileSync('src/app/tools/page.tsx', 'utf8');

for (const expected of [
  slug,
  'Senior Dog Supplements Before Buying',
  'Do not buy random senior dog supplements',
  'joint support',
  'omega-3',
  'digestive support',
  'calming products',
  'not a diagnosis',
  'licensed veterinarian',
  '/tools/senior-safe-product-matcher?guide=senior-dog-supplements-before-buying&intent=random_supplement_purchase_confusion',
  'Match support categories before buying',
]) {
  assert.match(
    guideSource,
    new RegExp(expected.replaceAll('/', '\\/').replaceAll('?', '\\?')),
    `Expected guide source to include ${expected}`,
  );
}

assert.match(pageSource, /GuidePage/, 'Expected route to render GuidePage.');
assert.match(pageSource, /generateMetadata/, 'Expected route metadata.');

assert.match(
  sitemapSource,
  /path: '\/guides\/senior-dog-supplements-before-buying'/,
  'Expected supplement buying guide in sitemap.',
);

assert.match(
  toolsSource,
  /senior-dog-supplements-before-buying/,
  'Expected /tools to expose the supplement buying guide.',
);

assert.match(
  guidePageSource,
  /MATCH SUPPORT CATEGORIES/,
  'Expected guide hero CTA text to adapt for support matcher pages.',
);

assert.match(
  guideCtaSource,
  /product_matcher_cta_clicked/,
  'Expected guide CTA component to support product matcher tracking.',
);

console.log('senior-dog-supplement-guide checks passed');
