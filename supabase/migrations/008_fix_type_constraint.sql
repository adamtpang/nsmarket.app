-- Fix the type constraint to match the category system
-- The app uses categories like 'for-sale', 'jobs', 'gigs', etc.
-- But the old constraint only allowed 'sale' or 'rent'

-- Drop the old constraint
ALTER TABLE listings DROP CONSTRAINT IF EXISTS listings_type_check;

-- Add new constraint that matches the category values
ALTER TABLE listings ADD CONSTRAINT listings_type_check
  CHECK (type IN ('for-sale', 'jobs', 'gigs', 'housing', 'services', 'community', 'sale', 'rent'));

-- Note: We keep 'sale' and 'rent' for backwards compatibility with any existing data
