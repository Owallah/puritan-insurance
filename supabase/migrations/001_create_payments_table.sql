-- ─────────────────────────────────────────────────────────────────────────────
-- Puritan Insurance Agency — Payments Table
-- Run this in your Supabase SQL editor (Database → SQL Editor → New Query)
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.payments (
  id                    uuid primary key default gen_random_uuid(),

  -- M-Pesa transaction identifiers
  checkout_request_id   text unique not null,
  merchant_request_id   text,

  -- Customer details
  phone                 text not null,
  email                 text not null,
  full_name             text,

  -- Payment details
  amount                numeric(12, 2) not null,
  service_name          text not null,
  premium_option_name   text not null,
  period                text not null,  -- monthly | annually | etc.

  -- Status lifecycle: pending → completed | failed
  status                text not null default 'pending'
                          check (status in ('pending', 'completed', 'failed')),

  -- Populated by M-Pesa callback on success
  mpesa_receipt_number  text,
  transaction_date      text,

  -- Populated by M-Pesa callback on failure
  result_desc           text,

  -- Timestamps
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- Auto-update updated_at on every row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger payments_updated_at
  before update on public.payments
  for each row execute function public.set_updated_at();

-- Indexes for common query patterns
create index if not exists payments_checkout_request_id_idx on public.payments (checkout_request_id);
create index if not exists payments_email_idx               on public.payments (email);
create index if not exists payments_status_idx              on public.payments (status);
create index if not exists payments_created_at_idx          on public.payments (created_at desc);

-- Row Level Security — service role bypasses RLS; anon/public has no access
alter table public.payments enable row level security;

-- Only the service role (server-side) can read/write payments
-- No policies are created for anon, so anon users have zero access.
-- Add a policy here if you ever need a dashboard for authenticated admins:
--
-- create policy "admins can view payments"
--   on public.payments for select
--   using (auth.role() = 'authenticated');
