import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import dns from 'node:dns/promises';

const DEFAULT_HOSTS = [
  { name: 'google', url: 'https://www.google.com' },
  { name: 'github', url: 'https://api.github.com' },
  { name: 'pawcheckin', url: 'https://pawcheckin.com' },
  {
    name: 'workbuddy',
    url: 'https://copilot.tencent.com',
    okStatuses: [200, 301, 302, 403, 404],
  },
];

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith('--')) {
      args[key] = 'true';
      continue;
    }
    args[key] = next;
    index += 1;
  }
  return args;
}

function readEnv() {
  try {
    return Object.fromEntries(
      readFileSync('.env.local', 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#') && line.includes('='))
        .map((line) => {
          const index = line.indexOf('=');
          const key = line.slice(0, index);
          const rawValue = line.slice(index + 1).trim();
          return [key, rawValue.replace(/^['"]|['"]$/g, '')];
        }),
    );
  } catch {
    return {};
  }
}

function hostFromUrl(url) {
  return new URL(url).hostname;
}

function vpnStatus(name) {
  try {
    return execFileSync('scutil', ['--nc', 'status', name], {
      encoding: 'utf8',
      timeout: 4_000,
    })
      .split(/\r?\n/)
      .at(0)
      ?.trim() ?? 'unknown';
  } catch {
    return 'unknown';
  }
}

async function timed(label, action) {
  const started = performance.now();
  try {
    const value = await action();
    return {
      ok: true,
      label,
      ms: Math.round(performance.now() - started),
      value,
    };
  } catch (error) {
    return {
      ok: false,
      label,
      ms: Math.round(performance.now() - started),
      error: error?.message ?? String(error),
    };
  }
}

async function checkUrl(target, timeoutMs) {
  const host = hostFromUrl(target.url);
  const dnsResult = await timed('dns.lookup', () => dns.lookup(host));
  const httpsResult = await timed('fetch.head', async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(target.url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': 'pawcheckin-growth-network-preflight/1.0' },
      });
      return {
        status: response.status,
        okStatus: (target.okStatuses ?? [200, 204, 301, 302, 304, 401, 403]).includes(
          response.status,
        ),
      };
    } finally {
      clearTimeout(timeout);
    }
  });

  return {
    name: target.name,
    host,
    dns: dnsResult,
    https: httpsResult,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const samples = Number.parseInt(args.samples ?? '3', 10);
  const timeoutMs = Number.parseInt(args.timeoutMs ?? '12000', 10);
  const vpnName = args.vpnName ?? process.env.VPN_NAME ?? '美国专线';
  const env = readEnv();

  const targets = [...DEFAULT_HOSTS];
  if (env.NEXT_PUBLIC_SUPABASE_URL) {
    targets.push({
      name: 'supabase',
      url: env.NEXT_PUBLIC_SUPABASE_URL,
      okStatuses: [200, 204, 301, 302, 401, 403, 404],
    });
  }

  const status = vpnStatus(vpnName);
  const runs = [];
  for (let index = 0; index < samples; index += 1) {
    const checks = await Promise.all(
      targets.map((target) => checkUrl(target, timeoutMs)),
    );
    runs.push({ sample: index + 1, checks });
    if (index + 1 < samples) await new Promise((resolve) => setTimeout(resolve, 1_000));
  }

  const failures = [];
  const warnings = [];
  if (status !== 'Connected') {
    failures.push(`vpn_status=${status}`);
  }

  for (const target of targets) {
    const targetRuns = runs.map((run) =>
      run.checks.find((check) => check.name === target.name),
    );
    const dnsFailures = targetRuns.filter((check) => !check?.dns.ok);
    const httpsFailures = targetRuns.filter(
      (check) => !check?.https.ok || check.https.value?.okStatus === false,
    );
    const slowDns = targetRuns.filter((check) => check?.dns.ok && check.dns.ms > 2_500);
    const slowHttps = targetRuns.filter(
      (check) => check?.https.ok && check.https.ms > timeoutMs * 0.8,
    );

    if (dnsFailures.length >= Math.ceil(samples / 2)) {
      failures.push(`${target.name}_dns_failed_${dnsFailures.length}/${samples}`);
    }
    if (httpsFailures.length >= Math.ceil(samples / 2)) {
      failures.push(`${target.name}_https_failed_${httpsFailures.length}/${samples}`);
    }
    if (slowDns.length > 0) {
      const maxDnsMs = Math.max(...slowDns.map((check) => check.dns.ms));
      warnings.push(`${target.name}_slow_dns_max_${maxDnsMs}ms`);
    }
    if (slowHttps.length > 0) {
      const maxHttpsMs = Math.max(
        ...slowHttps.map((check) => check.https.ms),
      );
      warnings.push(`${target.name}_slow_https_max_${maxHttpsMs}ms`);
    }
  }

  const result = {
    generated_at_utc: new Date().toISOString(),
    vpn: { name: vpnName, status },
    stable: failures.length === 0,
    failures,
    warnings,
    samples,
    targets: targets.map((target) => ({
      name: target.name,
      host: hostFromUrl(target.url),
    })),
    runs,
  };

  console.log(JSON.stringify(result, null, 2));
  if (!result.stable) process.exit(2);
}

main().catch((error) => {
  console.error(error?.message ?? String(error));
  process.exit(2);
});
