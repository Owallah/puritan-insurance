import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────────────────────
// Supabase server-side client
//
// Uses the SERVICE ROLE key — never expose this on the client.
// This module must only be imported in API routes / server components.
// ─────────────────────────────────────────────────────────────────────────────

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required."
  );
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Payment record type
// ─────────────────────────────────────────────────────────────────────────────

export interface PaymentRecord {
  id?: string;
  reference: string;                          // Our generated ref e.g. PUR-ABC123
  paystack_transaction_id?: string | null;    // Paystack's transaction ID (from webhook)
  email: string;
  full_name?: string | null;
  phone?: string | null;
  amount: number;                             // In KES
  service_name: string;
  premium_option_name: string;
  period: string;
  channel?: string | null;                    // card | mobile_money | bank | ussd | qr
  status: "pending" | "completed" | "failed";
  paid_at?: string | null;
  gateway_response?: string | null;
  created_at?: string;
  updated_at?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Insert a new pending payment record when a transaction is initialised */
export async function createPaymentRecord(
  data: Omit<PaymentRecord, "id" | "status" | "created_at" | "updated_at">
): Promise<PaymentRecord> {
  const { data: record, error } = await supabase
    .from("payments")
    .insert({ ...data, status: "pending" })
    .select()
    .single();

  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
  return record as PaymentRecord;
}

/** Mark a payment as completed after a successful Paystack webhook */
export async function markPaymentCompleted(
  reference: string,
  paystackTransactionId: string,
  paidAt: string,
  channel: string,
  gatewayResponse: string
): Promise<PaymentRecord> {
  const { data: record, error } = await supabase
    .from("payments")
    .update({
      status: "completed",
      paystack_transaction_id: paystackTransactionId,
      paid_at: paidAt,
      channel,
      gateway_response: gatewayResponse,
    })
    .eq("reference", reference)
    .select()
    .single();

  if (error) throw new Error(`Supabase update (completed) failed: ${error.message}`);
  return record as PaymentRecord;
}

/** Mark a payment as failed */
export async function markPaymentFailed(
  reference: string,
  gatewayResponse: string
): Promise<void> {
  const { error } = await supabase
    .from("payments")
    .update({ status: "failed", gateway_response: gatewayResponse })
    .eq("reference", reference);

  if (error) throw new Error(`Supabase update (failed) failed: ${error.message}`);
}

/** Fetch a payment record by our reference (used by the verify route) */
export async function getPaymentByReference(
  reference: string
): Promise<PaymentRecord | null> {
  const { data: record, error } = await supabase
    .from("payments")
    .select("*")
    .eq("reference", reference)
    .maybeSingle();

  if (error) throw new Error(`Supabase select failed: ${error.message}`);
  return record as PaymentRecord | null;
}
