import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('scripts/growth-utm-read.mjs', 'utf8');

assert.match(
  source,
  /--content <utm_content>/,
  'Expected the growth UTM read script to document the required content flag.',
);

assert.match(
  source,
  /readFileSync\('\.env\.local'/,
  'Expected the script to read Supabase env values from .env.local.',
);

assert.match(
  source,
  /matchesContentInMetadata/,
  'Expected the script to include metadata fallback attribution reads.',
);

assert.doesNotMatch(
  source,
  /console\.log\([^\n]*(SUPABASE|SERVICE_ROLE|NEXT_PUBLIC_SUPABASE)/,
  'The script must not print Supabase environment variable names or keys.',
);
