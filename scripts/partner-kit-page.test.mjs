import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const pagePath = 'src/app/partners/senior-pet-check-in-kit/page.tsx';
const sharePanelPath = 'src/components/partners/PartnerKitSharePanel.tsx';
const sitemapSource = readFileSync('src/app/sitemap.ts', 'utf8');

assert.ok(existsSync(pagePath), `Expected ${pagePath} to exist.`);
assert.ok(existsSync(sharePanelPath), `Expected ${sharePanelPath} to exist.`);

const pageSource = readFileSync(pagePath, 'utf8');
const sharePanelSource = readFileSync(sharePanelPath, 'utf8');

assert.match(pageSource, /Senior Pet Check-In Kit/);
assert.match(pageSource, /not a diagnosis/i);
assert.match(pageSource, /licensed veterinarian/i);
assert.match(pageSource, /forward one\s+family-facing\s+link/i);
assert.doesNotMatch(pageSource, /product recommendations/i);
assert.doesNotMatch(pageSource, /affiliate/i);

assert.match(sharePanelSource, /const PARTNER_TOOLS_HUB_PATH = '\/tools'/);
assert.match(
  sharePanelSource,
  /label: 'Free tools hub'/,
);
assert.doesNotMatch(
  sharePanelSource,
  /path: '\/tools\/senior-pet-quality-of-life-calculator'/,
);
assert.match(sharePanelSource, /\/guides\/senior-dog-quality-of-life-checklist/);
assert.match(sharePanelSource, /\/guides\/senior-cat-quality-of-life-checklist/);
assert.match(sharePanelSource, /forward this free tools\s+link to one senior pet family/i);
assert.match(sharePanelSource, /Review family tools/);
assert.match(sharePanelSource, /you\s+do not need to collect their information/i);
assert.match(sharePanelSource, /currentSource \?\? 'partner'/);
assert.match(sharePanelSource, /currentContent \?\? fallbackContent/);
assert.doesNotMatch(sharePanelSource, /product recommendations/i);
assert.doesNotMatch(sharePanelSource, /affiliate/i);
assert.match(sitemapSource, /\/partners\/senior-pet-check-in-kit/);
