-- Sponsor slots for NSMarket (like trustmrr.com but with quadratic pricing)
-- The more pixel space you buy, the exponentially more expensive it gets

CREATE TABLE IF NOT EXISTS sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  logo_url TEXT NOT NULL, -- S3/Vercel Blob URL
  website_url TEXT NOT NULL,
  contact_email TEXT NOT NULL,

  -- Slot configuration
  slot_size TEXT NOT NULL CHECK (slot_size IN ('small', 'medium', 'large', 'xlarge')),
  -- small = 120x60px ($100/mo), medium = 180x90px ($225/mo),
  -- large = 240x120px ($400/mo), xlarge = 300x150px ($625/mo)

  pixels_width INTEGER NOT NULL,
  pixels_height INTEGER NOT NULL,
  total_pixels INTEGER GENERATED ALWAYS AS (pixels_width * pixels_height) STORED,

  -- Payment tracking
  amount_paid_cents INTEGER NOT NULL, -- Store in cents to avoid floating point issues
  stripe_payment_intent_id TEXT,
  stripe_customer_id TEXT,

  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired', 'cancelled')),
  is_active BOOLEAN GENERATED ALWAYS AS (status = 'active') STORED,

  -- Subscription period
  starts_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,

  -- Metrics
  impressions INTEGER DEFAULT 0, -- Track how many times displayed
  clicks INTEGER DEFAULT 0, -- Track clicks

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sponsors_status ON sponsors(status);
CREATE INDEX IF NOT EXISTS idx_sponsors_active ON sponsors(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_sponsors_expires_at ON sponsors(expires_at);

-- Function to auto-expire sponsors
CREATE OR REPLACE FUNCTION auto_expire_sponsors()
RETURNS void AS $$
BEGIN
  UPDATE sponsors
  SET status = 'expired'
  WHERE status = 'active'
  AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at
CREATE TRIGGER update_sponsors_updated_at
  BEFORE UPDATE ON sponsors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to track sponsor click
CREATE OR REPLACE FUNCTION increment_sponsor_clicks(sponsor_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE sponsors
  SET clicks = COALESCE(clicks, 0) + 1
  WHERE id = sponsor_id;
END;
$$ LANGUAGE plpgsql;

-- Function to track sponsor impression
CREATE OR REPLACE FUNCTION increment_sponsor_impressions(sponsor_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE sponsors
  SET impressions = COALESCE(impressions, 0) + 1
  WHERE id = sponsor_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

-- Public can view active sponsors
CREATE POLICY "Anyone can view active sponsors"
  ON sponsors
  FOR SELECT
  USING (is_active = true);

-- Only authenticated service role can insert/update (via API routes)
CREATE POLICY "Service role can manage sponsors"
  ON sponsors
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Pricing reference (quadratic growth)
-- Small:   120x60  = 7,200 pixels  = $100/month  ($0.0139 per pixel)
-- Medium:  180x90  = 16,200 pixels = $225/month  ($0.0139 per pixel)
-- Large:   240x120 = 28,800 pixels = $400/month  ($0.0139 per pixel)
-- XLarge:  300x150 = 45,000 pixels = $625/month  ($0.0139 per pixel)

-- Simplified: $0.01389 per pixel per month
-- Formula: price_cents = ROUND(total_pixels * 1.389)
