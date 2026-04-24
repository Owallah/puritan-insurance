import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { markPaymentCompleted, markPaymentFailed } from "@/lib/supabase";
import { sendPaymentReceipt } from "@/lib/email";

// ─────────────────────────────────────────────────────────────────────────────
// Paystack Webhook Route
//
// Paystack POSTs here after the customer completes (or abandons) payment.
// We MUST verify the x-paystack-signature header before trusting the payload —
// anyone on the internet can POST to this endpoint otherwise.
//
// Webhook URL: https://yourdomain.co.ke/api/payments/paystack/webhook
// Set this in: Paystack Dashboard → Settings → API Keys & Webhooks → Webhook URL
// ─────────────────────────────────────────────────────────────────────────────

function verifyPaystackSignature(payload: string, signature: string, secret: string): boolean {
  const hash = crypto
    .createHmac("sha512", secret)
    .update(payload)
    .digest("hex");
  return hash === signature;
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    console.error("[paystack/webhook] PAYSTACK_SECRET_KEY is not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  // ── Read raw body (needed for signature verification) ─────────────────────
  const rawBody  = await request.text();
  const signature = request.headers.get("x-paystack-signature") ?? "";

  if (!verifyPaystackSignature(rawBody, signature, secretKey)) {
    console.warn("[paystack/webhook] Invalid signature — request rejected");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = event.event as string;
  const data      = event.data as Record<string, unknown>;

  console.log(`[paystack/webhook] Event received: ${eventType}`);

  // ── Handle charge.success ─────────────────────────────────────────────────
  if (eventType === "charge.success") {
    const reference       = data.reference as string;
    const transactionId   = String(data.id);
    const paidAt          = data.paid_at as string;
    const channel         = data.channel as string;
    const gatewayResponse = data.gateway_response as string;

    try {
      const payment = await markPaymentCompleted(
        reference,
        transactionId,
        paidAt,
        channel,
        gatewayResponse
      );

      // Send receipt email — errors are caught inside sendPaymentReceipt
      // so a failed email never causes a non-200 response back to Paystack
      await sendPaymentReceipt(payment);

      console.log(
        `[paystack/webhook] Payment completed. ref=${reference} channel=${channel} txId=${transactionId}`
      );
    } catch (error) {
      // Log but return 200 — Paystack retries on non-2xx responses, which
      // could cause duplicate processing.
      console.error("[paystack/webhook] Error handling charge.success:", error);
    }
  }

  // ── Handle charge.failed ──────────────────────────────────────────────────
  if (eventType === "charge.failed") {
    const reference       = data.reference as string;
    const gatewayResponse = (data.gateway_response as string) ?? "Payment failed";

    try {
      await markPaymentFailed(reference, gatewayResponse);
      console.log(`[paystack/webhook] Payment failed. ref=${reference} reason="${gatewayResponse}"`);
    } catch (error) {
      console.error("[paystack/webhook] Error handling charge.failed:", error);
    }
  }

  // Always acknowledge to Paystack with 200
  return NextResponse.json({ received: true });
}
