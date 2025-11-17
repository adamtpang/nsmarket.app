"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import { SponsorDisplay } from "@/components/sponsor-display"
import type { Listing } from "@/lib/supabase"

interface ListingPageProps {
  listing: Listing
}

export function ListingPageSimple({ listing }: ListingPageProps) {
  const formatPrice = (price: number | null) => {
    if (price === null || price === 0) return 'Free'
    if (price < 0) return 'Negotiable'
    return `$${price}`
  }

  const handleDiscordContact = () => {
    if (!listing.discord) {
      alert('No Discord contact provided')
      return
    }

    // Open Discord with pre-filled message
    const message = encodeURIComponent(`Hi! I'm interested in your listing: ${listing.title}`)

    // If it's a user ID (numeric), use different format
    if (listing.discord.match(/^\d+$/)) {
      window.open(`https://discord.com/users/${listing.discord}`, '_blank')
    } else {
      // It's a username, show it to user
      alert(`Contact seller on Discord: ${listing.discord}\n\nSend them a DM about "${listing.title}"`)
    }
  }

  const handleWhatsAppContact = () => {
    if (!listing.whatsapp) {
      alert('No WhatsApp contact provided')
      return
    }

    // Clean phone number (remove spaces, dashes, etc.)
    const cleanNumber = listing.whatsapp.replace(/\D/g, '')
    const message = encodeURIComponent(`Hi! I'm interested in your listing: ${listing.title}`)

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeaderSimple />

      {/* Sponsor Display */}
      <SponsorDisplay />

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-6">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to listings
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              <div className="text-3xl font-bold text-primary">{formatPrice(listing.price)}</div>
            </div>

            {/* Photos */}
            {listing.images && listing.images.length > 0 && (
              <div className="space-y-2">
                {listing.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`${listing.title} - Photo ${idx + 1}`}
                    className="w-full rounded-lg border"
                  />
                ))}
              </div>
            )}

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-3">Listing Details</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Posted:</span>
                    <span className="font-medium">
                      {new Date(listing.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">📍 KL, Network State</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium capitalize">{listing.category.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Available:</span>
                    <span className={listing.available ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                      {listing.available ? 'Yes' : 'Sold / No longer available'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Contact */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">Posted by</h2>
                <div className="mb-4">
                  <div className="font-medium">{listing.seller_name}</div>
                  <div className="text-sm text-muted-foreground mt-2 space-y-1">
                    {listing.discord && (
                      <div>Discord: {listing.discord}</div>
                    )}
                    {listing.whatsapp && (
                      <div>WhatsApp: {listing.whatsapp}</div>
                    )}
                  </div>
                </div>

                {listing.available ? (
                  <div className="space-y-2">
                    {listing.discord && (
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleDiscordContact}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact on Discord
                      </Button>
                    )}
                    {listing.whatsapp && (
                      <Button
                        className="w-full"
                        size="lg"
                        variant={listing.discord ? "outline" : "default"}
                        onClick={handleWhatsAppContact}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Contact on WhatsApp
                      </Button>
                    )}
                    {!listing.discord && !listing.whatsapp && (
                      <div className="text-sm text-muted-foreground text-center p-4 bg-muted rounded-lg">
                        No contact info provided. Check back later.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground text-center p-4 bg-muted rounded-lg">
                    This item is no longer available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-sm">⚠️ Safety Tips</h3>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li>• Meet in NS common areas</li>
                  <li>• Inspect item before paying</li>
                  <li>• Use NS community channels</li>
                  <li>• Report suspicious activity</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
