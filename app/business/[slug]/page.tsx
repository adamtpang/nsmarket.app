"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, MapPin, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import { supabase, type Business, type Listing } from "@/lib/supabase"
import { useParams } from "next/navigation"

export default function BusinessPage() {
  const params = useParams()
  const slug = params.slug as string

  const [business, setBusiness] = useState<Business | null>(null)
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBusinessData() {
      // Fetch business
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('slug', slug)
        .single()

      if (businessError || !businessData) {
        console.error('Error fetching business:', businessError)
        setLoading(false)
        return
      }

      setBusiness(businessData)

      // Fetch business listings
      const { data: listingsData, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .eq('business_id', businessData.id)
        .order('created_at', { ascending: false })

      if (listingsError) {
        console.error('Error fetching listings:', listingsError)
      } else {
        setListings(listingsData || [])
      }

      setLoading(false)
    }

    fetchBusinessData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen">
        <SiteHeaderSimple />
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-8">
          <p className="text-center text-muted-foreground">Loading business...</p>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="min-h-screen">
        <SiteHeaderSimple />
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-8">
          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🏪</div>
              <h2 className="text-2xl font-bold mb-2">Business Not Found</h2>
              <p className="text-muted-foreground mb-6">This business doesn't exist or has been removed.</p>
              <Button asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Marketplace
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <SiteHeaderSimple />

      <main className="container mx-auto px-4 lg:px-8 max-w-7xl py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>

        {/* Business Header */}
        <div className="mb-8">
          {business.banner_url && (
            <div className="aspect-[4/1] relative bg-muted rounded-lg overflow-hidden mb-6">
              <img
                src={business.banner_url}
                alt={business.name}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              {business.logo_url ? (
                <img
                  src={business.logo_url}
                  alt={business.name}
                  className="w-24 h-24 rounded-lg object-cover border-2 border-border"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center text-4xl border-2 border-border">
                  🏪
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{business.name}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                {business.category && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {business.category}
                  </span>
                )}
                {business.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {business.location}
                  </div>
                )}
                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Website
                  </a>
                )}
              </div>

              {business.description && (
                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  {business.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Business Listings */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Store className="h-6 w-6" />
            Available Items ({listings.length})
          </h2>

          {listings.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-bold mb-2">No listings yet</h3>
                <p className="text-muted-foreground">
                  This business hasn't listed any items yet. Check back soon!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Link href={`/listing/${listing.id}`} key={listing.id}>
                  <Card className="shadow-card hover:shadow-card-hover transition-smooth cursor-pointer overflow-hidden">
                    {listing.images && listing.images.length > 0 ? (
                      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="object-cover w-full h-full hover:scale-105 transition-smooth"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                        <span className="text-6xl">📦</span>
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                        {listing.title}
                      </h3>
                      <p className="text-2xl font-bold text-primary mb-2">
                        ${listing.price.toFixed(2)}
                        {listing.type === 'rent' && listing.rental_period && (
                          <span className="text-sm text-muted-foreground font-normal">
                            /{listing.rental_period}
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {listing.description}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          listing.type === 'sale'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-accent/10 text-accent'
                        }`}>
                          {listing.type === 'sale' ? 'For Sale' : 'For Rent'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
