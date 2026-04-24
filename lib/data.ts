import type {
  InsuranceService,
  TeamMember,
  CompanyValue,
  Testimonial,
  TrustIndicator,
  NavLink,
} from "@/types";

// ─────────────────────────────────────────────
// Site Configuration
// ─────────────────────────────────────────────

export const SITE_CONFIG = {
  name: "Puritan Insurance Agency Ltd",
  tagline: "Protecting What Matters Most",
  description:
    "Kenya's most trusted insurance provider. Motor, health, life, marine, and commercial coverage — built around you.",
  phone: "+254 700 000 000",
  phoneTel: "+254700000000",
  email: "info@apexinsurance.co.ke",
  address: "Apex Tower, 4th Floor, Westlands, Nairobi, Kenya",
  whatsapp: "2547XXXXXXXX",
  whatsappMessage: "Hello%20I%20need%20an%20insurance%20quote",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818744583629!2d36.8063!3d-1.2700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnMTIuMCJTIDM2wrA0OCcyMi43IkU!5e0!3m2!1sen!2ske!4v1234567890",
  socialLinks: {
    facebook: "https://facebook.com/puritaninsurance",
    twitter: "https://twitter.com/puritaninsurance",
    linkedin: "https://linkedin.com/company/puritaninsurance",
    instagram: "https://instagram.com/puritaninsurance",
  },
  registrationNo: "[IRA/05/16046/2026]",
  yearFounded: 2026,
} as const;

// ─────────────────────────────────────────────
// Navigation Links
// ─────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Contact", href: "/contact" },
];

// ─────────────────────────────────────────────
// Insurance Services Data
// ─────────────────────────────────────────────

