# NS Marketplace Setup Guide

## 🚀 Quick Start

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Vercel Blob Storage (for image uploads)
BLOB_READ_WRITE_TOKEN=your_blob_token_here

# Stripe Payment Processing
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### 2. Get Your Vercel Blob Token

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Integrations → Blob
4. Create a new Blob store
5. Copy the `BLOB_READ_WRITE_TOKEN`

### 3. Set Up Stripe

#### Get Stripe Keys:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your API keys from Developers → API keys
3. Copy:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`

#### Set Up Webhook (for production):
1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook signing secret → `STRIPE_WEBHOOK_SECRET`

### 4. Run Development Server

```bash
npm install --legacy-peer-deps
npm run dev
```

Visit http://localhost:3000

## 💰 Stripe Integration

### One-Time Purchases
- Used for: Physical goods (bikes, monitors, etc.)
- Flow: User clicks "Buy Now" → Stripe Checkout → Success page
- API: `/api/checkout`

### Recurring Rentals
- Used for: Monthly rentals (monitor, scooter, etc.)
- Includes: Security deposit as one-time fee
- Flow: User clicks "Request Rental" → Stripe Subscription → Success page
- API: `/api/checkout/subscription`

### Multi-Seller Support (Future)
Use **Stripe Connect** to:
- Onboard Dawn's bike shop, scooter rentals, etc.
- Split payments between platform and sellers
- Handle payouts automatically

## 📸 Image Upload

- Uses Vercel Blob for storage
- Max: 5 images per listing, 10MB each
- Drag-and-drop or click to upload
- First image = cover photo
- CDN-distributed automatically

## 🏪 Modular Business Aggregation

### Current Seller Model
Sellers have:
- Name, avatar, rating
- Bio, website, links
- Location, member since
- Contact info (phone, email, Discord)

### Adding New Businesses (e.g., Dawn's Bike Shop)

1. Create seller profile in mock data or database
2. Add business info:
   ```typescript
   {
     id: "dawn-bikes",
     name: "Dawn's Bike Shop",
     avatar: "/dawn-avatar.jpg",
     rating: 4.9,
     bio: "Quality bikes for NS community",
     website: "https://dawnbikes.ns",
     links: [
       { label: "Discord", url: "discord://..." },
       { label: "Phone", url: "tel:+1234567890" }
     ],
     location: "NS Campus - Building 3",
     memberSince: "2024-01-01"
   }
   ```

3. Seller creates listings through `/seller/new` form
4. All listings show up on marketplace

### NS Directory Integration
Fetch seller contact info from ns.com/directory:
- Match NS member ID
- Pull phone, Discord, social links
- Auto-populate seller profile

## 🔐 Future: NS OAuth

When NS OAuth becomes available:
- Replace current auth
- Link to NS member profiles
- Auto-verify NS community members
- Import profile data automatically

## 📁 Project Structure

```
app/
├── api/
│   ├── upload/          # Image upload to Vercel Blob
│   ├── checkout/        # Stripe one-time payment
│   └── checkout/subscription/  # Stripe recurring rentals
├── listing/[id]/        # Listing detail page
├── seller/
│   ├── new/            # Create listing (with image upload)
│   └── dashboard/      # Seller management
└── marketplace/         # Browse all listings

components/
├── contact-seller-dialog.tsx  # Contact form modal
├── image-upload.tsx           # Drag-and-drop image upload
└── listing-page-client.tsx    # Listing page with Stripe integration
```

## 🎨 Design System

- **Colors**: Teal-to-coral theme (#264653 → #e76f51)
- **Font**: Inter from Google Fonts
- **UI**: shadcn/ui components
- **Logo**: 🏪 storefront emoji

## 🚢 Deployment

### Deploy to Vercel

```bash
# Connect to Vercel
vercel

# Add environment variables in Vercel dashboard
# Deploy
vercel --prod
```

### Post-Deployment
1. Update Stripe webhook URL
2. Test payment flow end-to-end
3. Verify image uploads work
4. Check email notifications

## 💡 Getting to First Dollar

1. ✅ Contact seller functionality
2. ✅ Image upload for listings
3. ✅ Stripe checkout (one-time + subscriptions)
4. ⏳ Onboard first seller (Dawn's bike shop?)
5. ⏳ Create 3-5 real listings with photos
6. ⏳ Share with NS community
7. 💰 First sale!

## 📝 Next Steps

- [ ] Build seller profile pages (`/seller/[id]`)
- [ ] Integrate NS directory API
- [ ] Add email notifications (Resend or SendGrid)
- [ ] Implement search and filters
- [ ] Add favorites/wishlist
- [ ] Create admin dashboard
- [ ] Set up analytics (PostHog or Mixpanel)
