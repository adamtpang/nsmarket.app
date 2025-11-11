# 📸 Image Upload Setup - Vercel Blob

## Quick Setup Guide

### 1. Go to Vercel Blob Dashboard
https://vercel.com/dashboard/stores

### 2. Create a New Blob Store
1. Click **"Create Database"**
2. Select **"Blob"**
3. Name it: `ns-marketplace-images`
4. Select your project: `nsmarketplace.vercel.app`
5. Click **"Create"**

### 3. Get Your Token

After creating the store, you'll see environment variables. Copy the **`BLOB_READ_WRITE_TOKEN`**.

It looks like: `vercel_blob_rw_xxxxxxxxxxxx_yyyyyyyy`

### 4. Add to Local Environment

Open `.env.local` and replace:

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxx_yyyyyyyy
```

### 5. Add to Vercel (Production)

The token should be automatically added to your Vercel project when you created the store. Verify:

1. Go to https://vercel.com/adamtpang/nsmarketplace-vercel-app/settings/environment-variables
2. Check that `BLOB_READ_WRITE_TOKEN` exists
3. If not, add it manually

### 6. Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 7. Test Image Upload

1. Go to http://localhost:3000/seller/new
2. Click "Add Photos"
3. Upload an image
4. Should now work! ✅

---

## Pricing

Vercel Blob is free for:
- 1 GB storage
- 1 GB bandwidth/month

Perfect for MVP! Upgrade later if needed.

---

## How It Works

1. User selects image in browser
2. Image is uploaded to `/api/upload`
3. API uploads to Vercel Blob
4. Returns public URL
5. URL is saved to Supabase with listing

Your images are hosted on Vercel's CDN - fast and reliable!

---

## Troubleshooting

### Error: "Image upload is not configured"
- Token is missing from `.env.local`
- Add the token and restart dev server

### Error: "Failed to upload file"
- Check token is valid
- Verify Vercel Blob store exists
- Check Vercel dashboard for errors

### Images work locally but not in production
- Verify token exists in Vercel environment variables
- Redeploy after adding token
