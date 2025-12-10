-- Inventory Tracking Features for NS Marketplace

-- Add inventory fields to listings
ALTER TABLE listings
ADD COLUMN IF NOT EXISTS sku TEXT,
ADD COLUMN IF NOT EXISTS inventory_status TEXT DEFAULT 'active' CHECK (inventory_status IN ('active', 'sold', 'rented', 'maintenance', 'lost')),
ADD COLUMN IF NOT EXISTS inventory_notes TEXT,
ADD COLUMN IF NOT EXISTS cost_price NUMERIC(10, 2), -- Private cost for seller
ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS condition TEXT DEFAULT 'used' CHECK (condition IN ('new', 'used', 'refurbished', 'poor'));


-- Create index for faster inventory lookups
CREATE INDEX IF NOT EXISTS idx_listings_sku ON listings(sku);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(inventory_status);
