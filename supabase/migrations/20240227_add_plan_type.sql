-- Add plan_type to profiles table
ALTER TABLE profiles 
ADD COLUMN plan_type TEXT CHECK (plan_type IN ('business', 'career')) DEFAULT NULL;

-- Add index for faster queries
CREATE INDEX idx_profiles_plan_type ON profiles(plan_type);

