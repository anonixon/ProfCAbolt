export const SITE_NAME = "ProfCA";
export const SITE_DESCRIPTION = "Your AI-powered career and business advisor";

export const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!;
export const STRIPE_BASIC_PRICE_ID = process.env.REACT_APP_STRIPE_BASIC_PRICE_ID!;
export const STRIPE_PRO_PRICE_ID = process.env.REACT_APP_STRIPE_PRO_PRICE_ID!;
export const STRIPE_ELITE_PRICE_ID = process.env.REACT_APP_STRIPE_ELITE_PRICE_ID!;

export const XP_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000]

export const IDEA_CATEGORIES = [
  { value: "business", label: "Business" },
  { value: "career", label: "Career" },
  { value: "technology", label: "Technology" },
  { value: "social", label: "Social Impact" },
  { value: "other", label: "Other" },
]

