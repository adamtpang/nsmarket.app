import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? 'present' : 'missing',
    key: supabaseAnonKey ? 'present' : 'missing'
  })
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for Craigslist-style marketplace
export type ListingType = 'for-sale' | 'jobs' | 'gigs' | 'housing' | 'services' | 'community'
export type ListingCategory = 'for-sale' | 'jobs' | 'gigs' | 'housing' | 'services' | 'community'

export interface Listing {
  id: string
  title: string
  description: string
  price: number | null // null for "free" or "negotiable"
  type: ListingType
  category: ListingCategory
  subcategory?: string
  listing_type?: 'sale' | 'rent' // For items that can be rented
  rental_period?: 'hour' | 'day' | 'week' | 'month' // Only if listing_type = 'rent'
  images: string[]
  seller_id: string
  seller_name: string
  discord?: string // NS.com native contact
  whatsapp?: string // WhatsApp phone number
  telegram?: string // Telegram handle
  available: boolean
  views: number
  business_id?: string // Keep for now, will remove later
  created_at: string
  updated_at: string
}

export interface CreateListingInput {
  title: string
  description: string
  price: number | null
  type: ListingType
  category: ListingCategory
  subcategory?: string
  images: string[]
  seller_name: string
  discord?: string // username or user ID
  seller_id?: string
}

export interface Business {
  id: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  banner_url?: string
  owner_id: string
  website?: string
  location?: string
  category?: string
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface CreateBusinessInput {
  name: string
  slug: string
  description?: string
  logo_url?: string
  banner_url?: string
  owner_id?: string
  website?: string
  location?: string
  category?: string
}

export interface Sponsor {
  id: string
  company_name: string
  logo_url: string
  website_url: string
  contact_email: string
  slot_size: 'small' | 'medium' | 'large' | 'xlarge'
  pixels_width: number
  pixels_height: number
  total_pixels: number
  amount_paid_cents: number
  stripe_payment_intent_id?: string
  stripe_customer_id?: string
  status: 'pending' | 'active' | 'expired' | 'cancelled'
  is_active: boolean
  starts_at: string
  expires_at: string
  impressions: number
  clicks: number
  created_at: string
  updated_at: string
}
