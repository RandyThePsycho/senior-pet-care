import type { Metadata } from 'next';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  buildDashboardSummary,
  type DashboardAssessmentRow,
  type DashboardEmailEventRow,
  type DashboardFunnelEventRow,
  type DashboardNeedSubmissionRow,
  type DashboardPageEventRow,
  type DashboardSummary,
} from '@/lib/internalDashboard';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Internal dashboard | Senior Pet Care',
  robots: {
    index: false,
    follow: false,
  },
};

interface DashboardPageProps {
  searchParams?: {
    token?: string | string[];
  };
}

interface QueryIssue {
  label: string;
  message: string;
}

interface CountResult {
  count: number;
  issue: QueryIssue | null;
}

const METRIC_LABELS = {
  users: 'Email captures',
  pets: 'Pets',
  assessments: 'Assessments',
  reassessments: 'Reassessments',
  subscribeEvents: 'Subscribe events',
  mailerLiteSucceeded: 'MailerLite successes',
  needSubmissions: 'Need submissions',
  emailEvents: 'Email event rows',
  pageViews: 'Page views',
  funnelEvents: 'Funnel events',
} as const;

const RISK_LABELS: Record<string, string> = {
  stable: 'Stable',
  needs_monitoring: 'Needs monitoring',
  vet_visit: 'Vet visit',
  end_of_life: 'End-of-life support',
  unknown: 'Unknown',
};

const DIMENSION_LABELS: Record<string, string> = {
  hurt: 'Hurt',
  hunger: 'Hunger',
  hydration: 'Hydration',
  hygiene: 'Hygiene',
  happiness: 'Happiness',
  mobility: 'Mobility',
  more_good_days: 'More good days',
};

