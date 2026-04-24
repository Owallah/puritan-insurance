import { NextRequest, NextResponse } from "next/server";
import { getPaymentByReference, markPaymentCompleted } from "@/lib/supabase";
import { sendPaymentReceipt } from "@/lib/email";

// ─────────────────────────────────────────────────────────────────────────────
// Paystack Verify Route
//
// Called by the frontend after the Paystack popup closes (success or cancel).
// We verify the transaction directly with Paystack's API — never trust the
// client's word that a payment succeeded.
//
// Flow:
//   1. Frontend popup closes → frontend calls POST /api/payments/paystack/verify
//   2. We call Paystack GET /transaction/verify/:reference
//   3. If status === "success" and our DB record is still "pending", we
//      complete it here (in case the webhook arrived late or was missed).
//   4. Return the current status to the frontend.
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    if (!reference || typeof reference !== "string") {
      return NextResponse.json(
        { success: false, message: "reference is required" },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: "Payment service is not configured." },
        { status: 503 }
      );
    }

    // ── Verify with Paystack ──────────────────────────────────────────────────
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
        cache:   "no-store",
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyRes.ok || !verifyData.status) {
      console.error("[paystack/verify] Paystack verify failed:", verifyData);
      return NextResponse.json(
        { success: false, message: verifyData.message ?? "Verification failed." },
        { status: 422 }
      );
    }

    const tx     = verifyData.data;
    const txStatus: string = tx.status; // "success" | "failed" | "abandoned" | "pending"

    // ── Check our DB record ───────────────────────────────────────────────────
    const payment = await getPaymentByReference(reference);

    // ── If Paystack says success but DB is still pending → complete it ────────
    // This handles the race where the webhook hasn't arrived yet when the
    // customer returns from the checkout popup.
    if (txStatus === "success" && payment && payment.status === "pending") {
      const completed = await markPaymentCompleted(
        reference,
        String(tx.id),
        tx.paid_at,
        tx.channel,
        tx.gateway_response
      );
      await sendPaymentReceipt(completed);
    }

    // ── Map Paystack status → our status ──────────────────────────────────────
    const ourStatus =
      txStatus === "success"
        ? "completed"
        : txStatus === "failed" || txStatus === "abandoned"
        ? "failed"
        : "pending";

    return NextResponse.json({
      success:         true,
      status:          ourStatus,
      reference,
      amount:          tx.amount / 100,          // Convert back from cents to KES
      channel:         tx.channel   ?? null,
      paidAt:          tx.paid_at   ?? null,
      gatewayResponse: tx.gateway_response ?? null,
    });

  } catch (error) {
    console.error("[paystack/verify] Unhandled error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
