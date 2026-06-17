const LOCAL_HOSTS = new Set(['localhost', '0.0.0.0', '::1']);

export function shouldSkipAnalyticsPersistence(request: Request): boolean {
  const candidates = [
    request.url,
    request.headers.get('host'),
    request.headers.get('x-forwarded-host'),
    request.headers.get('origin'),
    request.headers.get('referer'),
  ];

  return candidates.some((candidate) =>
    hostnamesFrom(candidate).some(isLocalHostname),
  );
}

function hostnamesFrom(value: string | null): string[] {
  if (!value) return [];

  return value
    .split(',')
    .map((part) => hostnameFrom(part.trim()))
    .filter((hostname): hostname is string => Boolean(hostname));
}

function hostnameFrom(value: string): string | null {
  if (!value) return null;

  try {
    if (/^https?:\/\//i.test(value)) {
      return new URL(value).hostname;
    }

    return new URL(`http://${value}`).hostname;
  } catch {
    return null;
  }
}

function isLocalHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/^\[|\]$/g, '');
  return LOCAL_HOSTS.has(normalized) || normalized.startsWith('127.');
}
