import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const sourcePath = new URL('../src/lib/internalDashboard.ts', import.meta.url);
assert.ok(
  existsSync(sourcePath),
  'Expected src/lib/internalDashboard.ts to exist.',
);

const source = readFileSync(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  fileName: sourcePath.pathname,
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempDir = mkdtempSync(join(tmpdir(), 'senior-pet-dashboard-'));
const compiledPath = join(tempDir, 'internalDashboard.mjs');
writeFileSync(compiledPath, compiled.outputText);

const { buildDashboardSummary } = await import(pathToFileURL(compiledPath));

const summary = buildDashboardSummary({
  usersCount: 3,
  petsCount: 4,
  analytics: {
    plausibleConfigured: false,
    ga4Configured: true,
  },
  assessments: [
    {
      created_at: '2026-06-05T01:00:00.000Z',
      risk_level: 'stable',
      low_dimensions: ['mobility'],
      reassessment_of: null,
    },
    {
      created_at: '2026-06-05T02:00:00.000Z',
      risk_level: 'vet_visit',
      low_dimensions: ['mobility', 'hurt'],
      reassessment_of: 'previous-assessment-id',
    },
    {
      created_at: '2026-06-05T03:00:00.000Z',
      risk_level: null,
      low_dimensions: ['unknown', 7, 'happiness'],
      reassessment_of: null,
    },
  ],
  emailEvents: [
    {
      created_at: '2026-06-05T04:00:00.000Z',
      event_type: 'subscribe',
      provider: 'supabase',
      payload: {
        source: 'reddit',
        attribution: { last: { utmSource: 'reddit' } },
        report_url: '/reports/private',
      },
    },
    {
      created_at: '2026-06-05T04:30:00.000Z',
      event_type: 'subscribe',
      provider: 'supabase',
      payload: {
        source: 'codex_phase3_smoke',
      },
    },
    {
      created_at: '2026-06-05T04:40:00.000Z',
      event_type: 'subscribe',
      provider: 'supabase',
      payload: {},
    },
    {
      created_at: '2026-06-05T04:50:00.000Z',
      event_type: 'subscribe',
      provider: 'supabase',
      payload: {
        source: 'calculator_result',
      },
    },
    {
      created_at: '2026-06-05T05:00:00.000Z',
      event_type: 'mailerlite_subscribe_succeeded',
      provider: 'mailerlite',
      payload: { risk_level: 'stable', subscriber_id: 'secret' },
    },
  ],
  needSubmissions: [
    {
      created_at: '2026-06-05T06:00:00.000Z',
      pet_type: 'dog',
      main_concern: ['mobility', 'vet_conversation'],
      stuck_points: ['what_to_track'],
      needed_help: ['checklist'],
      source: 'share_your_situation',
    },
    {
      created_at: '2026-06-05T07:00:00.000Z',
      pet_type: 'cat',
      main_concern: ['mobility'],
      stuck_points: [],
      needed_help: ['vet_questions'],
      source: 'pinterest',
    },
    {
      created_at: '2026-06-05T08:00:00.000Z',
      pet_type: 'dog',
      main_concern: ['hygiene'],
      stuck_points: [],
      needed_help: [],
      source: 'codex_need_test',
    },
    {
      created_at: '2026-06-05T09:00:00.000Z',
      pet_type: 'cat',
      main_concern: [],
      stuck_points: [],
      needed_help: [],
      source: null,
    },
  ],
  pageEvents: [
    {
      created_at: '2026-06-05T10:00:00.000Z',
      path: '/tools/senior-pet-quality-of-life-calculator',
      referrer: null,
      utm_source: 'x',
      utm_medium: 'social',
      utm_campaign: 'feature_a_quality_life',
      utm_content: 'seven_day_checkin_link_post',
    },
    {
      created_at: '2026-06-05T10:05:00.000Z',
      path: '/tools/senior-pet-quality-of-life-calculator',
      referrer: null,
      utm_source: 'threads',
      utm_medium: 'social',
      utm_campaign: 'feature_a_quality_life',
      utm_content: 'weekly_checkin_link_post',
    },
    {
      created_at: '2026-06-05T10:10:00.000Z',
      path: '/',
      referrer: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
    },
  ],
  funnelEvents: [
    {
      created_at: '2026-06-05T11:00:00.000Z',
      event_name: 'calculator_started',
      path: '/tools/senior-pet-quality-of-life-calculator',
      referrer: null,
      utm_source: 'reddit',
      utm_medium: 'social',
      utm_campaign: 'feature_a_quality_life',
      utm_content: 'night_waking_reply',
      metadata: { riskLevel: 'needs_monitoring', email: 'hidden@example.com' },
    },
    {
      created_at: '2026-06-05T11:05:00.000Z',
      event_name: 'calculator_completed',
      path: '/tools/senior-pet-quality-of-life-calculator',
      referrer: null,
      utm_source: 'reddit',
      utm_medium: 'social',
      utm_campaign: 'feature_a_quality_life',
      utm_content: 'night_waking_reply',
      metadata: { totalScore: 44, riskLevel: 'needs_monitoring' },
    },
    {
      created_at: '2026-06-05T11:10:00.000Z',
      event_name: 'email_subscribe_succeeded',
      path: '/tools/senior-pet-quality-of-life-calculator',
      referrer: null,
      utm_source: 'codex_audit',
      utm_medium: 'smoke_test',
      utm_campaign: 'growth_infra_audit',
      utm_content: 'dashboard_test',
      metadata: {},
    },
    {
      created_at: '2026-06-05T11:15:00.000Z',
      event_name: 'journal_opened',
      path: '/tools/senior-pet-quality-of-life-calculator',
      referrer: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      metadata: {},
    },
  ],
});

assert.equal(summary.totals.users, 3);
assert.equal(summary.totals.pets, 4);
assert.equal(summary.totals.assessments, 3);
assert.equal(summary.totals.reassessments, 1);
assert.equal(summary.totals.needSubmissions, 4);
assert.equal(summary.totals.subscribeEvents, 4);
assert.equal(summary.totals.mailerLiteSucceeded, 1);
assert.equal(summary.totals.pageViews, 3);
assert.equal(summary.totals.funnelEvents, 4);
assert.equal(summary.analytics.ga4Configured, true);
assert.equal(summary.analytics.plausibleConfigured, false);

assert.equal(summary.riskCounts.stable, 1);
assert.equal(summary.riskCounts.vet_visit, 1);
assert.equal(summary.riskCounts.unknown, 1);

assert.equal(summary.lowDimensionCounts.mobility, 2);
assert.equal(summary.lowDimensionCounts.hurt, 1);
assert.equal(summary.lowDimensionCounts.happiness, 1);
assert.equal(summary.lowDimensionCounts.unknown, undefined);

assert.equal(summary.needConcernCounts.mobility, 2);
assert.equal(summary.needConcernCounts.vet_conversation, 1);
assert.equal(summary.needConcernCounts.hygiene, 1);
assert.equal(summary.needHelpCounts.checklist, 1);
assert.equal(summary.needHelpCounts.vet_questions, 1);

assert.deepEqual(summary.sourceCounts, {
  codex_need_test: 1,
  codex_phase3_smoke: 1,
  calculator_result: 1,
  pinterest: 1,
  reddit: 1,
  share_your_situation: 1,
});

assert.deepEqual(summary.realSourceCounts, {
  pinterest: 1,
  reddit: 1,
});

assert.deepEqual(summary.testSourceCounts, {
  codex_need_test: 1,
  codex_phase3_smoke: 1,
});

assert.deepEqual(summary.signalQuality, {
  real: 2,
  test: 2,
  unattributed: 4,
});

assert.deepEqual(summary.pageViewSourceCounts, {
  threads: 1,
  x: 1,
});

assert.deepEqual(summary.pageViewQuality, {
  real: 2,
  test: 0,
  unattributed: 1,
});

assert.deepEqual(summary.funnelEventCounts, {
  calculator_completed: 1,
  calculator_started: 1,
  email_subscribe_succeeded: 1,
  journal_opened: 1,
});

assert.deepEqual(summary.funnelEventSourceCounts, {
  reddit: 2,
});

assert.deepEqual(summary.funnelEventQuality, {
  real: 2,
  test: 1,
  unattributed: 1,
});

assert.deepEqual(summary.recentPageViews[0], {
  createdAt: '2026-06-05T10:00:00.000Z',
  path: '/tools/senior-pet-quality-of-life-calculator',
  source: 'x',
  sourceType: 'real',
  campaign: 'feature_a_quality_life',
  content: 'seven_day_checkin_link_post',
});

assert.deepEqual(summary.recentFunnelEvents[0], {
  createdAt: '2026-06-05T11:00:00.000Z',
  eventName: 'calculator_started',
  path: '/tools/senior-pet-quality-of-life-calculator',
  source: 'reddit',
  sourceType: 'real',
  campaign: 'feature_a_quality_life',
  content: 'night_waking_reply',
  riskLevel: 'needs_monitoring',
  totalScore: null,
});

assert.equal(
  Object.prototype.hasOwnProperty.call(summary.recentFunnelEvents[0], 'metadata'),
  false,
);

assert.deepEqual(summary.recentEmailEvents[0], {
  createdAt: '2026-06-05T04:00:00.000Z',
  eventType: 'subscribe',
  provider: 'supabase',
  source: 'reddit',
  sourceType: 'real',
  utmSource: 'reddit',
  riskLevel: null,
});

assert.equal(
  Object.prototype.hasOwnProperty.call(summary.recentEmailEvents[0], 'payload'),
  false,
);
