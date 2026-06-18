import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

function readEnv() {
  const env = Object.fromEntries(
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

  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase env is missing in .env.local.');
  }

  return env;
}

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

function isSynthetic(row) {
  return (
    row.utm_source === 'codex_local' ||
    row.utm_campaign === 'local_verification'
  );
}

function metadataValue(row, key) {
  const metadata = row.metadata;
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    return null;
  }
  const value = metadata[key];
  return typeof value === 'string' ? value : null;
}

function matchesContentInMetadata(row, content) {
  return (
    metadataValue(row, 'first_utm_content') === content ||
    metadataValue(row, 'last_utm_content') === content
  );
}

async function fetchRows(supabase, table, columns, since, applyFilter) {
  let query = supabase
    .from(table)
    .select(columns)
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(500);

  if (applyFilter) query = applyFilter(query);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).filter((row) => !isSynthetic(row));
}

async function countRows(supabase, table, since, applyFilter) {
  let query = supabase
    .from(table)
    .select('id', { count: 'exact', head: true })
    .gte('created_at', since);

  if (applyFilter) query = applyFilter(query);

  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const content = args.content;
  const since =
    args.since ??
    new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  if (!content) {
    throw new Error(
      'Usage: node scripts/growth-utm-read.mjs --content <utm_content> [--since <iso>]',
    );
  }

  const env = readEnv();
  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } },
  );

  const [pageRows, directFunnelRows, possibleMetadataRows] =
    await Promise.all([
      fetchRows(
        supabase,
        'page_events',
        'created_at,path,referrer,utm_source,utm_medium,utm_campaign,utm_content',
        since,
        (query) => query.eq('utm_content', content),
      ),
      fetchRows(
        supabase,
        'funnel_events',
        'created_at,event_name,path,referrer,utm_source,utm_medium,utm_campaign,utm_content,metadata',
        since,
        (query) => query.eq('utm_content', content),
      ),
      fetchRows(
        supabase,
        'funnel_events',
        'created_at,event_name,path,referrer,utm_source,utm_medium,utm_campaign,utm_content,metadata',
        since,
      ),
    ]);

  const metadataFunnelRows = possibleMetadataRows.filter((row) =>
    matchesContentInMetadata(row, content),
  );

  const downstream = {
    email_events: await countRows(supabase, 'email_events', since),
    assessments: await countRows(supabase, 'assessments', since),
    reassessments: await countRows(
      supabase,
      'assessments',
      since,
      (query) => query.not('reassessment_of', 'is', null),
    ),
    need_submissions: await countRows(supabase, 'need_submissions', since),
  };

  console.log(
    JSON.stringify(
      {
        generated_at_utc: new Date().toISOString(),
        since,
        utm_content: content,
        page_events_target: pageRows.length,
        funnel_events_direct: directFunnelRows.length,
        funnel_events_metadata: metadataFunnelRows.length,
        downstream,
        latest: {
          page_event: pageRows[0] ?? null,
          direct_funnel_event: directFunnelRows[0] ?? null,
          metadata_funnel_event: metadataFunnelRows[0] ?? null,
        },
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
