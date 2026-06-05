import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const sourcePath = new URL('../src/lib/pageViewEvent.ts', import.meta.url);
assert.ok(existsSync(sourcePath), 'Expected src/lib/pageViewEvent.ts to exist.');

const source = readFileSync(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  fileName: sourcePath.pathname,
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempDir = mkdtempSync(join(tmpdir(), 'senior-pet-pageview-'));
const compiledPath = join(tempDir, 'pageViewEvent.mjs');
writeFileSync(compiledPath, compiled.outputText);

const { normalizePageViewPayload } = await import(pathToFileURL(compiledPath));

const valid = normalizePageViewPayload({
  path: '/tools/senior-pet-quality-of-life-calculator',
  referrer: 'https://x.com/RandythePsycho/status/2062765053229912341',
  utmSource: 'x',
  utmMedium: 'social',
  utmCampaign: 'feature_a_quality_life',
  utmContent: 'seven_day_checkin_link_post',
});

assert.deepEqual(valid, {
  ok: true,
  data: {
    path: '/tools/senior-pet-quality-of-life-calculator',
    referrer: 'https://x.com/RandythePsycho/status/2062765053229912341',
    utm_source: 'x',
    utm_medium: 'social',
    utm_campaign: 'feature_a_quality_life',
    utm_content: 'seven_day_checkin_link_post',
  },
});

assert.deepEqual(normalizePageViewPayload({ path: '/internal/dashboard' }), {
  ok: false,
  error: 'private_path',
});

assert.deepEqual(normalizePageViewPayload({ path: '/journal/pet-id' }), {
  ok: false,
  error: 'private_path',
});

assert.deepEqual(normalizePageViewPayload({ path: 'https://evil.example/x' }), {
  ok: false,
  error: 'invalid_path',
});

const long = 'a'.repeat(1000);
const clipped = normalizePageViewPayload({
  path: '/share-your-situation',
  utmSource: long,
});

assert.equal(clipped.ok, true);
assert.equal(clipped.data.utm_source.length, 120);