export default async function InternalDashboardPage({
  searchParams,
}: DashboardPageProps) {
  const configuredToken = process.env.INTERNAL_DASHBOARD_TOKEN;

  if (!configuredToken) {
    return (
      <DashboardShell
        eyebrow="Internal"
        title="Dashboard disabled"
        description="Set INTERNAL_DASHBOARD_TOKEN in the server environment before using this private page."
      >
        <StatusPanel
          title="No dashboard token is configured"
          body="This route is intentionally inert until the server has a private token. It is also excluded from robots indexing."
        />
      </DashboardShell>
    );
  }

  if (getProvidedToken(searchParams) !== configuredToken) {
    return (
      <DashboardShell
        eyebrow="Internal"
        title="Not authorized"
        description="Open this page with the private dashboard token to view aggregate launch metrics."
      >
        <StatusPanel
          title="Token required"
          body="No private data is shown here. Add the configured token as the token query parameter."
        />
      </DashboardShell>
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <DashboardShell
        eyebrow="Internal"
        title="Supabase is not configured"
        description="The dashboard can render only after NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are available on the server."
      >
        <StatusPanel
          title="No database connection"
          body="Pageview analytics are separate from Supabase. Configure Plausible or GA4 env vars to measure browsing traffic."
        />
      </DashboardShell>
    );
  }

  const { summary, issues } = await loadDashboardData();

  return (
    <DashboardShell
      eyebrow="Internal"
      title="Launch signal dashboard"
      description="Aggregate-only view for Feature A traffic, email capture, reassessment, and need discovery signals."
    >
      {issues.length > 0 ? (
        <section className="rounded-lg border border-clay-600/30 bg-white/88 p-4 text-sm text-clay-600 shadow-inset">
          <h2 className="font-semibold text-navy-700">Query notes</h2>
          <ul className="mt-2 space-y-1">
            {issues.map((issue) => (
              <li key={`${issue.label}-${issue.message}`}>
                {issue.label}: {issue.message}
              </li>
            ))}
          </ul>
          {issues.some((issue) => issue.label === 'page_events') ? (
            <p className="mt-3 max-w-3xl text-navy-500">
              To enable first-party pageview storage, run
              {' '}
              <code className="rounded bg-cream-100 px-1 py-0.5 text-navy-700">
                supabase/migrations/20260605_add_page_events.sql
              </code>
              {' '}
              in Supabase SQL Editor.
            </p>
          ) : null}
          {issues.some((issue) => issue.label === 'funnel_events') ? (
            <p className="mt-3 max-w-3xl text-navy-500">
              To enable first-party funnel storage, run
              {' '}
              <code className="rounded bg-cream-100 px-1 py-0.5 text-navy-700">
                supabase/migrations/20260612_add_funnel_events.sql
              </code>
              {' '}
              in Supabase SQL Editor.
            </p>
          ) : null}
        </section>
      ) : null}

      <AnalyticsStatus summary={summary} />
      <PageViewSignalPanel summary={summary} />
      <FunnelSignalPanel summary={summary} />
      <GrowthSignalPanel summary={summary} />
      <MetricGrid summary={summary} />

      <div className="grid gap-4 lg:grid-cols-3">
        <DistributionPanel
          title="Risk levels"
          emptyLabel="No assessments yet"
          counts={summary.riskCounts}
          labels={RISK_LABELS}
        />
        <DistributionPanel
          title="Low dimensions"
          emptyLabel="No low dimensions yet"
          counts={summary.lowDimensionCounts}
          labels={DIMENSION_LABELS}
        />
        <DistributionPanel
          title="Real sources"
          emptyLabel="No real source signals yet"
          counts={summary.realSourceCounts}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <DistributionPanel
          title="Funnel events"
          emptyLabel="No funnel events yet"
          counts={summary.funnelEventCounts}
        />
        <DistributionPanel
          title="Funnel sources"
          emptyLabel="No attributed funnel events yet"
          counts={summary.funnelEventSourceCounts}
        />
        <DistributionPanel
          title="All sources"
          emptyLabel="No source signals yet"
          counts={summary.sourceCounts}
        />
        <DistributionPanel
          title="Test and smoke sources"
          emptyLabel="No test sources detected"
          counts={summary.testSourceCounts}
        />
        <DistributionPanel
          title="User concerns"
          emptyLabel="No intake concerns yet"
          counts={summary.needConcernCounts}
        />
        <DistributionPanel
          title="Pageview sources"
          emptyLabel="No attributed pageviews yet"
          counts={summary.pageViewSourceCounts}
        />
        <DistributionPanel
          title="Where users are stuck"
          emptyLabel="No stuck-point data yet"
          counts={summary.stuckPointCounts}
        />
        <DistributionPanel
          title="Requested help"
          emptyLabel="No requested-help data yet"
          counts={summary.needHelpCounts}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <RecentPageViews pageViews={summary.recentPageViews} />
        <RecentFunnelEvents events={summary.recentFunnelEvents} />
        <RecentEmailEvents events={summary.recentEmailEvents} />
        <RecentNeedSubmissions submissions={summary.recentNeedSubmissions} />
      </div>
    </DashboardShell>
  );
}

