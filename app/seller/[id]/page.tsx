import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, Calendar, ExternalLink, Star, Phone, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"

export default async function SellerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Fetch seller's listings from Supabase
  const { data: sellerListings, error } = await supabase
    .from('listings')
    .select('*')
    .eq('seller_id', id)
    .order('created_at', { ascending: false })

  if (error || !sellerListings || sellerListings.length === 0) {
    notFound()
  }

  // Derive seller info from their most recent listing
  // In a real app, we'd have a separate 'users' table
  const latestListing = sellerListings[0]
  const oldestListing = sellerListings[sellerListings.length - 1]

  const seller = {
    name: latestListing.seller_name,
    // Generate a consistent avatar based on name or use default
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${latestListing.seller_name}`,
    rating: 5.0, // Default for new sellers
    bio: "Network School Community Member", // Default bio
    location: "Network School Campus",
    memberSince: oldestListing.created_at,
    discord: latestListing.discord,
    whatsapp: latestListing.whatsapp,
    telegram: latestListing.telegram
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 ml-0 lg:ml-0">
        {/* Note: Removed ml-72 as sidebar might not be present in all layouts, using container centering instead */}

        {/* Seller Header */}
        <div className="border-b border-border bg-card">
          <div className="container py-12 max-w-5xl mx-auto">
            <div className="flex items-start gap-6">
              <img src={seller.avatar} alt={seller.name} className="h-24 w-24 rounded-full bg-muted" />

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{seller.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {seller.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Member since{" "}
                        {new Date(seller.memberSince).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-2 mb-2 justify-end">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="text-2xl font-bold">{seller.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{sellerListings.length} listings</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed max-w-3xl">{seller.bio}</p>
              </div>
            </div>

            {/* Contact & Links */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="#listings">View Listings</Link>
              </Button>

              {seller.discord && (
                <Button variant="outline" asChild>
                  <a href={`https://discord.com/users/${seller.discord}`} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Discord: {seller.discord}
                  </a>
                </Button>
              )}

              {seller.whatsapp && (
                <Button variant="outline" asChild>
                  <a href={`https://wa.me/${seller.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              )}

              {seller.telegram && (
                <Button variant="outline" asChild>
                  <a href={`https://t.me/${seller.telegram}`} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Telegram
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Seller's Listings */}
        <div className="container py-8 max-w-5xl mx-auto" id="listings">
          <h2 className="text-2xl font-bold mb-6">All Listings ({sellerListings.length})</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerListings.map((listing) => (
              <Link key={listing.id} href={`/listing/${listing.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow border-border h-full flex flex-col">
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={listing.images?.[0] || "/placeholder.svg"}
                      alt={listing.title}
                      className="object-cover w-full h-full"
                    />
                    {listing.type !== "for-sale" && (
                      <div className="absolute top-2 right-2 bg-foreground text-background text-xs font-medium px-2 py-1 rounded capitalize">
                        {listing.type.replace('-', ' ')}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="text-lg font-bold mb-1">
                      ${listing.price}
                      {listing.listing_type === "rent" && (
                        <span className="text-xs text-muted-foreground font-normal ml-1">
                          /{listing.rental_period}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-medium line-clamp-2 mb-2 flex-1">{listing.title}</h3>
                    <div className="flex items-center gap-2 mt-auto">
                      <Badge variant="outline" className="text-xs capitalize">
                        {listing.category.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
