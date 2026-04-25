import { sendQuoteRequestNotification } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─────────────────────────────────────────────
// Quote Submission API Route
//
// Currently returns a mock success response.
// To connect to Supabase:
//
// 1. Install: npm install @supabase/supabase-js
// 2. Add env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// 3. Create the table in Supabase:
//
//    CREATE TABLE quote_requests (
//      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//      full_name TEXT NOT NULL,
//      phone TEXT NOT NULL,
//      email TEXT NOT NULL,
//      insurance_type TEXT NOT NULL,
//      message TEXT NOT NULL,
//      status TEXT DEFAULT 'pending',
//      reference_id TEXT UNIQUE NOT NULL,
//      created_at TIMESTAMPTZ DEFAULT NOW()
//    );
//
// 4. Uncomment the Supabase code block below.
// ─────────────────────────────────────────────

const QuoteRequestSchema = z.object({
  fullName: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-Z\s'-]+$/),
  phone: z.string().regex(/^(\+254|0)[17]\d{8}$/),
  email: z.string().email().max(150),
  insuranceType: z.string().min(1),
  message: z.string().min(10).max(1000),
});

function generateReferenceId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `APX-${ts}-${rand}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = QuoteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const referenceId = generateReferenceId();

    // ─── STUB: Supabase insert (uncomment when ready) ────────────────────────
    // import { createClient } from "@supabase/supabase-js";
    // const supabase = createClient(
    //   process.env.SUPABASE_URL!,
    //   process.env.SUPABASE_SERVICE_ROLE_KEY!
    // );
    //
    // const { error } = await supabase.from("quote_requests").insert([{
    //   full_name:       parsed.data.fullName,
    //   phone:           parsed.data.phone,
    //   email:           parsed.data.email,
    //   insurance_type:  parsed.data.insuranceType,
    //   message:         parsed.data.message,
    //   status:          "pending",
    //   reference_id:    referenceId,
    //   created_at:      new Date().toISOString(),
    // }]);
    //
    // if (error) {
    //   console.error("Supabase insert error:", error);
    //   return NextResponse.json(
    //     { success: false, message: "Database error. Please try again." },
    //     { status: 500 }
    //   );
    // }
    // ─────────────────────────────────────────────────────────────────────────

    // STUB: Log to console until Supabase is connected
    await sendQuoteRequestNotification({
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      insuranceType: parsed.data.insuranceType,
      message: parsed.data.message,
      referenceId,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Your quote request has been received. Reference: ${referenceId}`,
        referenceId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

// GET: List quotes (admin use — protect with auth middleware in production)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "pending";

  // FUTURE: Supabase query
  // const { data, error } = await supabase
  //   .from("quote_requests")
  //   .select("*")
  //   .eq("status", status)
  //   .order("created_at", { ascending: false })
  //   .limit(50);

  return NextResponse.json(
    {
      success: true,
      data: [],
      message:
        "Connect Supabase to retrieve real quote requests. See route handler comments.",
    },
    { status: 200 }
  );
}