async function loadDashboardData(): Promise<{
  summary: DashboardSummary;
  issues: QueryIssue[];
}> {
  const supabase = getServerSupabase();

  const [
    usersCount,
    petsCount,
    assessmentsCount,
    reassessmentsCount,
    emailEventsCount,
    subscribeEventsCount,
    mailerLiteSucceededCount,
    needSubmissionsCount,
    pageViewsCount,
    funnelEventsCount,
    assessments,
    emailEvents,
    needSubmissions,
    pageEvents,
    funnelEvents,
  ] = await Promise.all([
    countTable(supabase, 'users'),
    countTable(supabase, 'pets'),
    countTable(supabase, 'assessments'),
    countWhereNotNull(supabase, 'assessments', 'reassessment_of'),
    countTable(supabase, 'email_events'),
    countWhereEq(supabase, 'email_events', 'event_type', 'subscribe'),
    countWhereEq(
      supabase,
      'email_events',
      'event_type',
      'mailerlite_subscribe_succeeded',
    ),
    countTable(supabase, 'need_submissions'),
    countTable(supabase, 'page_events'),
    countTable(supabase, 'funnel_events'),
    selectRows<DashboardAssessmentRow>(
      supabase,
      'assessments',
      'created_at, risk_level, low_dimensions, reassessment_of',
      500,
    ),
    selectRows<DashboardEmailEventRow>(
      supabase,
      'email_events',
      'created_at, event_type, provider, payload',
      200,
    ),
    selectRows<DashboardNeedSubmissionRow>(
      supabase,
      'need_submissions',
      'created_at, pet_type, main_concern, stuck_points, needed_help, source',
      200,
    ),
    selectRows<DashboardPageEventRow>(
      supabase,
      'page_events',
      'created_at, path, referrer, utm_source, utm_medium, utm_campaign, utm_content',
      300,
    ),
    selectRows<DashboardFunnelEventRow>(
      supabase,
      'funnel_events',
      'created_at, event_name, path, referrer, utm_source, utm_medium, utm_campaign, utm_content, metadata',
      300,
    ),
  ]);

  const issues = [
    usersCount.issue,
    petsCount.issue,
    assessmentsCount.issue,
    reassessmentsCount.issue,
    emailEventsCount.issue,
    subscribeEventsCount.issue,
    mailerLiteSucceededCount.issue,
    needSubmissionsCount.issue,
    pageViewsCount.issue,
    funnelEventsCount.issue,
    assessments.issue,
    emailEvents.issue,
    needSubmissions.issue,
    pageEvents.issue,
    funnelEvents.issue,
  ].filter((issue): issue is QueryIssue => Boolean(issue));

  return {
    issues,
    summary: buildDashboardSummary({
      usersCount: usersCount.count,
      petsCount: petsCount.count,
      assessmentsCount: assessmentsCount.count,
      reassessmentsCount: reassessmentsCount.count,
      emailEventsCount: emailEventsCount.count,
      subscribeEventsCount: subscribeEventsCount.count,
      mailerLiteSucceededCount: mailerLiteSucceededCount.count,
      needSubmissionsCount: needSubmissionsCount.count,
      pageViewsCount: pageViewsCount.count,
      funnelEventsCount: funnelEventsCount.count,
      assessments: assessments.rows,
      emailEvents: emailEvents.rows,
      needSubmissions: needSubmissions.rows,
      pageEvents: pageEvents.rows,
      funnelEvents: funnelEvents.rows,
      analytics: {
        plausibleConfigured: Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
        ga4Configured: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
      },
    }),
  };
}

async function countTable(
  supabase: SupabaseClient,
  table: string,
): Promise<CountResult> {
  const { count, error } = await supabase.from(table).select('id', {
    count: 'exact',
    head: true,
  });

  return countResult(table, count, error?.message ?? null);
}

async function countWhereEq(
  supabase: SupabaseClient,
  table: string,
  column: string,
  value: string,
): Promise<CountResult> {
  const { count, error } = await supabase
    .from(table)
    .select('id', {
      count: 'exact',
      head: true,
    })
    .eq(column, value);

  return countResult(table, count, error?.message ?? null);
}

async function countWhereNotNull(
  supabase: SupabaseClient,
  table: string,
  column: string,
): Promise<CountResult> {
  const { count, error } = await supabase
    .from(table)
    .select('id', {
      count: 'exact',
      head: true,
    })
    .not(column, 'is', null);

  return countResult(table, count, error?.message ?? null);
}

function countResult(
  table: string,
  count: number | null,
  errorMessage: string | null,
): CountResult {
  return {
    count: count ?? 0,
    issue: errorMessage
      ? {
          label: table,
          message: errorMessage,
        }
      : null,
  };
}

async function selectRows<T>(
  supabase: SupabaseClient,
  table: string,
  columns: string,
  limit: number,
): Promise<{ rows: T[]; issue: QueryIssue | null }> {
  const { data, error } = await supabase
    .from(table)
    .select(columns)
    .order('created_at', { ascending: false })
    .limit(limit);

  return {
    rows: error || !data ? [] : (data as T[]),
    issue: error
      ? {
          label: table,
          message: error.message,
        }
      : null,
  };
}

function DashboardShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen px-4 py-8 text-navy-700 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-700">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-display text-3xl text-navy-800 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-navy-500 sm:text-base">
            {description}
          </p>
        </header>
        {children}
      </div>
    </main>
  );
}

function StatusPanel({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-lg border border-navy-200 bg-white/88 p-5 shadow-inset">
      <h2 className="text-base font-semibold text-navy-800">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-navy-500">{body}</p>
    </section>
  );
}

