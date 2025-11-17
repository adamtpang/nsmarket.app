# Claude Code Context - NS Marketplace Project

**Last Updated:** 2025-11-15
**Project:** nsmarketplace.vercel.app → Simple Craigslist-style marketplace for Network State community

---

## Project Overview

A Next.js marketplace application that evolved from a complex business-oriented platform into a simple, Craigslist-style community marketplace for the Network State (NS) community in Kuala Lumpur.

**Key Philosophy:** Simple, fast, zero friction - get it working first, add complexity later.

---

## Current State

### Tech Stack
- **Framework:** Next.js 15.2.4 with App Router
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage (for images)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Package Manager:** npm (pnpm not available)
- **TypeScript:** Full type safety

### Live Status
- **Dev Server:** Running on http://localhost:3000
- **Status:** Ready for first listings (pending SQL migrations)

---

## Core Features Implemented

### 1. Categories (Craigslist-style)
- 💰 **For Sale** - Electronics, furniture, sports, clothing, other
- 💼 **Jobs** - Full-time, part-time, contract, internship
- ⚡ **Gigs** - Tech, design, writing, marketing, operations, other
- 🏠 **Housing** - Rent, sublet, roommate
- 🔧 **Services** - Personal, professional, health, creative
- 💬 **Community** - Events, looking-for, offering

### 2. Rental System
- **Sale vs Rent toggle** (for "For Sale" category)
- **Rental periods:** Hour, Day, Week, Month
- **Dynamic pricing:** Shows "$50/day" format on listings
- **Price calculation:** Automatically adjusts based on rental period

### 3. Image Upload
- **Required:** At least 1 image mandatory (like Facebook Marketplace)
- **Storage:** Supabase Storage (bucket: `listings-images`)
- **Limit:** Up to 5 images, 10MB each
- **Upload endpoint:** `/app/api/upload/route.ts`

### 4. Contact System
- **Discord-native:** Uses Discord usernames for contact
- **No authentication required:** Simple contact flow
- **Fields:** Seller name + Discord username

### 5. Homepage
- **List view:** Simple rows (not card grid)
- **Category sections:** Separate sections for each category
- **Search bar:** Real-time filtering
- **Post button:** Prominent "Post Listing" CTA

---

## Database Schema

### Listings Table Fields
```sql
- id (uuid, primary key)
- title (text, required)
- description (text, required)
- price (numeric, nullable for free items)
- category (text) - 'for-sale' | 'jobs' | 'gigs' | 'housing' | 'services' | 'community'
- subcategory (text, optional)
- listing_type (text) - 'sale' | 'rent'
- rental_period (text) - 'hour' | 'day' | 'week' | 'month'
- images (text[], array of image URLs)
- seller_id (text, temp placeholder)
- seller_name (text, required)
- discord (text, optional)
- available (boolean, default true)
- views (integer, default 0)
- created_at (timestamp)
- updated_at (timestamp)
- type (text, backwards compatibility)
- business_id (text, nullable, will be removed later)
```

### Storage Bucket
- **Name:** `listings-images`
- **Public:** Yes
- **Policies:** Allow public upload, read, update, delete

---

## Pending Migrations (MUST RUN)

**Location:** https://supabase.com/dashboard/project/egooebfycikplnqyohgm/sql/new

### Migration 004 - Discord Contact
```sql
ALTER TABLE listings ADD COLUMN IF NOT EXISTS discord TEXT;
ALTER TABLE listings DROP COLUMN IF EXISTS whatsapp;
ALTER TABLE listings DROP COLUMN IF EXISTS telegram;
```

### Migration 005 - Rental Fields
```sql
ALTER TABLE listings ADD COLUMN IF NOT EXISTS listing_type TEXT DEFAULT 'sale';
ALTER TABLE listings ADD COLUMN IF NOT EXISTS rental_period TEXT;
```

