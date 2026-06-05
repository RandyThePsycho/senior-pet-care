#!/usr/bin/env bash
set -u

VPN_NAME="${VPN_NAME:-美国专线}"
LOG_FILE="${LOG_FILE:-/tmp/pawcheckin-net-watchdog.log}"
INTERVAL_SECONDS="${INTERVAL_SECONDS:-20}"
LOOPS="${LOOPS:-90}"

log() {
  printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S %Z')" "$*" >> "$LOG_FILE"
}

vpn_status() {
  scutil --nc status "$VPN_NAME" 2>/dev/null | sed -n '1p'
}

tun_address() {
  ifconfig utun4 2>/dev/null | awk '/inet / { print $2; exit }'
}

has_google() {
  curl -sS --max-time 8 https://www.google.com >/dev/null 2>&1
}

has_x_edge() {
  curl -sS -I --max-time 8 https://x.com >/dev/null 2>&1
}

restart_vpn() {
  log "restart_vpn reason=$1"
  dscacheutil -flushcache >/dev/null 2>&1 || true
  killall -HUP mDNSResponder >/dev/null 2>&1 || true
  scutil --nc stop "$VPN_NAME" >/dev/null 2>&1 || true
  sleep 5
  scutil --nc start "$VPN_NAME" >/dev/null 2>&1 || true
  sleep 12
  log "post_restart status=$(vpn_status) tun=$(tun_address)"
}

log "watchdog_start vpn=$VPN_NAME loops=$LOOPS interval=${INTERVAL_SECONDS}s"

for ((i = 1; i <= LOOPS; i += 1)); do
  status="$(vpn_status)"
  tun="$(tun_address)"

  if [[ "$status" != "Connected" ]]; then
    restart_vpn "status_${status:-unknown}"
  elif [[ "$tun" == 169.254.* || -z "$tun" ]]; then
    restart_vpn "bad_tun_${tun:-missing}"
  elif ! has_google && ! has_x_edge; then
    restart_vpn "external_checks_failed"
  else
    log "ok status=$status tun=$tun"
  fi

  sleep "$INTERVAL_SECONDS"
done

log "watchdog_done"
