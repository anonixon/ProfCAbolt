-- First, get all existing users who don't have a subscription
WITH existing_users AS (
  SELECT id 
  FROM auth.users 
  WHERE id NOT IN (SELECT user_id FROM public.user_subscriptions)
)

-- Insert subscriptions for existing users with full access
INSERT INTO public.user_subscriptions (
  user_id,
  status,
  stripe_price_id,
  current_period_end
)
SELECT 
  id,
  'active',
  (SELECT COALESCE(current_setting('custom.stripe_elite_price_id', true), 
    '${process.env.NEXT_PUBLIC_STRIPE_ELITE_PRICE_ID}')), -- Use Business Elite plan ID
  TIMEZONE('utc', NOW() + INTERVAL '100 years') -- Set a far future expiration date
FROM existing_users
ON CONFLICT (user_id) DO UPDATE
SET 
  status = 'active',
  stripe_price_id = EXCLUDED.stripe_price_id,
  current_period_end = EXCLUDED.current_period_end;

