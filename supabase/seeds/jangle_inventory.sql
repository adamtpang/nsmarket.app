-- Seed Data for Jangle's Store
-- Replace OWNER_ID with the actual UUID of "Jangle" user if known, else we use a placeholder that user will claim

DO $$
DECLARE
    jangle_id uuid;
    jangle_owner_text text := 'jangle-temp-owner-id'; -- Will need to update this to real user ID later
BEGIN
    -- 1. Create Business
    INSERT INTO businesses (name, slug, description, location, category, owner_id)
    VALUES (
        'Jangle''s Hardware',
        'jangle',
        'Quality monitors, power cables, and assorted tech gear. Available for rent or purchase.',
        'Coworking / Cafe',
        'Electronics',
        jangle_owner_text
    )
    ON CONFLICT (slug) DO UPDATE SET description = EXCLUDED.description -- Update if exists just to get ID
    RETURNING id INTO jangle_id;

    -- 2. Insert Inventory Items (Listings)

    -- C01: Inventory (Cafe by scooters)
    INSERT INTO listings (business_id, title, description, price, type, condition, sku, inventory_status, cost_price, seller_id)
    VALUES (jangle_id, 'Monitor 27in (C01)', '27-inch Monitor. Located at Cafe by scooters.', 300, 'sale', 'used', 'C01', 'active', 270, jangle_owner_text);

    -- C02: Jangle (Coworking)
    INSERT INTO listings (business_id, title, description, price, type, condition, sku, inventory_status, cost_price, seller_id)
    VALUES (jangle_id, 'Monitor 27in (C02)', '27-inch Monitor. Located at Coworking.', 300, 'sale', 'used', 'C02', 'active', 270, jangle_owner_text);

    -- C03: Adam/doug (Coworking) - Note: Payment needed
    INSERT INTO listings (business_id, title, description, price, type, condition, sku, inventory_status, inventory_notes, cost_price, seller_id)
    VALUES (jangle_id, 'Monitor 27in (C03)', '27-inch Monitor. Located at Coworking.', 300, 'sale', 'used', 'C03', 'rented', 'With Adam/Doug. They need to pay or return.', 270, jangle_owner_text);

    -- C04: Jake (Coworking)
    INSERT INTO listings (business_id, title, description, price, type, condition, sku, inventory_status, cost_price, seller_id)
    VALUES (jangle_id, 'Monitor 27in (C04)', '27-inch Monitor. Located at Coworking.', 300, 'sale', 'used', 'C04', 'rented', 270, jangle_owner_text);

    -- PW01: Jangle (Cafe)
    INSERT INTO listings (business_id, title, description, price, type, condition, sku, inventory_status, cost_price, seller_id)
    VALUES (jangle_id, 'Power Strip / Cable (PW01)', 'Power strip. Located at Cafe.', 125, 'sale', 'used', 'PW01', 'active', 100, jangle_owner_text);

    -- PW02: Jangle (Apartment)
    INSERT INTO listings (business_id, title, description, price, type, condition, sku, inventory_status, cost_price, seller_id)
    VALUES (jangle_id, 'Power Strip / Cable (PW02)', 'Power strip. Located at Apartment.', 125, 'sale', 'used', 'PW02', 'active', 100, jangle_owner_text);

    -- PW03: Nick (Hotel Room)
    INSERT INTO listings (business_id, title, description, price, type, condition, sku, inventory_status, cost_price, seller_id)
    VALUES (jangle_id, 'Power Strip / Cable (PW03)', 'Power strip. Located at Hotel Room.', 125, 'sale', 'used', 'PW03', 'rented', 100, jangle_owner_text);

    -- PW07: Jangle (F) - Broken
    INSERT INTO listings (business_id, title, description, price, type, condition, sku, inventory_status, cost_price, seller_id)
    VALUES (jangle_id, 'Power Strip (PW07)', 'Broken unit.', 125, 'sale', 'poor', 'PW07', 'maintenance', 100, jangle_owner_text);

END $$;
