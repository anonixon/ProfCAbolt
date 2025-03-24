const requiredEnvVars = [
  "REACT_APP_SUPABASE_URL",
  "REACT_APP_SUPABASE_ANON_KEY",
  "REACT_APP_STRIPE_PUBLISHABLE_KEY",
  "REACT_APP_STRIPE_BASIC_PRICE_ID",
  "REACT_APP_STRIPE_PRO_PRICE_ID",
  "REACT_APP_STRIPE_ELITE_PRICE_ID",
  "REACT_APP_SITE_URL",
] as const;

type RequiredEnvVar = typeof requiredEnvVars[number];

function validateEnvVars() {
  const missingVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
}

validateEnvVars();

export const env = {
  REACT_APP_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL!,
  REACT_APP_SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY!,
  REACT_APP_STRIPE_PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!,
  REACT_APP_STRIPE_BASIC_PRICE_ID: process.env.REACT_APP_STRIPE_BASIC_PRICE_ID!,
  REACT_APP_STRIPE_PRO_PRICE_ID: process.env.REACT_APP_STRIPE_PRO_PRICE_ID!,
  REACT_APP_STRIPE_ELITE_PRICE_ID: process.env.REACT_APP_STRIPE_ELITE_PRICE_ID!,
  REACT_APP_SITE_URL: process.env.REACT_APP_SITE_URL!,
} as const;

