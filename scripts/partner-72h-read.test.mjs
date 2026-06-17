import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const scriptPath = new URL('./partner-72h-read.mjs', import.meta.url);

assert.ok(existsSync(scriptPath), 'Expected partner-72h-read.mjs to exist.');

const source = readFileSync(scriptPath, 'utf8');

for (const target of [
  'paws_for_seniors_20260615',
  'this_ole_dog_rescue_20260615',
  'senior_cat_action_network_20260615',
]) {
  assert.match(source, new RegExp(target), `Missing target ${target}.`);
}

assert.match(
  source,
  /2026-06-15T03:16:00Z/,
  'Script should use the original post-send baseline.',
);

assert.match(
  source,
  /first_utm_content/,
  'Script should include funnel metadata first-touch fallback.',
);

assert.match(
  source,
  /last_utm_content/,
  'Script should include funnel metadata last-touch fallback.',
);

assert.match(
  source,
  /does not receive your answers/,
  'Script should recheck the public partner trust note before sending.',
);

assert.doesNotMatch(
  source,
  /console\.log\([^\n]*(SUPABASE|SERVICE_ROLE|NEXT_PUBLIC_SUPABASE)/,
  'Script should not print Supabase environment values.',
);
