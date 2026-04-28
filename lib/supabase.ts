import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────────────────────
// Supabase server-side client
// Uses the SERVICE ROLE key — server-side only, never expose to the client.
// ─────────────────────────────────────────────────────────────────────────────

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "Missing Supabase env vars: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required."
  );
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─────────────────────────────────────────────────────────────────────────────
// Payment record type — M-Pesa Daraja 3.0
// ─────────────────────────────────────────────────────────────────────────────

export interface PaymentRecord {
  id?: string;

  // Daraja STK push identifiers
  checkout_request_id: string;       // Daraja's CheckoutRequestID
  merchant_request_id?: string | null;

  // Customer details
  phone: string;
  email: string;
  full_name?: string | null;

  // Payment details
  amount: number;                    // In KES
  service_name: string;
  premium_option_name: string;
  period: string;

  // Status lifecycle: pending → completed | failed
  status: "pending" | "completed" | "failed";

  // Populated by Daraja callback on success
  mpesa_receipt_number?: string | null;
  transaction_date?: string | null;

  // Populated by Daraja callback on failure
  result_desc?: string | null;

  created_at?: string;
  updated_at?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Insert a new pending payment record after initiating STK push */
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

/** Mark a payment as completed after a successful Daraja callback */
export async function markPaymentCompleted(
  checkoutRequestId: string,
  mpesaReceiptNumber: string,
  transactionDate: string
): Promise<PaymentRecord> {
  const { data: record, error } = await supabase
    .from("payments")
    .update({
      status: "completed",
      mpesa_receipt_number: mpesaReceiptNumber,
      transaction_date: transactionDate,
    })
    .eq("checkout_request_id", checkoutRequestId)
    .select()
    .single();

  if (error) throw new Error(`Supabase update (completed) failed: ${error.message}`);
  return record as PaymentRecord;
}

/** Mark a payment as failed after a non-zero Daraja ResultCode */
export async function markPaymentFailed(
  checkoutRequestId: string,
  resultDesc: string
): Promise<void> {
  const { error } = await supabase
    .from("payments")
    .update({ status: "failed", result_desc: resultDesc })
    .eq("checkout_request_id", checkoutRequestId);

  if (error) throw new Error(`Supabase update (failed) failed: ${error.message}`);
}

/** Fetch a payment record by CheckoutRequestID — used by the status polling route */
export async function getPaymentByCheckoutId(
  checkoutRequestId: string
): Promise<PaymentRecord | null> {
  const { data: record, error } = await supabase
    .from("payments")
    .select("*")
    .eq("checkout_request_id", checkoutRequestId)
    .maybeSingle();

  if (error) throw new Error(`Supabase select failed: ${error.message}`);
  return record as PaymentRecord | null;
}
