interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  STRIPE_PUBLISHABLE_KEY: string;
  STRIPE_BASIC_PRICE_ID: string;
  STRIPE_PRO_PRICE_ID: string;
  STRIPE_ELITE_PRICE_ID: string;
  SITE_URL: string;
  AI_API_KEY: string;
}

const requiredEnvVars: (keyof Env)[] = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'STRIPE_PUBLISHABLE_KEY',
  'STRIPE_BASIC_PRICE_ID',
  'STRIPE_PRO_PRICE_ID',
  'STRIPE_ELITE_PRICE_ID',
  'SITE_URL',
  'AI_API_KEY',
];

const getEnvVar = (key: keyof Env): string => {
  const value = process.env[`REACT_APP_${key}`];
  if (!value) {
    throw new Error(`Missing required environment variable: REACT_APP_${key}`);
  }
  return value;
};

const env: Env = {
  SUPABASE_URL: getEnvVar('SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnvVar('SUPABASE_ANON_KEY'),
  STRIPE_PUBLISHABLE_KEY: getEnvVar('STRIPE_PUBLISHABLE_KEY'),
  STRIPE_BASIC_PRICE_ID: getEnvVar('STRIPE_BASIC_PRICE_ID'),
  STRIPE_PRO_PRICE_ID: getEnvVar('STRIPE_PRO_PRICE_ID'),
  STRIPE_ELITE_PRICE_ID: getEnvVar('STRIPE_ELITE_PRICE_ID'),
  SITE_URL: getEnvVar('SITE_URL'),
  AI_API_KEY: getEnvVar('AI_API_KEY'),
};

export default env; 