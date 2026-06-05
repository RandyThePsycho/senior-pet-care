import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const shortcutPage = 'src/app/dashboard/[token]/page.tsx';
const robotsSource = readFileSync('src/app/robots.ts', 'utf8');
const runbookSource = readFileSync('docs/internal-dashboard-runbook.md', 'utf8');

assert.ok(
  existsSync(shortcutPage),
  'Expected direct dashboard shortcut route at src/app/dashboard/[token]/page.tsx',
);

const shortcutSource = readFileSync(shortcutPage, 'utf8');

assert.match(shortcutSource, /redirect/);
assert.match(shortcutSource, /internal\/dashboard\?token=/);
assert.match(shortcutSource, /encodeURIComponent/);
assert.match(robotsSource, /\/dashboard\//);
assert.match(runbookSource, /https:\/\/pawcheckin\.com\/dashboard\/YOUR_TOKEN/);
