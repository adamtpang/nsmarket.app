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
  sellerProfile?: any
}

export function ListingPageSimple({ listing, sellerProfile }: ListingPageProps) {
  const formatPrice = (price: number | null) => {
    if (price === null || price === 0) return 'Free'
    if (price < 0) return 'Negotiable'
    return `$${price}`
  }

  const handleDiscordContact = () => {
    // Use profile username if available, otherwise fallback to listing contact
    const discordHandle = sellerProfile?.username || listing.discord

    if (!discordHandle) {
      alert('No Discord contact provided')
      return
    }

    // Open Discord with pre-filled message
    const message = encodeURIComponent(`Hi! I'm interested in your listing: ${listing.title}`)

    // Try to open Discord app first (deep link), then fallback to web
    if (discordHandle.match(/^\d+$/)) {
      // User ID: Open profile directly
      // discord://users/ID works on mobile/desktop app
      window.location.href = `discord://users/${discordHandle}`

      // Fallback for web (set timeout to allow app to open)
      setTimeout(() => {
        window.open(`https://discord.com/users/${discordHandle}`, '_blank')
      }, 500)
    } else {
      // Username: Copy to clipboard and open Discord
      navigator.clipboard.writeText(discordHandle)
      alert(`Copied "${discordHandle}" to clipboard! Opening Discord...`)
      window.location.href = "discord://"
      setTimeout(() => {
        window.open("https://discord.com/app", '_blank')
      }, 500)
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
              <div className="flex items-end gap-4">
                <div className="text-3xl font-bold text-primary">{formatPrice(listing.price)}</div>
                {listing.quantity !== undefined && (
                  <div className="text-sm text-muted-foreground mb-1">
                    {listing.quantity > 0 ? `${listing.quantity} available` : 'Out of stock'}
                  </div>
                )}
              </div>
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
                <div className="mb-6 flex items-center gap-4">
                  <img
                    src={sellerProfile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${listing.seller_name}`}
                    alt={listing.seller_name}
                    className="w-12 h-12 rounded-full bg-muted"
                  />
                  <div>
                    <div className="font-medium">{sellerProfile?.full_name || listing.seller_name}</div>
                    {sellerProfile?.username && (
                      <div className="text-sm text-muted-foreground">@{sellerProfile.username}</div>
                    )}
                    {/* Fallback if no profile but listing has discord */}
                    {!sellerProfile?.username && listing.discord && (
                      <div className="text-sm text-muted-foreground">Discord: {listing.discord}</div>
                    )}
                  </div>
                </div>

                {listing.available ? (
                  <div className="space-y-2">
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
