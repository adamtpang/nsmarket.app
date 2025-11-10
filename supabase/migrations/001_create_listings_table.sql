-- NS Marketplace Database Schema
-- Run this in your Supabase SQL Editor

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sale', 'rent')),
  rental_period TEXT CHECK (rental_period IN ('day', 'week', 'month')),
  images TEXT[] DEFAULT '{}',
  seller_id TEXT NOT NULL, -- Will become UUID reference when auth is added
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_listings_type ON listings(type);
CREATE INDEX IF NOT EXISTS idx_listings_seller_id ON listings(seller_id);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read listings (public marketplace)
CREATE POLICY "Anyone can view listings"
  ON listings
  FOR SELECT
  USING (true);

-- Create policy to allow anyone to create listings (for now - will restrict with auth later)
CREATE POLICY "Anyone can create listings"
  ON listings
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow sellers to update their own listings
CREATE POLICY "Sellers can update their own listings"
  ON listings
  FOR UPDATE
  USING (seller_id = current_setting('request.jwt.claims', true)::json->>'sub')
  WITH CHECK (seller_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Create policy to allow sellers to delete their own listings
CREATE POLICY "Sellers can delete their own listings"
  ON listings
  FOR DELETE
  USING (seller_id = current_setting('request.jwt.claims', true)::json->>'sub');
