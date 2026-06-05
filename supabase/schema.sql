-- supabase/schema.sql
-- Senior Pet Care · Feature A 数据结构预留（仅 schema，不接入代码）
--
-- 说明：
--   * MVP 采用「匿名 petId」模式：不做登录系统，pets.id (UUID) 即 Journal 访问凭证。
--   * users 仅关联留资邮箱；pet 可先于 user 存在（先评估后留邮箱）。
--   * 本文件可直接在 Supabase SQL Editor 执行。
--   * MVP 暂不启用 RLS；引入真实账户时再开启。

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- users：留资邮箱主体
-- ---------------------------------------------------------------------------
create table if not exists users (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  source      text,                                   -- 来源，如 'calculator_result'
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- pets：宠物档案。id 作为匿名 Journal token。user_id 可空。
-- ---------------------------------------------------------------------------
create table if not exists pets (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references users(id) on delete set null,
  name        text,
  pet_type    text check (pet_type in ('dog','cat')),
  age         numeric,
  weight      numeric,
  weight_unit text check (weight_unit in ('lb','kg')) default 'lb',
  size        text,
  conditions  jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- assessments：每次评估快照。reassessment_of 指向上一次评估（用于趋势对比）。
-- ---------------------------------------------------------------------------
create table if not exists assessments (
  id              uuid primary key default gen_random_uuid(),
  pet_id          uuid not null references pets(id) on delete cascade,
  user_id         uuid references users(id) on delete set null,
  total_score     int check (total_score between 0 and 70),
  risk_level      text check (risk_level in
                    ('stable','needs_monitoring','vet_visit','end_of_life')),
  scores          jsonb not null default '{}'::jsonb,  -- { hurt, hunger, ... }
  symptoms        jsonb not null default '[]'::jsonb,
  low_dimensions  jsonb not null default '[]'::jsonb,
  urgent_flag     boolean not null default false,
  tags            jsonb not null default '[]'::jsonb,
  vet_questions   jsonb not null default '[]'::jsonb,
  reassessment_of uuid references assessments(id) on delete set null,
  next_reassessment_at timestamptz,
  created_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- email_events：邮件 / 留资事件，用于计算 7-day re-assessment rate。
-- ---------------------------------------------------------------------------
create table if not exists email_events (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references users(id) on delete cascade,
  pet_id        uuid references pets(id) on delete set null,
  assessment_id uuid references assessments(id) on delete set null,
  event_type    text not null,   -- 'subscribe' | 'welcome' | 'pdf' | 'reassess_reminder' | 'reassess_completed' ...
  provider      text,            -- 'mock' | 'convertkit' | 'mailerlite'
  payload       jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 基础索引
-- ---------------------------------------------------------------------------
create index if not exists users_email_idx            on users(email);
create index if not exists pets_user_id_idx           on pets(user_id);
create index if not exists assessments_pet_id_idx     on assessments(pet_id);
create index if not exists email_events_assessment_idx on email_events(assessment_id);
create index if not exists email_events_event_type_idx on email_events(event_type);

-- ---------------------------------------------------------------------------
-- need_submissions：Share Situation 页面收集的需求与痛点。
-- 不做诊断，不承诺回复；用于判断哪些资源应优先建设。
-- ---------------------------------------------------------------------------
create table if not exists need_submissions (
  id               uuid primary key default gen_random_uuid(),
  pet_type         text check (pet_type in ('dog','cat','other')) default 'dog',
  pet_age          text,
  main_concern     jsonb not null default '[]'::jsonb,
  stuck_points     jsonb not null default '[]'::jsonb,
  needed_help      jsonb not null default '[]'::jsonb,
  what_would_help  text,
  free_text        text,
  email            text,
  source           text default 'share_your_situation',
  created_at       timestamptz not null default now()
);

create index if not exists need_submissions_created_at_idx
  on need_submissions(created_at desc);
create index if not exists need_submissions_pet_type_idx
  on need_submissions(pet_type);
create index if not exists need_submissions_main_concern_gin_idx
  on need_submissions using gin(main_concern);
create index if not exists need_submissions_stuck_points_gin_idx
  on need_submissions using gin(stuck_points);
create index if not exists need_submissions_needed_help_gin_idx
  on need_submissions using gin(needed_help);

-- ---------------------------------------------------------------------------
-- page_events：轻量 first-party pageview 事件。
-- 仅用于判断外部渠道是否有人点进来；不存邮箱、petId、report/journal token 或 IP。
-- ---------------------------------------------------------------------------
create table if not exists page_events (
  id            uuid primary key default gen_random_uuid(),
  path          text not null,
  referrer      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  created_at    timestamptz not null default now()
);

alter table page_events enable row level security;

create index if not exists page_events_created_at_idx
  on page_events(created_at desc);
create index if not exists page_events_path_idx
  on page_events(path);
create index if not exists page_events_utm_source_idx
  on page_events(utm_source);

-- ---------------------------------------------------------------------------
-- TODO（下一阶段）：用 email_events + assessments 计算 7-day re-assessment rate。
--   思路：
--   1) 分母 = 留资用户数：count(distinct user_id) from email_events where event_type='subscribe'
--   2) 分子 = 7 天内完成复评的用户数：
--        存在一条 assessments.reassessment_of 不为空，且其 created_at
--        在首次 subscribe 后 0–7 天内。
--   例：
--   with first_sub as (
--     select user_id, min(created_at) as subscribed_at
--     from email_events where event_type='subscribe' group by user_id
--   ),
--   reassessed as (
--     select distinct a.user_id from assessments a
--     join first_sub f on f.user_id = a.user_id
--     where a.reassessment_of is not null
--       and a.created_at <= f.subscribed_at + interval '7 days'
--   )
--   select (select count(*) from reassessed)::float
--          / nullif((select count(*) from first_sub), 0) as seven_day_reassessment_rate;
-- ---------------------------------------------------------------------------

-- 可选：V2 引入真实账户时再启用 RLS（MVP 匿名模式下保持关闭）
-- alter table users enable row level security; ...
