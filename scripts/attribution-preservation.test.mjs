import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const sourcePath = new URL('../src/lib/attribution.ts', import.meta.url);
assert.ok(existsSync(sourcePath), 'Expected src/lib/attribution.ts to exist.');

const source = readFileSync(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  fileName: sourcePath.pathname,
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempDir = mkdtempSync(join(tmpdir(), 'senior-pet-attribution-'));
const compiledPath = join(tempDir, 'attribution.mjs');
writeFileSync(compiledPath, compiled.outputText);

const {
  captureAttributionFromLocation,
  getAttributionSnapshot,
  getAttributionUtm,
} = await import(pathToFileURL(compiledPath));

const storage = new Map();

globalThis.window = {
  location: new URL(
    'https://pawcheckin.com/?utm_source=reddit&utm_medium=social&utm_campaign=caregiver_questions&utm_content=thread_a',
  ),
  localStorage: {
    getItem(key) {
      return storage.get(key) ?? null;
    },
    setItem(key, value) {
      storage.set(key, String(value));
    },
  },
};

globalThis.document = {
  referrer: 'https://www.reddit.com/r/seniordogs/comments/example',
};

captureAttributionFromLocation();

window.location = new URL(
  'https://pawcheckin.com/tools/senior-pet-quality-of-life-calculator',
);
document.referrer = 'https://pawcheckin.com/';

captureAttributionFromLocation();

const snapshot = getAttributionSnapshot();
assert.equal(
  snapshot.last.utmSource,
  'reddit',
  'internal navigation without UTM should not erase the last attributed source',
);

assert.deepEqual(
  getAttributionUtm(snapshot),
  {
    utmSource: 'reddit',
    utmMedium: 'social',
    utmCampaign: 'caregiver_questions',
    utmContent: 'thread_a',
  },
  'attribution UTM fallback should return last-touch values and preserve first-touch values when needed',
);