export const SERVICES: InsuranceService[] = [
  {
    id: "motor",
    title: "Motor Insurance",
    slug: "motor",
    shortDescription:
      "Comprehensive coverage for your vehicle — accidents, theft, fire, and third-party liability.",
    description:
      "Our motor insurance provides comprehensive protection for your personal and commercial vehicles. Whether it's a minor fender-bender or a major collision, we ensure you're covered for repairs, medical costs, and third-party claims. Our fast-track claims process means you're back on the road sooner.",
    icon: "Car",
    category: "personal",
    popular: true,
    features: [
      "Comprehensive & Third-Party options",
      "24/7 roadside assistance",
      "Fast-track claims processing",
      "Windscreen & accessories cover",
      "Courtesy car provision",
      "No-claims bonus discount",
    ],
    premium: [
      {
        id: "motor-1",
        name: "Comprehensive Private Car",
        amount: 25000,
        period: "annually",
        description: "For private vehicles up to 2000cc",
      },
      {
        id: "motor-2",
        name: "Comprehensive Private Car",
        amount: 2300,
        period: "monthly",
        description: "Monthly payment option",
      },
      {
        id: "motor-3",
        name: "Third Party Only",
        amount: 5500,
        period: "annually",
        description: "Basic third party coverage",
      },
      {
        id: "motor-4",
        name: "Third Party + Fire & Theft",
        amount: 12000,
        period: "annually",
        description: "Extended third party coverage",
      },
    ],
  },
  {
    id: "health",
    title: "Health Insurance",
    slug: "health",
    shortDescription:
      "Individual and family health plans with access to Kenya's top hospitals and clinics.",
    description:
      "Protect yourself and your family with our comprehensive health insurance packages. From outpatient and inpatient cover to maternity and dental benefits, we partner with over 500 hospitals across Kenya to give you the best care when you need it most.",
    icon: "HeartPulse",
    category: "personal",
    popular: true,
    features: [
      "Inpatient & outpatient cover",
      "Maternity benefits",
      "Dental & optical add-ons",
      "500+ hospital network",
      "Pre-existing condition cover",
      "Emergency evacuation",
    ],
    premium: [
      {
        id: "health-1",
        name: "Individual Plan - Standard",
        amount: 15000,
        period: "annually",
        description: "Individual coverage for 1 adult",
      },
      {
        id: "health-2",
        name: "Individual Plan",
        amount: 1250,
        period: "monthly",
        description: "Monthly payment option",
      },
      {
        id: "health-3",
        name: "Family Plan - 2 Adults + 2 Children",
        amount: 45000,
        period: "annually",
        description: "Comprehensive family coverage",
      },
      {
        id: "health-4",
        name: "Senior Citizen Plan",
        amount: 35000,
        period: "annually",
        description: "For adults aged 60+",
      },
    ],
  },
  {
    id: "life",
    title: "Life Insurance",
    slug: "life",
    shortDescription:
      "Secure your family's future with term life, whole life, and investment-linked policies.",
    description:
      "Life insurance from Apex ensures your loved ones are financially protected in the event of your death or critical illness. Our flexible plans combine life cover with savings and investment components, helping you build wealth while protecting what matters most.",
    icon: "ShieldCheck",
    category: "life",
    popular: false,
    features: [
      "Term & whole life options",
      "Critical illness cover",
      "Investment-linked plans",
      "Flexible premium payments",
      "Last expense benefit",
      "Education fund rider",
    ],
    premium: [
      {
        id: "life-1",
        name: "Term Life - 5M Cover",
        amount: 8500,
        period: "annually",
        description: "5 Million KES coverage for 20 years",
      },
      {
        id: "life-2",
        name: "Term Life - 5M Cover",
        amount: 750,
        period: "monthly",
        description: "Monthly payment option",
      },
      {
        id: "life-3",
        name: "Whole Life - 2M Cover",
        amount: 25000,
        period: "annually",
        description: "Lifetime coverage with cash value",
      },
      {
        id: "life-4",
        name: "Education Plan",
        amount: 15000,
        period: "annually",
        description: "For your child's university education",
      },
    ],
  },
  {
    id: "marine",
    title: "Marine Insurance",
    slug: "marine",
    shortDescription:
      "Complete cargo and hull coverage for importers, exporters, and shipping companies.",
    description:
      "Our marine insurance protects your cargo and vessels throughout their journey — from port of origin to final destination. We cover all major modes of transportation, including sea, air, and road, ensuring your goods arrive safely no matter what.",
    icon: "Ship",
    category: "commercial",
    popular: false,
    features: [
      "Cargo & hull coverage",
      "Import & export cover",
      "All-risk marine policy",
      "Open cover policies",
      "Sea, air & road transit",
      "Claims at destination port",
    ],
    premium: [
      {
        id: "marine-1",
        name: "Cargo Cover - Basic",
        amount: 0.5,
        period: "annually",
        description: "0.5% of cargo value - minimum KES 5,000",
      },
      {
        id: "marine-2",
        name: "All Risk Cover",
        amount: 1.0,
        period: "annually",
        description: "1% of cargo value - minimum KES 10,000",
      },
    ],
  },
  {
    id: "fire-property",
    title: "Fire & Property",
    slug: "fire-property",
    shortDescription:
      "Protect your home and commercial property from fire, flood, theft, and natural disasters.",
    description:
      "Whether you own a family home or a commercial building, our fire and property insurance provides robust protection against fire, lightning, explosion, flooding, and burglary. We also offer domestic package policies that bundle multiple covers for homeowners.",
    icon: "Flame",
    category: "personal",
    popular: false,
    features: [
      "Fire, lightning & explosion",
      "Flood & storm damage",
      "Burglary & theft",
      "Domestic package policy",
      "Commercial property",
      "Rent loss cover",
    ],
    premium: [
      {
        id: "fire-1",
        name: "Home Content Cover - 1M",
        amount: 8500,
        period: "annually",
        description: "For contents up to 1 Million KES",
      },
      {
        id: "fire-2",
        name: "Home Building - 5M",
        amount: 15000,
        period: "annually",
        description: "Building structure coverage",
      },
      {
        id: "fire-3",
        name: "Commercial Property - 10M",
        amount: 45000,
        period: "annually",
        description: "For business properties",
      },
    ],
  },
  {
    id: "business",
    title: "Business Insurance",
    slug: "business",
    shortDescription:
      "Tailored commercial solutions — public liability, workmen's compensation, and more.",
    description:
      "Safeguard your business operations with our comprehensive commercial insurance suite. From public liability and employer's liability to business interruption and professional indemnity — we help Kenyan businesses operate with confidence.",
    icon: "Briefcase",
    category: "commercial",
    popular: true,
    features: [
      "Public liability insurance",
      "Workmen's compensation",
      "Business interruption",
      "Professional indemnity",
      "Goods in transit",
      "Directors & officers cover",
    ],
    premium: [
      {
        id: "business-1",
        name: "Public Liability - 2M",
        amount: 18000,
        period: "annually",
        description: "Liability cover up to 2M KES",
      },
      {
        id: "business-2",
        name: "Workmen's Comp - Basic",
        amount: 12000,
        period: "annually",
        description: "For up to 5 employees",
      },
      {
        id: "business-3",
        name: "Combined Commercial Package",
        amount: 75000,
        period: "annually",
        description: "Comprehensive business coverage",
      },
    ],
  },
  {
    id: "travel",
    title: "Travel Insurance",
    slug: "travel",
    shortDescription:
      "Comprehensive travel protection for domestic and international trips.",
    description:
      "Don't let unexpected events ruin your travels. Our travel insurance covers medical emergencies abroad, trip cancellations, lost luggage, flight delays, and personal liability — whether you're traveling for business or leisure.",
    icon: "Plane",
    category: "specialty",
    popular: false,
    features: [
      "Medical emergency abroad",
      "Trip cancellation cover",
      "Lost baggage & documents",
      "Flight delay compensation",
      "Personal liability",
      "Adventure sports add-on",
    ],
    premium: [
      {
        id: "travel-1",
        name: "Single Trip - Regional",
        amount: 3500,
        period: "annually",
        description: "For East Africa travel, up to 14 days",
      },
      {
        id: "travel-2",
        name: "Single Trip - International",
        amount: 7500,
        period: "annually",
        description: "Worldwide coverage, up to 30 days",
      },
      {
        id: "travel-3",
        name: "Annual Multi-Trip",
        amount: 25000,
        period: "annually",
        description: "Unlimited trips per year",
      },
    ],
  },
  {
    id: "agriculture",
    title: "Agriculture Insurance",
    slug: "agriculture",
    shortDescription:
      "Protecting Kenya's farmers from crop failure, livestock loss, and climate risks.",
    description:
      "Supporting Kenya's agricultural sector with customized insurance products for smallholder farmers and large agribusinesses alike. Our agricultural insurance covers crop failure due to drought, pest invasion, disease, and other perils, helping farmers recover and rebuild.",
    icon: "Wheat",
    category: "specialty",
    popular: false,
    features: [
      "Crop failure & drought cover",
      "Livestock insurance",
      "Greenhouse & irrigation",
      "Multi-peril crop insurance",
      "Climate index-linked policies",
      "Agri-business liability",
    ],
    premium: [
      {
        id: "agri-1",
        name: "Crop Cover - 1 Acre",
        amount: 3500,
        period: "annually",
        description: "For maize/beans per growing season",
      },
      {
        id: "agri-2",
        name: "Crop Cover - 5+ Acres",
        amount: 3000,
        period: "annually",
        description: "Per acre, volume discount",
      },
      {
        id: "agri-3",
        name: "Livestock - Per Animal",
        amount: 2500,
        period: "annually",
        description: "Per cow/goat/sheep",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// Trust Indicators
// ─────────────────────────────────────────────

export const TRUST_INDICATORS: TrustIndicator[] = [
  { id: "1", label: "Clients Served", value: "50,000+", icon: "👥" },
  { id: "2", label: "Claims Paid Out", value: "KES 2.8B+", icon: "💰" },
  { id: "3", label: "Years in Business", value: "16+", icon: "📅" },
  { id: "4", label: "Claims Satisfaction", value: "98.4%", icon: "⭐" },
];

// export const values = [
//   { title: "Integrity", description: "We do what we say — every policy, every claim." },
//   { title: "Empathy", description: "We listen first and design cover around real lives." },
//   { title: "Excellence", description: "Standards that exceed regulation and expectation." },
//   { title: "Innovation", description: "Modern tools that make insurance feel effortless." },
// ];

// ─────────────────────────────────────────────
// Company Values
// ─────────────────────────────────────────────

export const values: CompanyValue[] = [
  {
    id: "integrity",
    title: "Integrity",
    description:
      "We uphold the highest ethical standards, ensuring transparency, honesty, and accountability in every client engagement.",
    icon: "🤝",
  },
  {
    id: "confidentiality",
    title: "Confidentiality & Discretion",
    description:
      "We handle all client information with the utmost confidentiality, respecting the sensitivity of high-value corporate engagements.",
    icon: "💛",
  },
  {
    id: "expertise",
    title: "Expertise & Profssional Mastery",
    description:
      "We bring deep industry knowledge, technical skill, and continuous learning to provide sound, strategic insurance advice.",
    icon: "💡",
  },
  {
    id: "innovation",
    title: "Innovation & Forward Thinking",
    description:
      "We embrace data, technology, and evolving market insights to design modern, relevant risk solutions.",
    icon: "🌍",
  },
  {
    id: "reliability",
    title: "Reliability & Responsiveness",
    description:
      "We are dependable partners—acting promptly, decisively, and consistently when our clients need us most.",
    icon: "🛡️",
  },
];

// ─────────────────────────────────────────────
// Team Members
// ─────────────────────────────────────────────

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "James Mwangi",
    role: "Chief Executive Officer",
    bio: "James brings 20+ years of insurance industry experience, having led major initiatives at AIG and Jubilee Insurance before co-founding Apex.",
  },
  {
    id: "2",
    name: "Amina Osei",
    role: "Chief Operations Officer",
    bio: "Amina oversees day-to-day operations and claims processing, ensuring every client receives fast, fair, and transparent service.",
  },
  {
    id: "3",
    name: "David Kamau",
    role: "Head of Underwriting",
    bio: "With a background in actuarial science and 15 years in risk assessment, David ensures our products are priced fairly and competitively.",
  },
  {
    id: "4",
    name: "Grace Wanjiru",
    role: "Head of Client Relations",
    bio: "Grace leads a team of dedicated account managers, ensuring every Apex client feels valued, heard, and properly covered.",
  },
];

// ─────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Michael Otieno",
    role: "Business Owner",
    company: "Otieno Logistics Ltd",
    content:
      "After my truck was involved in an accident on the Nairobi-Mombasa highway, Apex had my claim processed and vehicle repaired within 5 days. Absolutely outstanding service.",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah Njeri",
    role: "Homeowner",
    company: undefined,
    content:
      "The fire and property cover saved my family when our kitchen caught fire. Apex's team was empathetic, professional, and incredibly fast. I recommend them to everyone.",
    rating: 5,
  },
  {
    id: "3",
    name: "Peter Ng'ang'a",
    role: "HR Manager",
    company: "Tech Kenya Ltd",
    content:
      "We've insured our entire staff of 200 employees with Apex's health plan. The hospital network is excellent and claims are processed without bureaucracy. Great value.",
    rating: 5,
  },
];

// ─────────────────────────────────────────────
// Insurance Types for Quote Form
// ─────────────────────────────────────────────

export const INSURANCE_TYPES = [
  { value: "motor", label: "Motor Insurance" },
  { value: "health", label: "Health Insurance" },
  { value: "life", label: "Life Insurance" },
  { value: "marine", label: "Marine Insurance" },
  { value: "fire-property", label: "Fire & Property" },
  { value: "business", label: "Business Insurance" },
  { value: "travel", label: "Travel Insurance" },
  { value: "agriculture", label: "Agriculture Insurance" },
  { value: "other", label: "Other / Not Sure" },
] as const;
