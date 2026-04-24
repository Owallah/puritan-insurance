# 🛡️ Apex Insurance Group — Website

A production-ready insurance company website built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Pre-wired for **Supabase** (database) and **M-Pesa Daraja** (payments) integration.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17+ 
- npm 9+ or pnpm 8+

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (Navbar + Footer + WhatsApp)
│   ├── page.tsx                  # Home page
│   ├── about/page.tsx            # About page
│   ├── services/page.tsx         # Services page
│   ├── quote/page.tsx            # Quote request page
│   ├── contact/page.tsx          # Contact page
│   ├── not-found.tsx             # Custom 404 page
│   ├── error.tsx                 # Global error boundary
│   ├── loading.tsx               # Loading skeleton
│   ├── globals.css               # Global styles + Tailwind directives
│   └── api/
│       ├── quotes/route.ts       # Quote submission API (Supabase-ready)
│       ├── contact/route.ts      # Contact form API (Resend-ready)
│       └── payments/mpesa/
│           └── route.ts          # M-Pesa STK Push handler (Daraja-ready)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Responsive sticky navbar
│   │   └── Footer.tsx            # Footer with links + social
│   ├── sections/
│   │   ├── HeroSection.tsx       # Home page hero
│   │   └── CTASection.tsx        # Reusable CTA banner (3 variants)
│   └── ui/
│       ├── ServiceCard.tsx       # Insurance service card (3 variants)
│       ├── FormFields.tsx        # FormInput, FormSelect, FormTextarea
│       ├── QuoteForm.tsx         # Quote request form (react-hook-form + zod)
│       ├── ContactForm.tsx       # Contact form (react-hook-form + zod)
│       ├── WhatsAppButton.tsx    # Floating WhatsApp chat button
│       └── PaymentButton.tsx     # M-Pesa payment button (STK push)
│
├── lib/
│   ├── data.ts                   # All structured content data
│   ├── utils.ts                  # Helpers + form submission handlers
│   └── validations.ts            # Zod validation schemas
│
├── types/
│   └── index.ts                  # TypeScript interfaces and types
│
├── .env.example                  # Environment variables template
├── tailwind.config.ts            # Tailwind with custom design tokens
├── tsconfig.json
└── next.config.js
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `navy-900` | `#0a1849` | Primary — headers, navbar, footer, buttons |
| `gold-500` | `#e6c367` | Accent — highlights, CTAs, badge |
| Font: Display | Playfair Display | Headings, hero text |
| Font: Body | DM Sans | All body text, UI |

### Tailwind Utility Classes (custom)
- `.btn-primary` — Gold CTA button
- `.btn-secondary` — Navy outline button
- `.btn-outline-white` — White outline (for dark backgrounds)
- `.section-padding` — Consistent vertical spacing
- `.container-default` — Max-width container with horizontal padding
- `.card-base` — White rounded card with shadow
- `.card-hover` — Hover lift effect
- `.form-input` — Styled form input
- `.section-eyebrow` — Small uppercase label above headings
- `.section-title` — Main section heading
- `.gold-divider` — Gold decorative line

---

## 🔗 Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run this SQL in the Supabase SQL editor:

```sql
-- Quote requests table
CREATE TABLE quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  insurance_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  reference_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
```

3. Add Supabase credentials to `.env.local`
4. Install the SDK: `npm install @supabase/supabase-js`
5. Uncomment the Supabase code blocks in:
   - `app/api/quotes/route.ts`
   - `app/api/contact/route.ts`
   - `lib/utils.ts`

---

## 💳 Connecting M-Pesa (Daraja API)

1. Register at [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Create an app and get consumer key/secret
3. Add credentials to `.env.local`
4. Uncomment the Daraja API code in `app/api/payments/mpesa/route.ts`
5. Set up the callback URL endpoint at `/api/payments/mpesa/callback`

---

## 📧 Connecting Email (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Add your API key to `.env.local`
3. Install: `npm install resend`
4. Uncomment the Resend code block in `app/api/contact/route.ts`

---

## 🚢 Deployment (Vercel)

```bash
npm install -g vercel
vercel --prod
```

Set all `.env.example` variables in your Vercel project's Environment Variables settings.

---

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 📄 Pages Summary

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, services preview, stats, testimonials, CTA |
| `/about` | About | Company story, mission/vision, values, team |
| `/services` | Services | All 8 insurance products grouped by category |
| `/quote` | Get a Quote | Quote request form with validation |
| `/contact` | Contact | Contact form, click-to-call, WhatsApp, map |

---

## 🧩 Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` 14 | React framework (App Router) |
| `react-hook-form` | Form state management |
| `zod` | Schema validation |
| `@hookform/resolvers` | RHF + Zod integration |
| `lucide-react` | Icon library |
| `clsx` + `tailwind-merge` | Conditional className utility |

---

## ✅ Future Integrations (Pre-wired)

- [ ] **Supabase** — Database for quotes + contacts
- [ ] **M-Pesa Daraja** — Premium payment via STK push
- [ ] **Resend** — Transactional email
- [ ] **Sentry** — Error monitoring (see `app/error.tsx`)
- [ ] **Google Analytics** — Conversion tracking (env var ready)
- [ ] **Sanity CMS** — Content management for services/blog

---

Built with ❤️ for Kenyan insurance clients.
