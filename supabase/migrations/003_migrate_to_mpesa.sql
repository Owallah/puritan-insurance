-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 003 — Replace Paystack payments table with M-Pesa (Daraja 3.0)
--
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
--
-- If you have existing Paystack payment records you want to keep,
-- comment out the DROP TABLE line and handle the column differences manually.
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop existing Paystack payments table (safe on a fresh project)
drop table if exists public.payments cascade;

-- ── M-Pesa payments table ─────────────────────────────────────────────────────

create table if not exists public.payments (
  id                    uuid primary key default gen_random_uuid(),

  -- Daraja STK push identifiers
  checkout_request_id   text unique not null,   -- Daraja's CheckoutRequestID
  merchant_request_id   text,                   -- Daraja's MerchantRequestID

  -- Customer details
  phone                 text not null,
  email                 text not null,
  full_name             text,

  -- Payment details
  amount                numeric(12, 2) not null,  -- In KES
  service_name          text not null,
  premium_option_name   text not null,
  period                text not null,            -- monthly | quarterly | semi-annually | annually

  -- Status lifecycle: pending → completed | failed
  status                text not null default 'pending'
                          check (status in ('pending', 'completed', 'failed')),

  -- Populated by Daraja callback on success
  mpesa_receipt_number  text,       -- e.g. QHX4KZLP2A
  transaction_date      text,       -- Daraja format: YYYYMMDDHHmmss

  -- Populated by Daraja callback on failure
  result_desc           text,       -- Human-readable failure reason from Daraja

  -- Timestamps
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
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

create index if not exists payments_checkout_request_id_idx on public.payments (checkout_request_id);
create index if not exists payments_email_idx               on public.payments (email);
create index if not exists payments_status_idx              on public.payments (status);
create index if not exists payments_created_at_idx          on public.payments (created_at desc);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Service role (server-side) bypasses RLS automatically.
-- Anon / public users have zero access.

alter table public.payments enable row level security;

-- Uncomment when you add an authenticated admin dashboard:
-- create policy "authenticated admins can view payments"
--   on public.payments for select
--   using (auth.role() = 'authenticated');
