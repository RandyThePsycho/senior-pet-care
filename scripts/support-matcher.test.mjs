import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const pagePath = 'src/app/tools/senior-safe-product-matcher/page.tsx';
const clientPath =
  'src/components/product-matcher/SeniorSupportMatcherClient.tsx';
const dataPath = 'src/lib/seniorSupportMatcher.ts';
const toolsPagePath = 'src/app/tools/page.tsx';
const nextStepsPath = 'src/components/calculator/NextStepCards.tsx';
const sitemapPath = 'src/app/sitemap.ts';

for (const path of [pagePath, clientPath, dataPath]) {
  assert.ok(existsSync(path), `Expected ${path} to exist.`);
}

const pageSource = readFileSync(pagePath, 'utf8');
const clientSource = readFileSync(clientPath, 'utf8');
const dataSource = readFileSync(dataPath, 'utf8');
const toolsSource = readFileSync(toolsPagePath, 'utf8');
const nextStepsSource = readFileSync(nextStepsPath, 'utf8');
const sitemapSource = readFileSync(sitemapPath, 'utf8');

for (const expected of [
  'Senior Pet Support Matcher',
  'not a diagnosis',
  'licensed veterinarian',
  'AffiliateDisclosure',
  'SeniorSupportMatcherClient',
]) {
  assert.match(pageSource, new RegExp(expected), `Expected page copy: ${expected}`);
}

for (const expected of [
  'joint_support_supplement',
  'omega_3_support',
  'digestive_support',
  'calming_support',
  'orthopedic_bed',
  'non_slip_rugs',
  'notSuitableFor',
  'whatToLookFor',
  'matchSeniorSupportCategories',
]) {
  assert.match(dataSource, new RegExp(expected), `Expected matcher data: ${expected}`);
}

for (const expected of [
  'support_matcher_interest_submitted',
  '/api/need-submissions',
  'Early-access support plan',
  'one-time',
  'This does not buy a supplement today',
]) {
  assert.match(
    clientSource,
    new RegExp(expected.replaceAll('/', '\\/')),
    `Expected client behavior/copy: ${expected}`,
  );
}

assert.match(
  toolsSource,
  /\/tools\/senior-safe-product-matcher/,
  'Expected /tools to expose the support matcher.',
);

assert.match(
  nextStepsSource,
  /SHOW_PRODUCT_CTAS = true/,
  'Expected post-assessment product/support CTAs to be enabled.',
);

assert.match(
  sitemapSource,
  /path: '\/tools\/senior-safe-product-matcher'/,
  'Expected support matcher route in sitemap.',
);

console.log('support-matcher checks passed');
