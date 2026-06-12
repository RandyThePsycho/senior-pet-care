import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const sourcePath = new URL('../src/lib/funnelEvent.ts', import.meta.url);
assert.ok(existsSync(sourcePath), 'Expected src/lib/funnelEvent.ts to exist.');

const source = readFileSync(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  fileName: sourcePath.pathname,
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempDir = mkdtempSync(join(tmpdir(), 'senior-pet-funnelevent-'));
const compiledPath = join(tempDir, 'funnelEvent.mjs');
writeFileSync(compiledPath, compiled.outputText);

const { normalizeFunnelEventPayload } = await import(
  pathToFileURL(compiledPath)
);

const valid = normalizeFunnelEventPayload({
  eventName: 'calculator_completed',
  path: '/tools/senior-pet-quality-of-life-calculator',
  referrer: 'https://www.pinterest.com/pin/1102537552556066335/',
  utmSource: 'pinterest',
  utmMedium: 'social',
  utmCampaign: 'feature_a_quality_life',
  utmContent: 'low_appetite_pin',
  props: {
    riskLevel: 'needs_monitoring',
    totalScore: 42,
    hasEmail: true,
  },
});

assert.deepEqual(valid, {
  ok: true,
  data: {
    event_name: 'calculator_completed',
    path: '/tools/senior-pet-quality-of-life-calculator',
    referrer: 'https://www.pinterest.com/pin/1102537552556066335/',
    utm_source: 'pinterest',
    utm_medium: 'social',
    utm_campaign: 'feature_a_quality_life',
    utm_content: 'low_appetite_pin',
    metadata: {
      riskLevel: 'needs_monitoring',
      totalScore: 42,
      hasEmail: true,
    },
  },
});

assert.deepEqual(
  normalizeFunnelEventPayload({
    eventName: 'made_up_event',
    path: '/tools/senior-pet-quality-of-life-calculator',
  }),
  {
    ok: false,
    error: 'invalid_event',
  },
);

assert.deepEqual(
  normalizeFunnelEventPayload({
    eventName: 'journal_opened',
    path: '/journal/pet-token',
  }),
  {
    ok: false,
    error: 'private_path',
  },
);

assert.deepEqual(
  normalizeFunnelEventPayload({
    eventName: 'report_download_clicked',
    path: '/reports/assessment-token',
  }),
  {
    ok: false,
    error: 'private_path',
  },
);

const withSensitiveProps = normalizeFunnelEventPayload({
  eventName: 'email_subscribe_succeeded',
  path: '/tools/senior-pet-quality-of-life-calculator',
  props: {
    email: 'person@example.com',
    petName: 'Milo',
    petId: 'private-pet-id',
    assessmentId: 'private-assessment-id',
    reassessmentUrl: '/tools/senior-pet-quality-of-life-calculator?petId=abc',
    reportUrl: '/reports/private-token',
    journalUrl: '/journal/private-token',
    riskLevel: 'stable',
    totalScore: 56,
    hasEmail: true,
  },
});

assert.equal(withSensitiveProps.ok, true);
assert.deepEqual(withSensitiveProps.data.metadata, {
  riskLevel: 'stable',
  totalScore: 56,
  hasEmail: true,
});

const long = 'a'.repeat(1000);
const clipped = normalizeFunnelEventPayload({
  eventName: 'situation_intake_submitted',
  path: '/share-your-situation',
  referrer: `https://example.com/${long}`,
  utmSource: long,
  props: {
    source: long,
    tags: ['mobility', long, 'appetite'],
  },
});

assert.equal(clipped.ok, true);
assert.equal(clipped.data.referrer.length, 500);
assert.equal(clipped.data.utm_source.length, 120);
assert.equal(clipped.data.metadata.source.length, 160);
assert.deepEqual(clipped.data.metadata.tags, [
  'mobility',
  long.slice(0, 160),
  'appetite',
]);
