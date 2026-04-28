import { MetadataRoute } from "next";

// ─────────────────────────────────────────────────────────────────────────────
// robots.txt
//
// Next.js automatically serves this at /robots.txt
// Disallows the Sanity Studio from being indexed by search engines.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://www.puritaninsurance.co.ke";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio",
          "/studio/",
          "/api/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
