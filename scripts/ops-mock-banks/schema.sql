-- UniPrep mock-bank warehouse in the Prep2Go Supabase project.
-- Not app content: Apple clients must not read this schema.
-- Source of truth for the live site remains git JSON until export.

create schema if not exists ops;

revoke all on schema ops from public;
revoke all on schema ops from anon, authenticated;

create table if not exists ops.mock_banks (
  slug text primary key,
  title text not null,
  vertical text,
  family_id text,
  linked_deck_slug text,
  question_count integer not null default 0,
  session_question_count integer,
  last_updated date,
  review_status text not null default 'imported',
  smell_tier text,
  key_bias jsonb not null default '{}'::jsonb,
  thin_distractor_count integer not null default 0,
  source_path text,
  imported_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ops.mock_questions (
  id uuid primary key default gen_random_uuid(),
  bank_slug text not null references ops.mock_banks(slug) on delete cascade,
  question_id text not null,
  exam_slug text not null,
  topic_id text not null,
  prompt text not null,
  formula text,
  options jsonb not null,
  correct_option_id text not null,
  explanation text not null,
  distractor_explanations jsonb not null default '{}'::jsonb,
  difficulty text,
  source_note text,
  position integer not null default 0,
  unique (bank_slug, question_id)
);

create index if not exists mock_questions_bank_topic_idx
  on ops.mock_questions (bank_slug, topic_id);
create index if not exists mock_questions_bank_key_idx
  on ops.mock_questions (bank_slug, correct_option_id);

create table if not exists ops.mock_bank_audits (
  id uuid primary key default gen_random_uuid(),
  bank_slug text not null references ops.mock_banks(slug) on delete cascade,
  audited_at timestamptz not null default now(),
  smell_tier text,
  key_bias jsonb,
  thin_distractor_count integer,
  notes text
);

alter table ops.mock_banks enable row level security;
alter table ops.mock_questions enable row level security;
alter table ops.mock_bank_audits enable row level security;

revoke all on all tables in schema ops from public, anon, authenticated;
grant usage on schema ops to service_role;
grant all on all tables in schema ops to service_role;
grant all on all sequences in schema ops to service_role;

-- Bulk upsert used by scripts/ops-mock-banks/import-all.ts and apply-ops-bank.py
-- Warehouse read: public.ops_get_mock_bank(p_slug) — every review_status
-- Live site read: public.ops_get_live_mock_bank(p_slug) — review_status = ready only
-- RPCs are service_role only; Apple anon/authenticated cannot call them.
