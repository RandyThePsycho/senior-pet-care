import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const BASELINE_ISO = '2026-06-15T03:16:00Z';
const READY_AT_ISO = '2026-06-18T03:16:00Z';

const TARGETS = [
  {
    name: 'Paws For Seniors',
    content: 'paws_for_seniors_20260615',
    defaultDecision: 'follow_up_if_no_reply_or_bounce',
  },
  {
    name: 'This Ole Dog Rescue',
    content: 'this_ole_dog_rescue_20260615',
    defaultDecision: 'hold_unless_late_click',
  },
  {
    name: 'Senior Cat Action Network',
    content: 'senior_cat_action_network_20260615',
    defaultDecision: 'consider_after_paws',
  },
];

const TRUST_NOTE_NEEDLES = [
  'partner_kit',
  'Shared by a senior-pet organization or community',
  'does not receive your answers',
];

function readEnv() {
  const envText = readFileSync('.env.local', 'utf8');
  const env = Object.fromEntries(
    envText
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

function targetForContent(content) {
  return TARGETS.find((target) => target.content === content);
}

function getMetadataContent(row, key) {
  const metadata = row.metadata;
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    return null;
  }
  const value = metadata[key];
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function isSynthetic(row) {
  return (
    row.utm_source === 'codex_local' ||
    row.utm_campaign === 'local_verification'
  );
}

function groupCounts(rows, contentFromRow) {
  const counts = Object.fromEntries(
    TARGETS.map((target) => [
      target.content,
      {
        count: 0,
        latestAt: null,
      },
    ]),
  );

  for (const row of rows) {
    const content = contentFromRow(row);
    if (!counts[content]) continue;
    counts[content].count += 1;
    if (!counts[content].latestAt || row.created_at > counts[content].latestAt) {
      counts[content].latestAt = row.created_at;
    }
  }

  return counts;
}

function summarizeTargets({ pageRows, funnelDirectRows, funnelMetadataRows }) {
  const pageCounts = groupCounts(pageRows, (row) => row.utm_content);
  const directFunnelCounts = groupCounts(
    funnelDirectRows,
    (row) => row.utm_content,
  );
  const metadataFunnelCounts = groupCounts(funnelMetadataRows, (row) => {
    const first = getMetadataContent(row, 'first_utm_content');
    const last = getMetadataContent(row, 'last_utm_content');
    return targetForContent(last)?.content ?? targetForContent(first)?.content;
  });

  return TARGETS.map((target) => {
    const page = pageCounts[target.content];
    const direct = directFunnelCounts[target.content];
    const metadata = metadataFunnelCounts[target.content];
    const totalFunnelSignals = direct.count + metadata.count;

    return {
      name: target.name,
      utm_content: target.content,
      page_events: page.count,
      latest_page_event_at: page.latestAt,
      direct_funnel_events: direct.count,
      metadata_funnel_events: metadata.count,
      total_funnel_signals: totalFunnelSignals,
      default_decision: target.defaultDecision,
      suggested_action: suggestAction(target, page.count, totalFunnelSignals),
    };
  });
}

function suggestAction(target, pageEvents, funnelSignals) {
  if (target.content === 'paws_for_seniors_20260615') {
    return pageEvents || funnelSignals
      ? 'eligible_for_one_gentle_followup_if_inbox_has_no_reply_or_bounce'
      : 'hold_until_signal';
  }

  if (target.content === 'senior_cat_action_network_20260615') {
    return pageEvents || funnelSignals
      ? 'consider_only_after_paws_decision'
      : 'hold';
  }

  return pageEvents || funnelSignals ? 'review_manually' : 'hold';
}

async function fetchRows(supabase, table, columns) {
  const { data, error } = await supabase
    .from(table)
    .select(columns)
    .gte('created_at', BASELINE_ISO)
    .order('created_at', { ascending: false })
    .limit(5000);

  if (error) throw error;
  return (data ?? []).filter((row) => !isSynthetic(row));
}

async function countRows(supabase, table, extraFilter) {
  let query = supabase
    .from(table)
    .select('id', { count: 'exact', head: true })
    .gte('created_at', BASELINE_ISO);

  if (extraFilter) query = extraFilter(query);

  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

async function checkPartnerTrustNote() {
  const response = await fetch(
    'https://pawcheckin.com/tools/senior-pet-quality-of-life-calculator',
  );
  const html = await response.text();
  const chunkPaths = [
    ...html.matchAll(/src="([^"]*_next\/static\/chunks\/[^"]+\.js)"/g),
  ].map((match) => new URL(match[1], response.url).toString());

  const chunks = await Promise.all(
    chunkPaths.map(async (url) => {
      try {
        const chunkResponse = await fetch(url);
        return await chunkResponse.text();
      } catch {
        return '';
      }
    }),
  );

  const haystack = [html, ...chunks].join('\n');
  const found = TRUST_NOTE_NEEDLES.filter((needle) => haystack.includes(needle));

  return {
    ok: response.ok && found.length === TRUST_NOTE_NEEDLES.length,
    status: response.status,
    found,
    missing: TRUST_NOTE_NEEDLES.filter((needle) => !found.includes(needle)),
  };
}

async function main() {
  const env = readEnv();
  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } },
  );

  const [pageRows, funnelRows, emailEvents, assessments, reassessments, needs] =
    await Promise.all([
      fetchRows(
        supabase,
        'page_events',
        'created_at,path,referrer,utm_source,utm_medium,utm_campaign,utm_content',
      ),
      fetchRows(
        supabase,
        'funnel_events',
        'created_at,event_name,path,referrer,utm_source,utm_medium,utm_campaign,utm_content,metadata',
      ),
      countRows(supabase, 'email_events'),
      countRows(supabase, 'assessments'),
      countRows(supabase, 'assessments', (query) =>
        query.not('reassessment_of', 'is', null),
      ),
      countRows(supabase, 'need_submissions'),
    ]);

  const targetContents = new Set(TARGETS.map((target) => target.content));
  const pageTargetRows = pageRows.filter((row) =>
    targetContents.has(row.utm_content),
  );
  const funnelDirectRows = funnelRows.filter((row) =>
    targetContents.has(row.utm_content),
  );
  const funnelMetadataRows = funnelRows.filter((row) => {
    const first = getMetadataContent(row, 'first_utm_content');
    const last = getMetadataContent(row, 'last_utm_content');
    return targetContents.has(first) || targetContents.has(last);
  });

  const trustNote = await checkPartnerTrustNote();
  const now = new Date();

  const result = {
    generated_at_utc: now.toISOString(),
    ready_at_utc: READY_AT_ISO,
    is_72h_window_open: now >= new Date(READY_AT_ISO),
    baseline_utc: BASELINE_ISO,
    deployment_gate: trustNote,
    downstream_counts_since_baseline: {
      email_events: emailEvents,
      assessments,
      reassessments,
      need_submissions: needs,
    },
    targets: summarizeTargets({
      pageRows: pageTargetRows,
      funnelDirectRows,
      funnelMetadataRows,
    }),
    next_required_checks: [
      'visually_check_126_inbox_for_replies_and_bounces',
      'send_no_followup_before_2026-06-18T03:16:00Z',
      'send_at_most_one_paws_followup_if_no_reply_or_bounce',
    ],
  };

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
