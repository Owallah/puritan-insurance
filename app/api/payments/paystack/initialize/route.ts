import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createPaymentRecord } from "@/lib/supabase";

// ─────────────────────────────────────────────────────────────────────────────
// Validation schema
// ─────────────────────────────────────────────────────────────────────────────

const InitializeSchema = z.object({
  email:             z.string().email("A valid email address is required"),
  amount:            z.number().min(1, "Amount must be at least KES 1").max(1_000_000),
  fullName:          z.string().min(1).max(100),
  phone:             z.string().optional(),
  serviceName:       z.string().min(1),
  premiumOptionName: z.string().min(1),
  period:            z.string().min(1),
});

// ─────────────────────────────────────────────────────────────────────────────
// Reference generator  →  PUR-<timestamp36>  e.g. PUR-LR4WZK2F
// Unique enough for our volume; Paystack also enforces uniqueness server-side.
// ─────────────────────────────────────────────────────────────────────────────

function generateReference(): string {
  return `PUR-${Date.now().toString(36).toUpperCase()}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Route handler
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body   = await request.json();
    const parsed = InitializeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request parameters",
          errors:  parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      email,
      amount,
      fullName,
      phone,
      serviceName,
      premiumOptionName,
      period,
    } = parsed.data;

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.error("[paystack/initialize] PAYSTACK_SECRET_KEY is not set");
      return NextResponse.json(
        { success: false, message: "Payment service is not configured. Please contact support." },
        { status: 503 }
      );
    }

    const reference = generateReference();

    // Paystack amounts are in the smallest currency unit.
    // For KES that is cents (1 KES = 100 cents).
    const amountInCents = Math.ceil(amount * 100);

    // ── Call Paystack Initialize Transaction ──────────────────────────────────
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method:  "POST",
      headers: {
        Authorization:  `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount:    amountInCents,
        reference,
        currency:  "KES",
        full_name: fullName,
        ...(phone ? { phone: phone.trim() } : {}),
        metadata: {
          full_name:          fullName,
          phone:              phone?.trim() ?? "",
          service_name:       serviceName,
          premium_option_name: premiumOptionName,
          period,
          // custom_fields surface in the Paystack dashboard transaction view
          custom_fields: [
            { display_name: "Full Name",    variable_name: "full_name",    value: fullName },
            { display_name: "Service",      variable_name: "service_name", value: serviceName },
            { display_name: "Plan",         variable_name: "plan",         value: premiumOptionName },
            { display_name: "Period",       variable_name: "period",       value: period },
          ],
        },
      }),
      cache: "no-store",
    });

    const paystackData = await paystackRes.json();

    if (!paystackRes.ok || !paystackData.status) {
      console.error("[paystack/initialize] Paystack rejected initialization:", paystackData);
      return NextResponse.json(
        {
          success: false,
          message: paystackData.message ?? "Failed to initialize payment. Please try again.",
        },
        { status: 422 }
      );
    }

    // ── Save pending record to Supabase ───────────────────────────────────────
    await createPaymentRecord({
      reference,
      email,
      full_name:           fullName,
      phone:               phone ?? null,
      amount,
      service_name:        serviceName,
      premium_option_name: premiumOptionName,
      period,
    });

    // ── Return authorization URL to the browser ───────────────────────────────
    return NextResponse.json({
      success:          true,
      authorizationUrl: paystackData.data.authorization_url,
      reference,
    });

  } catch (error) {
    console.error("[paystack/initialize] Unhandled error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
