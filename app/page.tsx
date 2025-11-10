"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import { supabase, type Listing } from "@/lib/supabase"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchListings() {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching listings:', error)
          console.error('Error details:', JSON.stringify(error, null, 2))
        } else {
          console.log('Fetched listings:', data)
          setListings(data || [])
        }
      } catch (err) {
        console.error('Exception fetching listings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  return (
    <div className="min-h-screen">
      <SiteHeaderSimple />

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 max-w-7xl py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Welcome to NS Market</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Buy, sell, and rent within the Network School community
          </p>
        </section>

        {/* Listings or Empty State */}
        <section>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading listings...</p>
            </div>
          ) : listings.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="p-12 text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="text-6xl mb-4">📦</div>
                  <h2 className="text-2xl font-bold">No listings yet</h2>
                  <p className="text-muted-foreground">
                    Be the first to list an item in the NS Market!
                  </p>
                  <Button size="lg" asChild className="mt-4">
                    <Link href="/seller/new">
                      <Plus className="mr-2 h-5 w-5" />
                      Create First Listing
                    </Link>
                  </Button>
                </div>
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
        </section>
      </main>
    </div>
  )
}