function AnalyticsStatus({ summary }: { summary: DashboardSummary }) {
  const hasPageviewTool =
    summary.analytics.plausibleConfigured || summary.analytics.ga4Configured;

  return (
    <section className="rounded-lg border border-navy-200 bg-white/88 p-5 shadow-inset">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-semibold text-navy-800">
            Pageview tracking
          </h2>
          <p className="mt-1 text-sm leading-6 text-navy-500">
            {hasPageviewTool
              ? 'A browser analytics script is configured. Supabase still records conversion events separately.'
              : 'No Plausible or GA4 env var is configured, so browsing traffic is not reliably counted yet.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge
            label="Plausible"
            active={summary.analytics.plausibleConfigured}
          />
          <StatusBadge label="GA4" active={summary.analytics.ga4Configured} />
          <StatusBadge label="Supabase" active />
        </div>
      </div>
    </section>
  );
}

function PageViewSignalPanel({ summary }: { summary: DashboardSummary }) {
  const { real, test, unattributed } = summary.pageViewQuality;

  return (
    <section className="rounded-lg border border-navy-200 bg-white/88 p-5 shadow-inset">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-base font-semibold text-navy-800">
            Pageview attribution
          </h2>
          <p className="mt-1 text-sm leading-6 text-navy-500">
            {summary.totals.pageViews > 0
              ? 'First-party pageview rows are stored separately from conversion events, so visits do not get mistaken for product traction.'
              : 'No first-party pageview rows are stored yet. Run the page_events SQL migration to enable this view in production.'}
          </p>
        </div>
        <dl className="grid min-w-full grid-cols-3 gap-2 sm:min-w-[26rem]">
          <SignalStat label="Real" value={real} tone="real" />
          <SignalStat label="Test" value={test} tone="test" />
          <SignalStat label="Unattributed" value={unattributed} tone="neutral" />
        </dl>
      </div>
    </section>
  );
}

function FunnelSignalPanel({ summary }: { summary: DashboardSummary }) {
  const { real, test, unattributed } = summary.funnelEventQuality;

  return (
    <section className="rounded-lg border border-navy-200 bg-white/88 p-5 shadow-inset">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-base font-semibold text-navy-800">
            Funnel attribution
          </h2>
          <p className="mt-1 text-sm leading-6 text-navy-500">
            {summary.totals.funnelEvents > 0
              ? 'Feature A actions are stored as aggregate events, making channel quality measurable beyond raw visits.'
              : 'No funnel events are stored yet. Run the funnel_events SQL migration and complete a calculator flow to populate this view.'}
          </p>
        </div>
        <dl className="grid min-w-full grid-cols-3 gap-2 sm:min-w-[26rem]">
          <SignalStat label="Real" value={real} tone="real" />
          <SignalStat label="Test" value={test} tone="test" />
          <SignalStat label="Unattributed" value={unattributed} tone="neutral" />
        </dl>
      </div>
    </section>
  );
}

function StatusBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
        active
          ? 'border-sage-300 bg-sage-50 text-sage-700'
          : 'border-navy-200 bg-cream-50 text-navy-400'
      }`}
    >
      {label}: {active ? 'on' : 'off'}
    </span>
  );
}

function GrowthSignalPanel({ summary }: { summary: DashboardSummary }) {
  const { real, test, unattributed } = summary.signalQuality;
  const hasRealSignal = real > 0;

  return (
    <section className="rounded-lg border border-navy-200 bg-white/88 p-5 shadow-inset">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-base font-semibold text-navy-800">
            Growth signal quality
          </h2>
          <p className="mt-1 text-sm leading-6 text-navy-500">
            {hasRealSignal
              ? 'Real source signals exist. Review them against pageview analytics before judging channel performance.'
              : 'No real attributed conversion or intake signal is visible yet. Current rows are test, smoke, or unattributed.'}
          </p>
        </div>
        <dl className="grid min-w-full grid-cols-3 gap-2 sm:min-w-[26rem]">
          <SignalStat label="Real" value={real} tone="real" />
          <SignalStat label="Test" value={test} tone="test" />
          <SignalStat label="Unattributed" value={unattributed} tone="neutral" />
        </dl>
      </div>
    </section>
  );
}

function SignalStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'real' | 'test' | 'neutral';
}) {
  const toneClass =
    tone === 'real'
      ? 'border-sage-300 bg-sage-50 text-sage-700'
      : tone === 'test'
        ? 'border-amber-200 bg-amber-50 text-navy-600'
        : 'border-navy-200 bg-cream-50 text-navy-500';

  return (
    <div className={`rounded-lg border p-3 ${toneClass}`}>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em]">
        {label}
      </dt>
      <dd className="mt-1 text-2xl font-semibold">{value}</dd>
    </div>
  );
}

function MetricGrid({ summary }: { summary: DashboardSummary }) {
  const metrics = [
    { key: 'pageViews', value: summary.totals.pageViews },
    { key: 'funnelEvents', value: summary.totals.funnelEvents },
    { key: 'users', value: summary.totals.users },
    { key: 'pets', value: summary.totals.pets },
    { key: 'assessments', value: summary.totals.assessments },
    { key: 'reassessments', value: summary.totals.reassessments },
    { key: 'subscribeEvents', value: summary.totals.subscribeEvents },
    {
      key: 'mailerLiteSucceeded',
      value: summary.totals.mailerLiteSucceeded,
    },
    { key: 'needSubmissions', value: summary.totals.needSubmissions },
    { key: 'emailEvents', value: summary.totals.emailEvents },
  ] as const;

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <article
          key={metric.key}
          className="rounded-lg border border-navy-200 bg-white/88 p-4 shadow-inset"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-400">
            {METRIC_LABELS[metric.key]}
          </p>
          <p className="mt-2 text-3xl font-semibold text-navy-800">
            {metric.value.toLocaleString('en-US')}
          </p>
        </article>
      ))}
    </section>
  );
}

function RecentFunnelEvents({
  events,
}: {
  events: DashboardSummary['recentFunnelEvents'];
}) {
  return (
    <section className="rounded-lg border border-navy-200 bg-white/88 p-5 shadow-inset">
      <h2 className="text-base font-semibold text-navy-800">
        Recent funnel events
      </h2>
      {events.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.12em] text-navy-400">
              <tr>
                <th className="pb-2 pr-4 font-semibold">Time</th>
                <th className="pb-2 pr-4 font-semibold">Event</th>
                <th className="pb-2 pr-4 font-semibold">Source</th>
                <th className="pb-2 pr-4 font-semibold">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {events.map((event, index) => (
                <tr key={`${event.createdAt}-${event.eventName}-${index}`}>
                  <td className="py-2 pr-4 text-navy-400">
                    {formatDate(event.createdAt)}
                  </td>
                  <td className="py-2 pr-4 text-navy-600">
                    {event.eventName ? humanizeKey(event.eventName) : 'unknown'}
                    <span className="ml-1 text-navy-300">
                      / {event.path ?? 'unknown path'}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-navy-600">
                    {event.source ?? 'unknown'}
                    <span className="ml-1 text-navy-300">
                      / {event.sourceType}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-navy-600">
                    {event.riskLevel ? humanizeKey(event.riskLevel) : 'n/a'}
                    {typeof event.totalScore === 'number' ? (
                      <span className="ml-1 text-navy-300">
                        / {event.totalScore}
                      </span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-sm text-navy-400">
          No funnel events are stored yet.
        </p>
      )}
    </section>
  );
}

function RecentPageViews({
  pageViews,
}: {
  pageViews: DashboardSummary['recentPageViews'];
}) {
  return (
    <section className="rounded-lg border border-navy-200 bg-white/88 p-5 shadow-inset">
      <h2 className="text-base font-semibold text-navy-800">
        Recent pageviews
      </h2>
      {pageViews.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.12em] text-navy-400">
              <tr>
                <th className="pb-2 pr-4 font-semibold">Time</th>
                <th className="pb-2 pr-4 font-semibold">Path</th>
                <th className="pb-2 pr-4 font-semibold">Source</th>
                <th className="pb-2 pr-4 font-semibold">Campaign</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {pageViews.map((event, index) => (
                <tr key={`${event.createdAt}-${event.path}-${index}`}>
                  <td className="py-2 pr-4 text-navy-400">
                    {formatDate(event.createdAt)}
                  </td>
                  <td className="max-w-[14rem] truncate py-2 pr-4 text-navy-600">
                    {event.path ?? 'unknown'}
                  </td>
                  <td className="py-2 pr-4 text-navy-600">
                    {event.source ?? 'unknown'}
                    <span className="ml-1 text-navy-300">
                      / {event.sourceType}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-navy-600">
                    {event.campaign ? humanizeKey(event.campaign) : 'n/a'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-sm text-navy-400">
          No first-party pageviews are stored yet.
        </p>
      )}
    </section>
  );
}

function DistributionPanel({
  title,
  counts,
  labels = {},
  emptyLabel,
}: {
  title: string;
  counts: Record<string, number>;
  labels?: Record<string, string>;
  emptyLabel: string;
}) {
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <section className="rounded-lg border border-navy-200 bg-white/88 p-5 shadow-inset">
      <h2 className="text-base font-semibold text-navy-800">{title}</h2>
      {rows.length > 0 ? (
        <dl className="mt-4 space-y-3">
          {rows.map(([key, value]) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <dt className="min-w-0 truncate text-sm text-navy-500">
                {labels[key] ?? humanizeKey(key)}
              </dt>
              <dd className="text-sm font-semibold text-navy-800">{value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-4 text-sm text-navy-400">{emptyLabel}</p>
      )}
    </section>
  );
}

function RecentEmailEvents({
  events,
}: {
  events: DashboardSummary['recentEmailEvents'];
}) {
  return (
    <section className="rounded-lg border border-navy-200 bg-white/88 p-5 shadow-inset">
      <h2 className="text-base font-semibold text-navy-800">
        Recent conversion events
      </h2>
      {events.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.12em] text-navy-400">
              <tr>
                <th className="pb-2 pr-4 font-semibold">Time</th>
                <th className="pb-2 pr-4 font-semibold">Event</th>
                <th className="pb-2 pr-4 font-semibold">Source</th>
                <th className="pb-2 pr-4 font-semibold">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {events.map((event, index) => (
                <tr key={`${event.createdAt}-${event.eventType}-${index}`}>
                  <td className="py-2 pr-4 text-navy-400">
                    {formatDate(event.createdAt)}
                  </td>
                  <td className="py-2 pr-4 text-navy-600">
                    {event.eventType ?? 'unknown'}
                    {event.provider ? (
                      <span className="ml-1 text-navy-300">
                        / {event.provider}
                      </span>
                    ) : null}
                  </td>
                  <td className="py-2 pr-4 text-navy-600">
                    {event.source ?? event.utmSource ?? 'unknown'}
                    <span className="ml-1 text-navy-300">
                      / {event.sourceType}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-navy-600">
                    {event.riskLevel ? humanizeKey(event.riskLevel) : 'n/a'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-sm text-navy-400">
          No conversion events are stored yet.
        </p>
      )}
    </section>
  );
}

function RecentNeedSubmissions({
  submissions,
}: {
  submissions: DashboardSummary['recentNeedSubmissions'];
}) {
  return (
    <section className="rounded-lg border border-navy-200 bg-white/88 p-5 shadow-inset">
      <h2 className="text-base font-semibold text-navy-800">
        Recent need submissions
      </h2>
      {submissions.length > 0 ? (
        <div className="mt-4 space-y-3">
          {submissions.map((submission, index) => (
            <article
              key={`${submission.createdAt}-${submission.source}-${index}`}
              className="rounded-md border border-navy-100 bg-cream-50/70 p-3"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-navy-400">
                <span>{formatDate(submission.createdAt)}</span>
                <span>{submission.petType ?? 'pet'}</span>
                <span>{submission.source ?? 'unknown source'}</span>
              </div>
              <p className="mt-2 text-sm text-navy-600">
                Concerns: {formatTags(submission.mainConcern)}
              </p>
              <p className="mt-1 text-sm text-navy-600">
                Help: {formatTags(submission.neededHelp)}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-navy-400">
          No need-intake submissions are stored yet.
        </p>
      )}
    </section>
  );
}

function getProvidedToken(searchParams: DashboardPageProps['searchParams']) {
  const raw = searchParams?.token;
  return Array.isArray(raw) ? raw[0] : raw;
}

function formatDate(value: string | null) {
  if (!value) return 'n/a';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function formatTags(values: string[]) {
  return values.length > 0 ? values.map(humanizeKey).join(', ') : 'none';
}

function humanizeKey(value: string) {
  return value.replaceAll('_', ' ');
}
