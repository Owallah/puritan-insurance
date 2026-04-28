import { NextRequest, NextResponse } from "next/server";
import { markPaymentCompleted, markPaymentFailed } from "@/lib/supabase";
import { sendPaymentReceipt } from "@/lib/email";

// ─────────────────────────────────────────────────────────────────────────────
// M-Pesa Callback Route — Daraja 3.0
//
// Safaricom POSTs here after the customer enters their PIN.
//
// CRITICAL RULES:
//  1. Always return HTTP 200 — non-2xx causes Safaricom to retry indefinitely
//  2. Callback URL must be publicly reachable HTTPS (not localhost)
//  3. For local dev: npx ngrok http 3000 → set MPESA_CALLBACK_URL to ngrok URL
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Daraja wraps everything in Body.stkCallback
    const stkCallback = body?.Body?.stkCallback;
    if (!stkCallback) {
      console.error("[mpesa-callback] Unexpected payload shape:", JSON.stringify(body));
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

    console.log(`[mpesa-callback] CheckoutRequestID=${CheckoutRequestID} ResultCode=${ResultCode}`);

    if (ResultCode === 0) {
      // ── Successful payment ──────────────────────────────────────────────────
      const items: Array<{ Name: string; Value?: string | number }> =
        CallbackMetadata?.Item ?? [];

      const get = (name: string) => String(items.find((i) => i.Name === name)?.Value ?? "");

      const mpesaReceiptNumber = get("MpesaReceiptNumber");
      const transactionDate    = get("TransactionDate");

      const payment = await markPaymentCompleted(
        CheckoutRequestID,
        mpesaReceiptNumber,
        transactionDate
      );

      // Send receipt — errors caught inside sendPaymentReceipt, never thrown
      await sendPaymentReceipt(payment);

      console.log(`[mpesa-callback] Completed. Receipt=${mpesaReceiptNumber}`);
    } else {
      // ── Failed or cancelled ─────────────────────────────────────────────────
      await markPaymentFailed(CheckoutRequestID, ResultDesc);
      console.log(`[mpesa-callback] Failed. Reason="${ResultDesc}"`);
    }
  } catch (error) {
    // Log but always return 200 so Safaricom does not retry
    console.error("[mpesa-callback] Error:", error);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
