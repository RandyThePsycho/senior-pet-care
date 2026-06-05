import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const schema = readFileSync('supabase/schema.sql', 'utf8');
const migration = readFileSync(
  'supabase/migrations/20260605_add_page_events.sql',
  'utf8',
);

for (const sql of [schema, migration]) {
  assert.match(sql, /create table if not exists page_events/i);
  assert.match(sql, /utm_source\s+text/i);
  assert.match(sql, /utm_campaign\s+text/i);
  assert.match(sql, /create index if not exists page_events_created_at_idx/i);
  assert.match(sql, /create index if not exists page_events_utm_source_idx/i);
}
