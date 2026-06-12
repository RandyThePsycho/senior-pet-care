import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const schema = readFileSync('supabase/schema.sql', 'utf8');
const migration = readFileSync(
  'supabase/migrations/20260612_add_funnel_events.sql',
  'utf8',
);

for (const sql of [schema, migration]) {
  assert.match(sql, /create table if not exists funnel_events/i);
  assert.match(sql, /event_name\s+text\s+not null/i);
  assert.match(sql, /path\s+text\s+not null/i);
  assert.match(sql, /utm_source\s+text/i);
  assert.match(sql, /utm_campaign\s+text/i);
  assert.match(sql, /metadata\s+jsonb\s+not null\s+default '\{\}'::jsonb/i);
  assert.match(sql, /alter table funnel_events enable row level security/i);
  assert.match(sql, /create index if not exists funnel_events_created_at_idx/i);
  assert.match(sql, /create index if not exists funnel_events_event_name_idx/i);
  assert.match(sql, /create index if not exists funnel_events_utm_source_idx/i);
  assert.match(sql, /create index if not exists funnel_events_utm_content_idx/i);
}
