-- Business Storefronts for NS Marketplace
-- Run this in your Supabase SQL Editor

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- URL-friendly name (e.g., "dawns-bike-shop")
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  owner_id TEXT NOT NULL, -- Will become UUID reference when auth is added
  website TEXT,
  location TEXT,
  category TEXT, -- e.g., "bikes", "scooters", "food", "services"
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add business_id to listings table
ALTER TABLE listings ADD COLUMN IF NOT EXISTS business_id UUID REFERENCES businesses(id) ON DELETE SET NULL;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON businesses(slug);
CREATE INDEX IF NOT EXISTS idx_businesses_owner_id ON businesses(owner_id);
CREATE INDEX IF NOT EXISTS idx_businesses_featured ON businesses(is_featured);
CREATE INDEX IF NOT EXISTS idx_listings_business_id ON listings(business_id);

-- Update trigger for businesses
CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for businesses
CREATE POLICY "Anyone can view businesses"
  ON businesses
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create businesses"
  ON businesses
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Owners can update their own businesses"
  ON businesses
  FOR UPDATE
  USING (owner_id = current_setting('request.jwt.claims', true)::json->>'sub')
  WITH CHECK (owner_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Owners can delete their own businesses"
  ON businesses
  FOR DELETE
  USING (owner_id = current_setting('request.jwt.claims', true)::json->>'sub');
