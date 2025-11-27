import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { ListingPageSimple } from "@/components/listing-page-simple"

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Fetch listing from Supabase
  const { data: listing, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !listing) {
    notFound()
  }

  // Increment view counter
  await supabase.rpc('increment_listing_views', { listing_id: id })

  // Fetch seller profile
  const { data: sellerProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', listing.seller_id)
    .single()

  return <ListingPageSimple listing={listing} sellerProfile={sellerProfile} />
}
