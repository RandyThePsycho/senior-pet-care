import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const pagePath = 'src/app/partners/senior-pet-check-in-kit/page.tsx';
const sitemapSource = readFileSync('src/app/sitemap.ts', 'utf8');

assert.ok(existsSync(pagePath), `Expected ${pagePath} to exist.`);

const pageSource = readFileSync(pagePath, 'utf8');

assert.match(pageSource, /Senior Pet Check-In Kit/);
assert.match(pageSource, /not a diagnosis/i);
assert.match(pageSource, /licensed veterinarian/i);
assert.match(pageSource, /\/tools\/senior-pet-quality-of-life-calculator/);
assert.match(pageSource, /\/guides\/senior-dog-quality-of-life-checklist/);
assert.match(pageSource, /\/guides\/senior-cat-quality-of-life-checklist/);
assert.doesNotMatch(pageSource, /product recommendations/i);
assert.doesNotMatch(pageSource, /affiliate/i);
assert.match(sitemapSource, /\/partners\/senior-pet-check-in-kit/);
