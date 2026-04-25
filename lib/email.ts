import { Resend } from "resend";
import type { PaymentRecord } from "@/lib/supabase";

// ─────────────────────────────────────────────────────────────────────────────
// Resend email client
// ─────────────────────────────────────────────────────────────────────────────

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = process.env.EMAIL_FROM    ?? "noreply@puritaninsurance.co.ke";
const REPLY_TO     = process.env.EMAIL_REPLY_TO ?? "info@puritaninsurance.co.ke";
const SITE_NAME    = "Puritan Insurance Agency";
const SUPPORT_PHONE = "+254 700 000 000"; // TODO: replace with real number

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatKES(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(raw: string | null | undefined): string {
  if (!raw) return new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" });
  return new Date(raw).toLocaleString("en-KE", {
    timeZone:  "Africa/Nairobi",
    dateStyle: "long",
    timeStyle: "short",
  });
}

function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function channelLabel(channel: string | null | undefined): string {
  const map: Record<string, string> = {
    card:         "Card",
    mobile_money: "Mobile Money",
    bank:         "Bank Transfer",
    ussd:         "USSD",
    qr:           "QR Code",
    bank_transfer:"Bank Transfer",
  };
  return channel ? (map[channel] ?? capitalise(channel)) : "—";
}

// ─────────────────────────────────────────────────────────────────────────────
// Receipt email HTML
// ─────────────────────────────────────────────────────────────────────────────

function buildReceiptHtml(payment: PaymentRecord): string {
  const customerName = payment.full_name ?? "Valued Customer";
  const rows: [string, string][] = [
    ["Paystack Reference",  payment.reference],
    ["Amount Paid",         formatKES(Number(payment.amount))],
    ["Payment Method",      channelLabel(payment.channel)],
    ["Service",             payment.service_name],
    ["Plan",                payment.premium_option_name],
    ["Period",              capitalise(payment.period)],
    ["Date & Time",         formatDate(payment.paid_at)],
  ];
  if (payment.phone) rows.splice(2, 0, ["Phone", payment.phone]);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payment Receipt – ${SITE_NAME}</title>
</head>
<body style="margin:0;padding:0;background:#f5f6fa;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
    style="background:#f5f6fa;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
          style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;
                 overflow:hidden;box-shadow:0 4px 24px rgba(10,24,73,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:#0a1849;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">
                ${SITE_NAME}
              </p>
              <p style="margin:6px 0 0;font-size:12px;font-weight:600;
                        letter-spacing:2px;text-transform:uppercase;color:#e6c367;">
                Payment Receipt
              </p>
            </td>
          </tr>

          <!-- Success bar -->
          <tr>
            <td style="background:#16a34a;padding:14px 40px;text-align:center;">
              <p style="margin:0;font-size:13px;font-weight:600;color:#ffffff;">
                ✅ &nbsp;Payment Confirmed
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:36px 40px 0;">
              <p style="margin:0 0 16px;font-size:16px;color:#1a1a2e;">
                Dear <strong>${customerName}</strong>,
              </p>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#4b5563;">
                Thank you for your payment. We have received your premium and your
                coverage is active. Please keep this receipt for your records.
              </p>
            </td>
          </tr>

          <!-- Receipt table -->
          <tr>
            <td style="padding:0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#f0f4ff;border:1px solid #c7d2fe;border-radius:10px;overflow:hidden;">

                <tr>
                  <td colspan="2" style="background:#0a1849;padding:14px 20px;">
                    <p style="margin:0;font-size:12px;font-weight:700;
                              letter-spacing:1.5px;text-transform:uppercase;color:#e6c367;">
                      Transaction Details
                    </p>
                  </td>
                </tr>

                ${rows
                  .map(
                    ([label, value], i) => `
                <tr style="background:${i % 2 === 0 ? "#f8faff" : "#eef1ff"};">
                  <td style="padding:12px 20px;font-size:13px;font-weight:600;
                             color:#374151;width:45%;border-bottom:1px solid #dde2f0;">
                    ${label}
                  </td>
                  <td style="padding:12px 20px;font-size:13px;color:#0a1849;
                             font-weight:700;border-bottom:1px solid #dde2f0;">
                    ${value}
                  </td>
                </tr>`
                  )
                  .join("")}
              </table>
            </td>
          </tr>

          <!-- Next steps -->
          <tr>
            <td style="padding:28px 40px 0;">
              <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#0a1849;">
                What happens next?
              </p>
              <ul style="margin:0;padding:0 0 0 20px;font-size:14px;line-height:1.8;color:#4b5563;">
                <li>Your policy documents will be emailed to you within 24 hours.</li>
                <li>Your dedicated account manager will contact you to confirm coverage details.</li>
                <li>For any queries, call us on <strong>${SUPPORT_PHONE}</strong> or reply to this email.</li>
              </ul>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:36px 40px;border-top:1px solid #e5e7eb;margin-top:20px;">
              <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;text-align:center;">
                ${SITE_NAME} &nbsp;·&nbsp; IRA Licensed — Reg. No. IRA/LIC/2024/001
              </p>
              <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
                Apex Tower, 4th Floor, Westlands, Nairobi, Kenya
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Send a payment receipt email to the customer via Resend.
 * Called from both the webhook route and the verify route (as a fallback).
 * Errors are logged but never thrown — a failed email must not disrupt
 * the payment confirmation flow.
 */
export async function sendPaymentReceipt(payment: PaymentRecord): Promise<void> {
  const { error } = await resend.emails.send({
    from:    `${SITE_NAME} <${FROM_ADDRESS}>`,
    to:      payment.email,
    replyTo: REPLY_TO,
    subject: `Payment Receipt – ${formatKES(Number(payment.amount))} for ${payment.service_name}`,
    html:    buildReceiptHtml(payment),
  });

  if (error) {
    console.error("[sendPaymentReceipt] Resend error:", error);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Quote request notification — sent to the agency inbox
// ─────────────────────────────────────────────────────────────────────────────

export async function sendQuoteRequestNotification(data: {
  fullName: string;
  email: string;
  phone: string;
  insuranceType: string;
  message: string;
  referenceId: string;
}): Promise<void> {
  const { error } = await resend.emails.send({
    from: `${SITE_NAME} <${FROM_ADDRESS}>`,
    to: REPLY_TO,
    replyTo: data.email,
    subject: `[Quote Request] ${data.insuranceType} — ${data.referenceId}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
        <h2 style="color:#0a1849;margin-bottom:4px;">New Quote Request</h2>
        <p style="color:#6b7280;margin-top:0;">Reference: <strong>${data.referenceId}</strong></p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
        <table style="width:100%;border-collapse:collapse;">
          ${[
            ["Name", data.fullName],
            ["Email", data.email],
            ["Phone", data.phone],
            ["Insurance Type", data.insuranceType],
          ]
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:14px;width:160px;">${label}</td>
              <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">${value}</td>
            </tr>`
            )
            .join("")}
        </table>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
        <p style="color:#6b7280;font-size:13px;margin-bottom:6px;">Message</p>
        <p style="color:#111827;font-size:15px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
        <p style="color:#9ca3af;font-size:12px;">
          Submitted ${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}
        </p>
      </div>
    `,
  });

  if (error) console.error("[sendQuoteRequestNotification] Resend error:", error);
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact form notification — sent to the agency inbox
// ─────────────────────────────────────────────────────────────────────────────

export async function sendContactFormNotification(data: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<void> {
  const { error } = await resend.emails.send({
    from: `${SITE_NAME} <${FROM_ADDRESS}>`,
    to: REPLY_TO,
    replyTo: data.email,
    subject: `[Contact] ${data.subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
        <h2 style="color:#0a1849;margin-bottom:4px;">New Contact Form Message</h2>
        <p style="color:#6b7280;margin-top:0;">Via puritaninsurance.co.ke</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
        <table style="width:100%;border-collapse:collapse;">
          ${[
            ["Name", data.fullName],
            ["Email", data.email],
            ["Phone", data.phone || "Not provided"],
            ["Subject", data.subject],
          ]
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:14px;width:160px;">${label}</td>
              <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">${value}</td>
            </tr>`
            )
            .join("")}
        </table>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
        <p style="color:#6b7280;font-size:13px;margin-bottom:6px;">Message</p>
        <p style="color:#111827;font-size:15px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
        <p style="color:#9ca3af;font-size:12px;">
          Submitted ${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}
        </p>
      </div>
    `,
  });

  if (error) console.error("[sendContactFormNotification] Resend error:", error);
}
