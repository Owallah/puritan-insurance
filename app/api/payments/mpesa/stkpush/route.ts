import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createPaymentRecord } from "@/lib/supabase";

// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────

const STKPushSchema = z.object({
  phoneNumber:       z.string().regex(/^254[17]\d{8}$/, "Phone must be in format 2547XXXXXXXX"),
  amount:            z.number().min(1).max(1_000_000),
  email:             z.string().email(),
  fullName:          z.string().min(1).max(100).optional(),
  serviceName:       z.string().min(1),
  premiumOptionName: z.string().min(1),
  period:            z.string().min(1),
});

// ─────────────────────────────────────────────────────────────────────────────
// Daraja 3.0 helpers
// ─────────────────────────────────────────────────────────────────────────────

function getDarajaBaseUrl(): string {
  return process.env.MPESA_ENVIRONMENT === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
}

async function getMpesaToken(): Promise<string> {
  const consumerKey    = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error("MPESA_CONSUMER_KEY and MPESA_CONSUMER_SECRET are required");
  }

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const res = await fetch(
    `${getDarajaBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` }, cache: "no-store" }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Daraja token request failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

function getTimestamp(): string {
  return new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
}

function buildPassword(shortcode: string, passkey: string, timestamp: string): string {
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
}

// ─────────────────────────────────────────────────────────────────────────────
// Route handler
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body   = await request.json();
    const parsed = STKPushSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid request parameters", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { phoneNumber, amount, email, fullName, serviceName, premiumOptionName, period } = parsed.data;

    const shortcode   = process.env.MPESA_SHORTCODE;
    const passkey     = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;

    if (!shortcode || !passkey || !callbackUrl) {
      console.error("[stkpush] Missing M-Pesa env vars");
      return NextResponse.json(
        { success: false, message: "Payment service is not configured. Please contact support." },
        { status: 503 }
      );
    }

    const token     = await getMpesaToken();
    const timestamp = getTimestamp();
    const password  = buildPassword(shortcode, passkey, timestamp);
    const accountRef = `PUR-${Date.now().toString(36).toUpperCase()}`.slice(0, 12);

    const stkRes = await fetch(
      `${getDarajaBaseUrl()}/mpesa/stkpush/v1/processrequest`,
      {
        method:  "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password:          password,
          Timestamp:         timestamp,
          TransactionType:   "CustomerPayBillOnline",
          Amount:            Math.ceil(amount),
          PartyA:            phoneNumber,
          PartyB:            shortcode,
          PhoneNumber:       phoneNumber,
          CallBackURL:       callbackUrl,
          AccountReference:  accountRef,
          TransactionDesc:   `${serviceName} premium`,
        }),
        cache: "no-store",
      }
    );

    const stkData = await stkRes.json();

    if (stkData.ResponseCode !== "0") {
      console.error("[stkpush] Daraja rejected STK push:", stkData);
      return NextResponse.json(
        { success: false, message: stkData.CustomerMessage || stkData.errorMessage || "M-Pesa STK push failed. Please try again." },
        { status: 422 }
      );
    }

    await createPaymentRecord({
      checkout_request_id:  stkData.CheckoutRequestID,
      merchant_request_id:  stkData.MerchantRequestID,
      phone:                phoneNumber,
      email,
      full_name:            fullName,
      amount,
      service_name:         serviceName,
      premium_option_name:  premiumOptionName,
      period,
    });

    return NextResponse.json({
      success:           true,
      checkoutRequestID: stkData.CheckoutRequestID,
      customerMessage:   stkData.CustomerMessage,
    });

  } catch (error) {
    console.error("[stkpush] Unhandled error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
