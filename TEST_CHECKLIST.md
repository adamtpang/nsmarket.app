# NSMarket Sponsor System - Test Checklist

## Pre-Test Setup
- [ ] Database migration executed (check Supabase → sponsors table exists)
- [ ] Real Stripe keys in `.env.local` (not `pk_test_xxx`)
- [ ] `stripe listen` running in separate terminal
- [ ] Webhook secret updated in `.env.local`
- [ ] Dev server running (`npm run dev`)

## Test 1: Page Loads
- [ ] Visit http://localhost:3000/sponsor
- [ ] Page loads without errors
- [ ] See 4 pricing tiers (Small, Medium, Large, XLarge)
- [ ] Form has 4 fields (Company Name, Website, Email, Logo URL)
- [ ] Preview box shows selected tier dimensions

## Test 2: Form Submission
- [ ] Fill out all form fields
- [ ] Select a tier (recommend Medium)
- [ ] Logo URL preview shows in preview box
- [ ] Click "Pay $X - Continue to Checkout"
- [ ] Redirects to Stripe Checkout (stripe.com domain)

## Test 3: Payment
- [ ] Use card: 4242 4242 4242 4242
- [ ] Enter future expiry date
- [ ] Enter any CVC
- [ ] Click "Subscribe"
- [ ] Redirects to /sponsor/success
- [ ] Success page shows confirmation

## Test 4: Webhook Processing
- [ ] Check `stripe listen` terminal output
- [ ] Should see: `checkout.session.completed` event
- [ ] Should see: 200 response (success)
- [ ] No errors in webhook processing

## Test 5: Sponsor Appears
- [ ] Go to http://localhost:3000
- [ ] See sponsor banner between header and content
- [ ] Banner shows "Sponsored" label
- [ ] Your logo is visible and sized correctly
- [ ] Click logo → opens website in new tab

## Test 6: Database Verification
- [ ] Go to Supabase → Table Editor → sponsors
- [ ] 1 row exists
- [ ] `status` = `active`
- [ ] `company_name` matches what you entered
- [ ] `impressions` = 1 (from visiting homepage)
- [ ] `clicks` = 1 (if you clicked the logo)

## Test 7: Analytics Tracking
- [ ] Refresh homepage 3 times
- [ ] Check Supabase → sponsors table
- [ ] `impressions` increased by 3
- [ ] Click sponsor logo
- [ ] `clicks` increased by 1

## Troubleshooting

### "Error creating checkout session"
- Check `.env.local` has real Stripe keys (not `pk_test_xxx`)
- Restart dev server after updating `.env.local`
- Check terminal for error messages

### Webhook not activating sponsor
- Verify `stripe listen` is running
- Check webhook secret matches `.env.local`
- Look for errors in `stripe listen` terminal output
- Check Supabase RLS policies allow service role to update

### Sponsor not appearing on homepage
- Check Supabase → sponsors table → `status` should be `active`
- Open browser console (F12) → check for JavaScript errors
- Verify `/api/sponsors` returns data: http://localhost:3000/api/sponsors

### Logo not displaying
- Verify logo URL is publicly accessible
- Check image dimensions match tier size
- Try a placeholder URL: https://via.placeholder.com/180x90

## Production Deployment

When ready to deploy to production (nsmarket.app):

1. **Deploy code to Vercel/production**
2. **Add production Stripe webhook:**
   - Stripe Dashboard → Webhooks → Add endpoint
   - URL: `https://nsmarket.app/api/sponsors/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_succeeded`
3. **Update production env vars:**
   - Add `STRIPE_WEBHOOK_SECRET` from production webhook (not CLI)
4. **Test with real card** (or use test mode in prod)

## Success Metrics

Your sponsor system is working if:
- ✅ Payment completes successfully
- ✅ Sponsor activates within 5 seconds
- ✅ Logo appears on all pages
- ✅ Impressions/clicks track correctly
- ✅ Subscription shows in Stripe Dashboard
