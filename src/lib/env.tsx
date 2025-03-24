export const env = {
  SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  STRIPE_BASIC_PRICE_ID: process.env.REACT_APP_STRIPE_BASIC_PRICE_ID,
  STRIPE_PRO_PRICE_ID: process.env.REACT_APP_STRIPE_PRO_PRICE_ID,
  STRIPE_ELITE_PRICE_ID: process.env.REACT_APP_STRIPE_ELITE_PRICE_ID,
  SITE_URL: process.env.REACT_APP_SITE_URL || 'http://localhost:3000',
};

// Validate required environment variables
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'STRIPE_PUBLISHABLE_KEY',
  'STRIPE_BASIC_PRICE_ID',
  'STRIPE_PRO_PRICE_ID',
  'STRIPE_ELITE_PRICE_ID',
];

const missingEnvVars = requiredEnvVars.filter((key) => !env[key]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`
  );
} 