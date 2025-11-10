import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { ListingPageClient } from "@/components/listing-page-client"

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

  // Fetch related listings (same type, different listing)
  const { data: relatedListings } = await supabase
    .from('listings')
    .select('*')
    .eq('type', listing.type)
    .neq('id', listing.id)
    .limit(3)

  return <ListingPageClient listing={listing} relatedListings={relatedListings || []} />
}
