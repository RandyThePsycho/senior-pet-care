import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const script = readFileSync(new URL('./net-watchdog.sh', import.meta.url), 'utf8')

assert.match(
  script,
  /LOOPS="\$\{LOOPS:-1\}"/,
  'net-watchdog should default to one loop so Codex runs do not hang silently',
)

assert.doesNotMatch(
  script,
  /ifconfig utun4/,
  'net-watchdog should discover the active utun interface instead of hard-coding utun4',
)

assert.match(
  script,
  /tee -a "\$LOG_FILE"/,
  'net-watchdog should mirror status lines to stdout as well as the log file',
)

assert.doesNotMatch(
  script,
  /\[\[ "\$tun" == 169\.254\.\* \]\][\s\S]{0,120}restart_vpn/,
  'net-watchdog should not restart solely because the active tunnel uses a link-local address',
)

assert.match(
  script,
  /ok_link_local_tun/,
  'net-watchdog should treat link-local tunnel addresses as non-blocking when external and WorkBuddy checks pass',
)

assert.match(
  script,
  /warn_missing_tun/,
  'net-watchdog should still warn when the active tunnel address is missing',
)

assert.match(
  script,
  /WORKBUDDY_HOST="\$\{WORKBUDDY_HOST:-copilot\.tencent\.com\}"/,
  'net-watchdog should check the WorkBuddy model host that previously failed DNS resolution',
)

assert.match(
  script,
  /warn_workbuddy_endpoint/,
  'net-watchdog should report WorkBuddy endpoint DNS/HTTPS failures separately from general VPN failures',
)

assert.match(
  script,
  /flush_dns_cache/,
  'net-watchdog should flush DNS cache for endpoint-specific failures without immediately restarting VPN',
)