### Migration 006 - Storage Bucket
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('listings-images', 'listings-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload listing images"
ON storage.objects FOR INSERT TO public
WITH CHECK (bucket_id = 'listings-images');

CREATE POLICY "Anyone can read listing images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'listings-images');

CREATE POLICY "Anyone can update their listing images"
ON storage.objects FOR UPDATE TO public
USING (bucket_id = 'listings-images');

CREATE POLICY "Anyone can delete listing images"
ON storage.objects FOR DELETE TO public
USING (bucket_id = 'listings-images');
```

---

## Key Files & Structure

### Core Application
- `/app/page.tsx` - Homepage with category sections
- `/app/seller/new/page.tsx` - Post listing form
- `/app/listing/[id]/page.tsx` - Individual listing detail page
- `/app/api/upload/route.ts` - Image upload to Supabase Storage

### Components
- `/components/site-header-simple.tsx` - Header with branding "nsmarket.app"
- `/components/listing-page-simple.tsx` - Simple listing detail view
- `/components/image-upload.tsx` - Image upload component

### Configuration
- `/lib/supabase.ts` - Supabase client + TypeScript types
- `.env.local` - Environment variables (Supabase credentials)

### Documentation
- `/NS_BUSINESS_ONBOARDING.md` - Business onboarding plan
- `/DISCORD_SCRAPING_RESEARCH.md` - Discord job board scraping research
- `/supabase/migrations/` - SQL migration files

---

## Environment Variables

Required in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://egooebfycikplnqyohgm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[optional, for admin operations]
```

**Note:** BLOB_READ_WRITE_TOKEN is no longer needed (switched to Supabase Storage)

---

## Recent Major Changes

### Session 1: Craigslist Transformation
- Removed payment/checkout features (Stripe)
- Removed business storefronts
- Simplified to list-based UI
- Added category-based browsing

### Session 2: Job Board Extension
- Added Jobs & Gigs categories
- Created business onboarding documentation
- Researched Discord scraping approach
- Decided to postpone Discord bot (overkill for MVP)

### Session 3: Rental System
- Added sale/rent toggle for "For Sale" items
- Implemented rental period selection
- Updated price display to show "/day", "/hour", etc.
- Made images mandatory (like Facebook Marketplace)
- Switched from Vercel Blob to Supabase Storage

---

## Git Status (Last Known)

```
Main branch: main

Modified:
- app/api/upload/route.ts (switched to Supabase Storage)
- app/listing/[id]/page.tsx (simple view)
- app/page.tsx (Craigslist-style list view)
- app/seller/new/page.tsx (added rental options)
- components/site-header-simple.tsx (simplified header)
- lib/supabase.ts (updated types)

Deleted:
- app/api/checkout/ (removed payment features)
- app/business/ (removed business pages)
- app/cart/ (removed cart)
- app/checkout/ (removed checkout pages)
- components/listing-page-client.tsx (replaced with simple version)

New Files:
- components/listing-page-simple.tsx
- supabase/migrations/004_add_discord_contact.sql
- supabase/migrations/005_add_rental_fields.sql
- supabase/migrations/006_create_storage_bucket.sql
- NS_BUSINESS_ONBOARDING.md
- DISCORD_SCRAPING_RESEARCH.md
```

---

## Next Steps / TODO

### Immediate (Blocking)
1. ✅ Switch to Supabase Storage for images
2. ⏳ Run 3 SQL migrations in Supabase
3. ⏳ Test image upload functionality
4. ⏳ Post first listings (bike + monitors for rent)

### Short-term Features
- Add location field (currently hardcoded to "KL")
- Add view counter functionality
- Improve listing detail page layout
- Add "Mark as sold/unavailable" feature

### Business Development
- Onboard NS businesses (use NS_BUSINESS_ONBOARDING.md)
- Manually post Discord hiring threads as job listings
- Get first transaction completed

### Future (Postponed)
- Discord bot for auto-importing job posts
- User authentication system
- Payment integration (if needed)
- Analytics dashboard

---

## Known Issues & Limitations

1. **No Authentication:** Using temp seller_id, no user accounts yet
2. **Hardcoded Location:** All listings show "📍 KL"
3. **No Edit/Delete:** Once posted, listings can't be edited
4. **No Messaging:** Contact is Discord-only, no in-app messaging
5. **business_id field:** Still in schema but unused (will remove later)

---

## User Context

**Primary User:** Adam (@adampangelinan)
- Building marketplace for NS community in Kuala Lumpur
- Immediate need: List bike and monitors for rent to make money ASAP
- Philosophy: Ship fast, iterate based on real usage
- Preference: Simple solutions over complex features

**Target Community:**
- Network State (NS) members in KL
- Small businesses: Akshay, Jangle, Dawn, Emily, Yash, barber, massage services
- Communication: Discord-native

---

## Testing Checklist

Before going live:
- [ ] Run all 3 SQL migrations
- [ ] Test image upload (should use Supabase Storage)
- [ ] Create test listing for sale
- [ ] Create test listing for rent
- [ ] Verify rental price displays correctly ("$X/period")
- [ ] Test search functionality
- [ ] Test Discord contact button
- [ ] Check mobile responsiveness
- [ ] Verify all categories show correctly

---

## Commands Reference

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Access Supabase SQL Editor
# https://supabase.com/dashboard/project/egooebfycikplnqyohgm/sql/new
```

---

## Design Decisions & Rationale

### Why Craigslist-style?
- Familiar UX, zero learning curve
- Fast browsing, minimal clicks
- Mobile-first, text-focused
- Proven model for local marketplaces

### Why No Authentication?
- Reduces friction for first-time users
- Discord provides identity layer
- Can add later if abuse becomes issue

### Why Mandatory Images?
- Physical goods need visual verification
- Matches user expectations (Facebook Marketplace)
- Increases trust and response rate

### Why Supabase Storage over Vercel Blob?
- Already using Supabase for database
- Simpler setup, one less service to manage
- Free tier sufficient for MVP
- Direct integration with existing auth (future)

---

## Success Metrics (Planned)

Track these once live:
1. **Listings created** - Target: 10 in first week
2. **First transaction** - Goal: Within 48 hours of launch
3. **Active users** - NS community members posting/browsing
4. **Contact rate** - % of listings that get Discord contacts
5. **Business onboarding** - Get 3-5 NS businesses posting

---

## Additional Resources

- **Supabase Dashboard:** https://supabase.com/dashboard/project/egooebfycikplnqyohgm
- **Business Onboarding Plan:** See NS_BUSINESS_ONBOARDING.md
- **Discord Scraping Research:** See DISCORD_SCRAPING_RESEARCH.md
- **Original Design Doc:** Referenced in previous session (Craigslist transformation)

---

## Notes for Future Sessions

- User prefers quick, pragmatic solutions
- Avoid over-engineering - ship fast, iterate
- Discord bot scraping is deferred - manual posting for now
- Images are critical - must work before launch
- Rental feature is essential for user's immediate need (bike + monitors)
- Keep it simple - this is a community board, not Amazon
