-- Add Discord contact field (NS.com native)
ALTER TABLE listings ADD COLUMN IF NOT EXISTS discord TEXT;

-- Remove WhatsApp/Telegram (not used at NS)
ALTER TABLE listings DROP COLUMN IF EXISTS whatsapp;
ALTER TABLE listings DROP COLUMN IF EXISTS telegram;
