#!/usr/bin/env bash
set -u

VPN_NAME="${VPN_NAME:-美国专线}"
LOG_FILE="${LOG_FILE:-/tmp/pawcheckin-net-watchdog.log}"
INTERVAL_SECONDS="${INTERVAL_SECONDS:-20}"
LOOPS="${LOOPS:-1}"
CONNECT_TIMEOUT_SECONDS="${CONNECT_TIMEOUT_SECONDS:-4}"
MAX_TIME_SECONDS="${MAX_TIME_SECONDS:-10}"
WORKBUDDY_HOST="${WORKBUDDY_HOST:-copilot.tencent.com}"
WORKBUDDY_URL="${WORKBUDDY_URL:-https://copilot.tencent.com}"

log() {
  printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S %Z')" "$*" | tee -a "$LOG_FILE"
}

vpn_status() {
  scutil --nc status "$VPN_NAME" 2>/dev/null | sed -n '1p'
}

vpn_interface() {
  netstat -rn -f inet |
    awk '$1 == "default" && $NF ~ /^utun[0-9]+$/ { print $NF; exit }'
}

tun_address() {
  local iface
  iface="$(vpn_interface)"

  if [[ -n "$iface" ]]; then
    ifconfig "$iface" 2>/dev/null | awk '/inet / { print $2; exit }'
  fi
}

has_google() {
  curl -sS --connect-timeout "$CONNECT_TIMEOUT_SECONDS" --max-time "$MAX_TIME_SECONDS" \
    https://www.google.com >/dev/null 2>&1
}

has_x_edge() {
  curl -sS -I --connect-timeout "$CONNECT_TIMEOUT_SECONDS" --max-time "$MAX_TIME_SECONDS" \
    https://x.com >/dev/null 2>&1
}

has_workbuddy_dns() {
  dscacheutil -q host -a name "$WORKBUDDY_HOST" >/dev/null 2>&1 ||
    dig +time="$CONNECT_TIMEOUT_SECONDS" +tries=1 "$WORKBUDDY_HOST" A >/dev/null 2>&1
}

has_workbuddy_https() {
  curl -sS -I --connect-timeout "$CONNECT_TIMEOUT_SECONDS" --max-time "$MAX_TIME_SECONDS" \
    "$WORKBUDDY_URL" >/dev/null 2>&1
}

flush_dns_cache() {
  dscacheutil -flushcache >/dev/null 2>&1 || true
  killall -HUP mDNSResponder >/dev/null 2>&1 || true
}

restart_vpn() {
  log "restart_vpn reason=$1"
  flush_dns_cache
  scutil --nc stop "$VPN_NAME" >/dev/null 2>&1 || true
  sleep 5
  scutil --nc start "$VPN_NAME" >/dev/null 2>&1 || true
  sleep 12
  log "post_restart status=$(vpn_status) tun=$(tun_address)"
}

log "watchdog_start vpn=$VPN_NAME loops=$LOOPS interval=${INTERVAL_SECONDS}s"

for ((i = 1; i <= LOOPS; i += 1)); do
  status="$(vpn_status)"
  iface="$(vpn_interface)"
  tun="$(tun_address)"
  workbuddy_dns="ok"
  workbuddy_https="ok"

  has_workbuddy_dns || workbuddy_dns="failed"
  has_workbuddy_https || workbuddy_https="failed"

  if [[ "$status" != "Connected" ]]; then
    restart_vpn "status_${status:-unknown}"
  elif ! has_google && ! has_x_edge; then
    restart_vpn "external_checks_failed"
  elif [[ "$workbuddy_dns" != "ok" || "$workbuddy_https" != "ok" ]]; then
    flush_dns_cache
    log "warn_workbuddy_endpoint status=$status iface=${iface:-missing_iface} tun=${tun:-missing_addr} dns=$workbuddy_dns https=$workbuddy_https host=$WORKBUDDY_HOST"
  elif [[ -z "$tun" ]]; then
    log "warn_missing_tun status=$status iface=${iface:-missing_iface} tun=missing_addr"
  elif [[ "$tun" == 169.254.* ]]; then
    log "ok_link_local_tun status=$status iface=${iface:-missing_iface} tun=$tun external=ok workbuddy_dns=$workbuddy_dns workbuddy_https=$workbuddy_https"
  else
    log "ok status=$status iface=$iface tun=$tun"
  fi

  if ((i < LOOPS)); then
    sleep "$INTERVAL_SECONDS"
  fi
done

log "watchdog_done"
