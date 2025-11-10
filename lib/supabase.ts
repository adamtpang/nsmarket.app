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

// Types for our database
export type ListingType = 'sale' | 'rent'
export type RentalPeriod = 'day' | 'week' | 'month'

export interface Listing {
  id: string
  title: string
  description: string
  price: number
  type: ListingType
  rental_period?: RentalPeriod
  images: string[]
  seller_id: string
  business_id?: string
  created_at: string
  updated_at: string
}

export interface CreateListingInput {
  title: string
  description: string
  price: number
  type: ListingType
  rental_period?: RentalPeriod
  images: string[]
  seller_id?: string // Optional for now, will be required with auth
  business_id?: string // Optional: link listing to a business
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
