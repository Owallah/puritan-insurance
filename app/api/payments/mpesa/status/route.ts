import { NextRequest, NextResponse } from "next/server";
import { getPaymentByCheckoutId } from "@/lib/supabase";

// ─────────────────────────────────────────────────────────────────────────────
// Payment Status Route
//
// The frontend polls this every 2 seconds after initiating an STK push
// to determine when Safaricom's callback has updated the record.
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const { checkoutRequestID } = await request.json();

    if (!checkoutRequestID || typeof checkoutRequestID !== "string") {
      return NextResponse.json(
        { success: false, message: "checkoutRequestID is required" },
        { status: 400 }
      );
    }

    const payment = await getPaymentByCheckoutId(checkoutRequestID);

    if (!payment) {
      // Record not yet inserted — possible race condition, return pending
      return NextResponse.json({ success: true, status: "pending" });
    }

    return NextResponse.json({
      success:       true,
      status:        payment.status,
      receiptNumber: payment.mpesa_receipt_number ?? null,
      amount:        payment.amount ?? null,
      resultDesc:    payment.result_desc ?? null,
    });

  } catch (error) {
    console.error("[mpesa-status] Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
