# 🗄️ Supabase Database Setup - NS Marketplace

## Quick Setup Guide

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Name**: `ns-marketplace` (or your choice)
   - **Database Password**: Use a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Start with Free tier

### 2. Get Your API Credentials

Once your project is created:

1. Go to **Project Settings** (gear icon)
2. Click **API** in the left sidebar
3. Copy these values:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon/public key: eyJhbGc...long_key_here
```

### 3. Add Credentials to Your Project

Open `.env.local` in your project and replace:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your_actual_key
```

### 4. Create Database Tables

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `supabase/migrations/001_create_listings_table.sql`
4. Paste it into the SQL editor
5. Click **"Run"** (or press Cmd/Ctrl + Enter)

You should see: ✅ **Success. No rows returned**

### 5. Verify Database Setup

1. Click **Table Editor** in Supabase dashboard
2. You should see a `listings` table with these columns:
   - `id` (uuid)
   - `title` (text)
   - `description` (text)
   - `price` (numeric)
   - `type` (text)
   - `rental_period` (text, nullable)
   - `images` (text[])
   - `seller_id` (text)
   - `created_at` (timestamptz)
   - `updated_at` (timestamptz)

### 6. Test Your Connection

Restart your dev server:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

Visit http://localhost:3001/seller/new and try creating a listing!

---

## 📋 What We Created

### Database Schema

**Table**: `listings`

```sql
- id: UUID (primary key, auto-generated)
- title: TEXT (required)
- description: TEXT (required)
- price: DECIMAL(10,2) (required, e.g., 29.99)
- type: TEXT (required, 'sale' or 'rent')
- rental_period: TEXT (optional, 'day', 'week', or 'month')
- images: TEXT[] (array of image URLs)
- seller_id: TEXT (required, temporary - will be UUID with auth)
- created_at: TIMESTAMP (auto-set)
- updated_at: TIMESTAMP (auto-updated on changes)
```

### Security (Row Level Security)

- ✅ **Anyone can view** listings (public marketplace)
- ✅ **Anyone can create** listings (for now)
- 🔒 **Only sellers can update/delete** their own listings (when auth is added)

### Indexes for Performance

- Type index (fast filtering by sale/rent)
- Seller ID index (fast lookup of seller's listings)
- Created date index (fast sorting by newest)

---

## 🔧 Files Created

### Configuration
- `.env.local` - Your private API keys (never commit this!)
- `.env.example` - Template with placeholders
- `lib/supabase.ts` - Supabase client setup + TypeScript types

### Database
- `supabase/migrations/001_create_listings_table.sql` - Database schema

---

## 🚀 Next Steps

After setup, the app will:
1. ✅ Save listings to Supabase database
2. ✅ Load listings from database on homepage/marketplace
3. ✅ Allow sellers to view their listings in dashboard
4. ✅ Persist data permanently (no more mock data!)

---

## 🔐 Future: Adding Authentication

When you're ready to add NS.com authentication:

1. Update `seller_id` from TEXT to UUID
2. Link to Supabase Auth or custom OAuth
3. RLS policies will automatically protect user data
4. Users can only edit/delete their own listings

---

## 💡 Tips

- **Free Tier Limits**: 500MB database, 2GB bandwidth/month
- **Backups**: Supabase auto-backs up your data
- **Real-time**: Supabase supports real-time subscriptions (future feature!)
- **Storage**: Can also use Supabase Storage instead of Vercel Blob

---

## 🐛 Troubleshooting

### Error: "Invalid API key"
- Double-check your `.env.local` credentials
- Make sure there are no extra spaces
- Restart your dev server after changing `.env.local`

### Error: "relation 'listings' does not exist"
- Run the SQL migration in Supabase SQL Editor
- Refresh the Table Editor to verify table was created

### Error: "Row Level Security policy violation"
- Check that RLS policies were created in the migration
- Verify "Anyone can view listings" policy exists

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
