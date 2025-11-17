# NSMarket Sponsor System Setup Guide

## What We Built

A complete sponsor/advertising system for NSMarket with:

- **Quadratic Pricing**: Larger ad slots cost proportionally more ($0.01389/pixel/month)
- **4 Tier Sizes**: Small ($100), Medium ($225), Large ($400), XLarge ($625)
- **Stripe Integration**: Automated recurring payments
- **Analytics**: Track impressions and clicks per sponsor
- **Mobile-First Display**: Sponsors visible on all pages (homepage, listing pages)

## Database Migration

Run this in your Supabase SQL Editor:

```bash
# Copy the migration file
cat supabase/migrations/007_create_sponsors_table.sql
```

Then paste into Supabase SQL Editor and run it.

## Environment Variables

Add these to your `.env.local`:

```bash
# Stripe (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # Get after setting up webhook (see below)

# App URL (for Stripe redirects)
NEXT_PUBLIC_APP_URL=https://nsmarket.app  # or http://localhost:3000 for local dev
```

## Stripe Setup

### 1. Create Stripe Account
- Go to https://dashboard.stripe.com/register
- Complete verification

### 2. Get API Keys
- Dashboard → Developers → API keys
- Copy "Secret key" → add to `.env.local` as `STRIPE_SECRET_KEY`

### 3. Set Up Webhook (IMPORTANT!)

**For Production:**
1. Dashboard → Developers → Webhooks → Add endpoint
2. Endpoint URL: `https://nsmarket.app/api/sponsors/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
4. Copy webhook signing secret → add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

**For Local Development:**
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/sponsors/webhook

# Copy the webhook signing secret (starts with whsec_)
# Add to .env.local as STRIPE_WEBHOOK_SECRET
```

### 4. Test the Integration

```bash
# Start dev server
npm run dev

# In another terminal, trigger test payment
stripe trigger checkout.session.completed
```

## How It Works

### User Flow
1. Company visits `/sponsor`
2. Selects ad slot size (Small/Medium/Large/XLarge)
3. Fills in company details + logo URL
4. Clicks "Pay $X - Continue to Checkout"
5. Redirects to Stripe Checkout
6. After payment → redirects to `/sponsor/success`
7. Webhook activates sponsor → ad appears site-wide

### Technical Flow
```
┌─────────────┐
│   /sponsor  │  User selects tier & fills form
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│ POST /api/sponsors/     │  Create Stripe session
│      checkout           │  + Insert pending record
└──────┬──────────────────┘
       │
       ▼
┌─────────────────┐
│ Stripe Checkout │  User pays
└──────┬──────────┘
       │
       ▼
┌─────────────────────────┐
│ POST /api/sponsors/     │  Webhook receives event
│      webhook            │  + Activates sponsor
└──────┬──────────────────┘
       │
       ▼
┌─────────────────┐
│ <SponsorDisplay>│  Shows on all pages
└─────────────────┘
```

## Testing Locally

### 1. Create a Test Sponsor

Visit http://localhost:3000/sponsor and fill out the form with:
- Company Name: Test Corp
- Website: https://example.com
- Email: test@test.com
- Logo URL: https://via.placeholder.com/180x90?text=TestCorp

### 2. Use Stripe Test Card

In checkout, use:
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

### 3. Verify Activation

After payment:
1. Check `/sponsor/success` page loads
2. Go to homepage → sponsor should appear in the banner
3. Check Supabase → `sponsors` table → `status` should be `active`

## Pricing Tiers

| Size    | Dimensions | Pixels  | Price/Month | Cost per Pixel |
|---------|-----------|---------|-------------|----------------|
| Small   | 120×60px  | 7,200   | $100        | $0.0139        |
| Medium  | 180×90px  | 16,200  | $225        | $0.0139        |
| Large   | 240×120px | 28,800  | $400        | $0.0139        |
| XLarge  | 300×150px | 45,000  | $625        | $0.0139        |

Formula: `price = pixels × $0.01389`

## Admin Tasks

### View Active Sponsors
```sql
SELECT company_name, slot_size, impressions, clicks, expires_at
FROM sponsors
WHERE status = 'active'
ORDER BY total_pixels DESC;
```

### Manually Expire Sponsor
```sql
UPDATE sponsors
SET status = 'expired'
WHERE id = 'uuid-here';
```

### Auto-Expire Sponsors (run daily via cron)
```sql
SELECT auto_expire_sponsors();
```

## Troubleshooting

### Sponsor not appearing after payment
1. Check webhook received: Stripe Dashboard → Developers → Webhooks → Events
2. Check sponsor status: Supabase → `sponsors` table → verify `status = 'active'`
3. Check browser console for errors in `<SponsorDisplay>`

### Webhook failing
1. Verify `STRIPE_WEBHOOK_SECRET` in `.env.local`
2. Check webhook endpoint is publicly accessible (not localhost unless using Stripe CLI)
3. Check Stripe Dashboard → Webhooks → click endpoint → see failed events

### Payment succeeding but not activating
1. Check webhook is receiving `checkout.session.completed`
2. Verify Supabase `SUPABASE_SERVICE_ROLE_KEY` has write access
3. Check API logs: `vercel logs` or `npm run dev` output

## Next Steps

1. **Analytics Dashboard**: Build `/sponsor/dashboard` to show sponsors their impressions/clicks
2. **Dynamic Pricing**: Adjust pricing based on demand
3. **A/B Testing**: Test different slot placements for higher CTR
4. **Testimonials**: Add sponsor logos to `/sponsor` page
5. **Email Notifications**: Send weekly reports to sponsors

## Revenue Projections

With 500 NS members visiting daily:
- 5 sponsors × $200 avg/mo = **$1,000/month**
- At 2,000 monthly page views = **0.5 impressions per sponsor per view**
- Target CTR: 2-3% = 40-60 clicks/month per sponsor

## Support

Issues? Email: sponsors@nsmarket.app
