import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const sourcePath = new URL('../src/lib/analyticsRequest.ts', import.meta.url);
assert.ok(
  existsSync(sourcePath),
  'Expected src/lib/analyticsRequest.ts to exist.',
);

const source = readFileSync(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  fileName: sourcePath.pathname,
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempDir = mkdtempSync(join(tmpdir(), 'senior-pet-analytics-request-'));
const compiledPath = join(tempDir, 'analyticsRequest.mjs');
writeFileSync(compiledPath, compiled.outputText);

const {
  shouldSkipAnalyticsPersistence,
  shouldSkipSyntheticAnalyticsSource,
} = await import(pathToFileURL(compiledPath));

assert.equal(
  shouldSkipAnalyticsPersistence(
    new Request('http://localhost:3000/api/analytics/page-view', {
      headers: { host: 'localhost:3000' },
    }),
  ),
  true,
  'localhost analytics requests should not persist to Supabase',
);

assert.equal(
  shouldSkipAnalyticsPersistence(
    new Request('http://127.0.0.1:3000/api/analytics/funnel-event', {
      headers: { host: '127.0.0.1:3000' },
    }),
  ),
  true,
  '127.0.0.1 analytics requests should not persist to Supabase',
);

assert.equal(
  shouldSkipAnalyticsPersistence(
    new Request('http://[::1]:3000/api/analytics/funnel-event', {
      headers: { host: '[::1]:3000' },
    }),
  ),
  true,
  'IPv6 localhost analytics requests should not persist to Supabase',
);

assert.equal(
  shouldSkipAnalyticsPersistence(
    new Request('https://pawcheckin.com/api/analytics/page-view', {
      headers: { host: 'pawcheckin.com' },
    }),
  ),
  false,
  'public production analytics requests should still persist',
);

assert.equal(
  shouldSkipAnalyticsPersistence(
    new Request('https://pawcheckin.com/api/analytics/page-view', {
      headers: {
        host: 'pawcheckin.com',
        'x-forwarded-host': 'localhost:3000',
      },
    }),
  ),
  true,
  'local forwarded hosts should not persist to Supabase',
);

assert.equal(
  shouldSkipSyntheticAnalyticsSource({
    utmSource: 'codex_local',
    utmCampaign: 'local_verification',
  }),
  true,
  'synthetic local verification analytics should not persist on production',
);

assert.equal(
  shouldSkipSyntheticAnalyticsSource({
    utmSource: 'partner_outreach',
    utmCampaign: 'senior_pet_checkin_kit',
  }),
  false,
  'real partner outreach analytics should still persist',
);
