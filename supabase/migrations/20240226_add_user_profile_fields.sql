-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS age integer,
ADD COLUMN IF NOT EXISTS country text;

-- Add validation for age
ALTER TABLE profiles
ADD CONSTRAINT age_check CHECK (age >= 13 AND age <= 120);

