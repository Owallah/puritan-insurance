// ─────────────────────────────────────────────
// Insurance Service Types
// ─────────────────────────────────────────────

export interface InsuranceService {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  category: ServiceCategory;
  targetAudience: string;
  popular?: boolean;
  premium?: PremiumOption[];
}

export type ServiceCategory = "liability" | "property" | "people" | "personal";

export type LiabilityProduct = 
  | 'contractors-all-risk'
  | 'cyber-liability'
  | 'commercial-crime'
  | 'directors-officers'
  | 'public-product-liability'
  | 'professional-indemnity'
  | 'fidelity-guarantee'
  | 'bankers-blanket-bond'
  | 'bonds-guarantees'

export type PropertyProduct =
  | 'fire-burglary'
  | 'business-interruption'
  | 'machine-breakdown'
  | 'electronic-equipment'
  | 'goods-in-transit'
  | 'political-violence'
  | 'marine'

export type PeopleProduct =
  | 'wiba'
  | 'medical'
  | 'group-life'
  | 'personal-accident'

export type PersonalProduct =
  | 'domestic-package'
  | 'motor-private'
  | 'motor-commercial'
  | 'motor-psv'
  | 'motor-cycle'
  | 'personal-accident-personal'
  | 'medical-personal'
  | 'travel'
  
  export interface ServiceCategoryInfo {
    id: ServiceCategory
    title: string
    description: string
    icon: string
    color: string
    bgColor: string
    borderColor: string
  }

// ─────────────────────────────────────────────
// Quote Form Types
// ─────────────────────────────────────────────

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  insuranceType: string;
  message: string;
}

export interface QuoteSubmissionResult {
  success: boolean;
  message: string;
  referenceId?: string;
}

// ─────────────────────────────────────────────
// Contact Form Types
// ─────────────────────────────────────────────

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}

// ─────────────────────────────────────────────
// Company / Content Types
// ─────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatarUrl?: string;
}

export interface TrustIndicator {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// ─────────────────────────────────────────────
// Payment Types (Paystack)
// ─────────────────────────────────────────────

export interface PaymentRequest {
  email: string;
  amount: number; // in KES (we convert to kobo/cents on the server)
  fullName: string;
  phone?: string;
  serviceType: string;
  premiumOptionName: string;
  period: string;
}

export interface PaymentInitResult {
  success: boolean;
  authorizationUrl?: string; // Paystack hosted checkout URL
  reference?: string; // Our unique transaction reference
  error?: string;
}

export interface PaymentVerifyResult {
  success: boolean;
  status: "pending" | "completed" | "failed";
  reference?: string;
  amount?: number;
  paidAt?: string;
  channel?: string; // "card" | "mobile_money" | "bank" etc.
  error?: string;
}

export interface PremiumOption {
  id: string;
  name: string;
  amount: number;
  period: "monthly" | "quarterly" | "semi-annually" | "annually" | "one-time";
  description?: string;
}

export type PaymentStatus = "idle" | "pending" | "success" | "error";
