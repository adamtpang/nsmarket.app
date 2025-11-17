-- Add rental fields for items that can be rented
ALTER TABLE listings ADD COLUMN IF NOT EXISTS listing_type TEXT DEFAULT 'sale';
ALTER TABLE listings ADD COLUMN IF NOT EXISTS rental_period TEXT;

-- listing_type: 'sale' or 'rent'
-- rental_period: 'hour', 'day', 'week', 'month' (only applicable when listing_type = 'rent')
