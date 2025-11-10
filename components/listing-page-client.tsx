"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, MessageCircle, Loader2, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ContactSellerDialog } from "@/components/contact-seller-dialog"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import type { Listing } from "@/lib/supabase"

interface ListingPageClientProps {
  listing: Listing
  relatedListings: Listing[]
}

export function ListingPageClient({ listing, relatedListings }: ListingPageClientProps) {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const handleCheckout = async () => {
    setIsProcessingPayment(true)

    try {
      let endpoint = '/api/checkout'
      let body: any = {
        listingId: listing.id,
        listingTitle: listing.title,
        price: listing.price,
        type: listing.type,
        sellerId: listing.seller_id,
      }

      // Use subscription endpoint for rentals
      if (listing.type === 'rent') {
        endpoint = '/api/checkout/subscription'
        body.rentalPeriod = listing.rental_period
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Failed to create checkout session')
        setIsProcessingPayment(false)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('An error occurred. Please try again.')
      setIsProcessingPayment(false)
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeaderSimple />

      <main className="container mx-auto px-4 lg:px-8 max-w-6xl py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden shadow-card">
              {listing.images && listing.images.length > 0 ? (
                <div className="aspect-video relative bg-muted">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <span className="text-6xl">📦</span>
                </div>
              )}
            </Card>

            {/* Listing Details */}
            <Card className="shadow-card">
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold tracking-tight mb-2">{listing.title}</h1>
                      <div className="flex items-center gap-2 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          listing.type === 'sale'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-accent/10 text-accent'
                        }`}>
                          {listing.type === 'sale' ? 'For Sale' : 'For Rent'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">${listing.price.toFixed(2)}</div>
                      {listing.type === 'rent' && listing.rental_period && (
                        <div className="text-sm text-muted-foreground">
                          per {listing.rental_period}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h2 className="font-semibold mb-2">Description</h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {listing.description}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h2 className="font-semibold mb-3">Listing Information</h2>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Posted:</span>
                      <span className="font-medium">
                        {new Date(listing.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Listings */}
            {relatedListings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Similar Listings</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedListings.map((related) => (
                    <Link key={related.id} href={`/listing/${related.id}`}>
                      <Card className="shadow-card hover:shadow-card-hover transition-smooth cursor-pointer overflow-hidden">
                        {related.images && related.images.length > 0 ? (
                          <div className="aspect-video relative bg-muted">
                            <img
                              src={related.images[0]}
                              alt={related.title}
                              className="object-cover w-full h-full hover:scale-105 transition-smooth"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video bg-muted flex items-center justify-center">
                            <span className="text-4xl">📦</span>
                          </div>
                        )}
                        <CardContent className="p-3">
                          <h3 className="font-semibold text-sm line-clamp-1 mb-1">{related.title}</h3>
                          <div className="text-lg font-bold text-primary">
                            ${related.price.toFixed(2)}
                            {related.type === 'rent' && related.rental_period && (
                              <span className="text-xs text-muted-foreground font-normal">
                                /{related.rental_period}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">
                  {listing.type === 'rent' ? 'Rent This Item' : 'Purchase This Item'}
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        {listing.type === 'rent' ? 'Rental Price' : 'Price'}
                      </span>
                      <span className="font-bold">
                        ${listing.price.toFixed(2)}
                        {listing.type === 'rent' && listing.rental_period && (
                          <span className="text-xs text-muted-foreground font-normal">
                            /{listing.rental_period}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  <ContactSellerDialog
                    sellerName="Seller"
                    sellerId={listing.seller_id}
                    listingTitle={listing.title}
                    listingId={listing.id}
                  >
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Seller
                    </Button>
                  </ContactSellerDialog>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <DollarSign className="mr-2 h-4 w-4" />
                        {listing.type === 'rent' ? 'Request Rental' : 'Buy Now'}
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Protected by NS Market buyer guarantee
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
