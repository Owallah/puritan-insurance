/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent the site from being embedded in an iframe (clickjacking protection)
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Stop browsers from guessing the content type (MIME sniffing protection)
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Only send the origin (no full URL) as the referrer to external sites
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Restrict access to sensitive browser APIs
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self)",
  },
  // Force HTTPS for 1 year (only enable once you're confirmed on HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy — controls what resources the browser can load
  // 'unsafe-inline' is required for Tailwind CSS and Sanity Studio
  // js.paystack.co is required for the Paystack inline checkout popup
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com",
      "connect-src 'self' https://*.supabase.co https://api.paystack.co https://api.safaricom.co.ke https://sandbox.safaricom.co.ke https://api.sanity.io https://*.sanity.io wss://*.sanity.io",
      "frame-src 'self'",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;