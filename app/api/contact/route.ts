import { sendContactFormNotification } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─────────────────────────────────────────────
// Contact Form API Route
//
// Currently stubs a success response.
// To connect to an email service (e.g. Resend):
//
// 1. npm install resend
// 2. Add env var: RESEND_API_KEY
// 3. Uncomment the Resend block below.
//
// To store in Supabase:
// 1. Create table: contact_submissions
// 2. See quote route for Supabase setup pattern.
// ─────────────────────────────────────────────

const ContactSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ContactSchema.safeParse(body);

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

    // ─── STUB: Resend email (uncomment when ready) ───────────────────────────
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: "noreply@apexinsurance.co.ke",
    //   to:   "info@apexinsurance.co.ke",
    //   replyTo: parsed.data.email,
    //   subject: `[Contact Form] ${parsed.data.subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${parsed.data.fullName}</p>
    //     <p><strong>Email:</strong> ${parsed.data.email}</p>
    //     <p><strong>Phone:</strong> ${parsed.data.phone || "Not provided"}</p>
    //     <p><strong>Subject:</strong> ${parsed.data.subject}</p>
    //     <hr/>
    //     <p>${parsed.data.message.replace(/\n/g, "<br/>")}</p>
    //   `,
    // });
    // ─────────────────────────────────────────────────────────────────────────

    // STUB: Log to console until email service is connected
    await sendContactFormNotification({
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been sent. We'll get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
