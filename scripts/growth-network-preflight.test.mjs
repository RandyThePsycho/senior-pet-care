import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('scripts/growth-network-preflight.mjs', 'utf8');

assert.match(
  source,
  /copilot\.tencent\.com/,
  'Expected preflight to check the WorkBuddy endpoint that previously failed DNS.',
);

assert.match(
  source,
  /NEXT_PUBLIC_SUPABASE_URL/,
  'Expected preflight to include the Supabase project host without printing secrets.',
);

assert.match(
  source,
  /scutil', \['--nc', 'status'/,
  'Expected preflight to check the macOS VPN connection state.',
);

assert.match(
  source,
  /process\.exit\(2\)/,
  'Expected preflight to fail closed for unstable network automation runs.',
);

assert.match(
  source,
  /dns\.lookup/,
  'Expected preflight to exercise the system DNS path used by Node/Codex.',
);

assert.match(
  source,
  /fetch\(target\.url/,
  'Expected preflight to verify HTTPS reachability, not just DNS.',
);

console.log('growth-network-preflight static checks passed');
