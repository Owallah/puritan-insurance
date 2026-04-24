-- ─────────────────────────────────────────────────────────────────────────────
-- Puritan Insurance Agency — Paystack Payments Table
-- Migration: 002_create_paystack_payments_table
--
-- Run this in your Supabase SQL editor:
--   Database → SQL Editor → New Query → paste → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop old M-Pesa payments table if it exists (safe on a fresh project)
-- If you have existing data you want to keep, comment this line out.
drop table if exists public.payments cascade;

-- ── Main payments table ───────────────────────────────────────────────────────

create table if not exists public.payments (
  id                       uuid primary key default gen_random_uuid(),

  -- Paystack transaction identifiers
  reference                text unique not null,   -- Our generated ref e.g. PUR-ABC123
  paystack_transaction_id  text,                   -- Paystack's internal transaction ID (from webhook)

  -- Customer details
  email                    text not null,
  full_name                text,
  phone                    text,

  -- Payment details
  amount                   numeric(12, 2) not null,  -- In KES
  service_name             text not null,
  premium_option_name      text not null,
  period                   text not null,            -- monthly | quarterly | semi-annually | annually

  -- Payment channel reported by Paystack
  -- e.g. "card", "mobile_money", "bank", "ussd", "qr"
  channel                  text,

  -- Status lifecycle: pending → completed | failed
  status                   text not null default 'pending'
                             check (status in ('pending', 'completed', 'failed')),

  -- Populated by Paystack webhook on success
  paid_at                  timestamptz,

  -- Populated by Paystack webhook on failure or for audit trail
  gateway_response         text,   -- Human-readable message from Paystack e.g. "Successful"

  -- Timestamps
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- ── Auto-update updated_at ────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists payments_updated_at on public.payments;

create trigger payments_updated_at
  before update on public.payments
  for each row execute function public.set_updated_at();

-- ── Indexes ───────────────────────────────────────────────────────────────────

create index if not exists payments_reference_idx              on public.payments (reference);
create index if not exists payments_paystack_transaction_id_idx on public.payments (paystack_transaction_id);
create index if not exists payments_email_idx                  on public.payments (email);
create index if not exists payments_status_idx                 on public.payments (status);
create index if not exists payments_created_at_idx             on public.payments (created_at desc);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Service role (server-side) bypasses RLS automatically.
-- Anon / public users have zero access — no policies are granted to them.
-- Uncomment the policy below when you add an authenticated admin dashboard.

alter table public.payments enable row level security;

-- create policy "authenticated admins can view payments"
--   on public.payments for select
--   using (auth.role() = 'authenticated');
