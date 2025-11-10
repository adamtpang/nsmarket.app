import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, Calendar, ExternalLink, Star, Phone, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockListings } from "@/lib/mock-data"

export default async function SellerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Find seller from mock listings
  const sellerListings = mockListings.filter((l) => l.seller.id === id)

  if (sellerListings.length === 0) {
    notFound()
  }

  const seller = sellerListings[0].seller

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 ml-72">
        {/* Seller Header */}
        <div className="border-b border-border bg-card">
          <div className="container py-12">
            <div className="flex items-start gap-6">
              <img src={seller.avatar} alt={seller.name} className="h-24 w-24 rounded-full" />

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{seller.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      {seller.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {seller.location}
                        </div>
                      )}
                      {seller.memberSince && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Member since{" "}
                          {new Date(seller.memberSince).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="text-2xl font-bold">{seller.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{sellerListings.length} listings</p>
                  </div>
                </div>

                {seller.bio && <p className="text-muted-foreground leading-relaxed max-w-3xl">{seller.bio}</p>}
              </div>
            </div>

            {/* Contact & Links */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="#listings">View Listings</Link>
              </Button>

              {seller.website && (
                <Button variant="outline" asChild>
                  <a href={seller.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Website
                  </a>
                </Button>
              )}

              {seller.links &&
                seller.links.map((link) => (
                  <Button key={link.url} variant="outline" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label.toLowerCase().includes("discord") && (
                        <MessageSquare className="mr-2 h-4 w-4" />
                      )}
                      {link.label.toLowerCase().includes("phone") && <Phone className="mr-2 h-4 w-4" />}
                      {link.label.toLowerCase().includes("email") && <Mail className="mr-2 h-4 w-4" />}
                      {link.label}
                    </a>
                  </Button>
                ))}
            </div>
          </div>
        </div>

        {/* Seller's Listings */}
        <div className="container py-8" id="listings">
          <h2 className="text-2xl font-bold mb-6">All Listings</h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sellerListings.map((listing) => (
              <Link key={listing.id} href={`/listing/${listing.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow border-border">
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={listing.images[0] || "/placeholder.svg"}
                      alt={listing.title}
                      className="object-cover w-full h-full"
                    />
                    {listing.type !== "good" && (
                      <div className="absolute top-2 right-2 bg-foreground text-background text-xs font-medium px-2 py-1 rounded capitalize">
                        {listing.type}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <div className="text-lg font-bold mb-1">
                      ${listing.price}
                      {listing.type === "rental" && (
                        <span className="text-xs text-muted-foreground font-normal ml-1">
                          /{listing.rentalPeriod?.replace("ly", "")}
                        </span>
                      )}
                      {listing.type === "service" && (
                        <span className="text-xs text-muted-foreground font-normal ml-1">/hr</span>
                      )}
                    </div>
                    <h3 className="text-sm font-medium line-clamp-2 mb-2">{listing.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {listing.category}
                      </Badge>
                      {listing.condition && (
                        <Badge variant="secondary" className="text-xs capitalize">
                          {listing.condition}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {sellerListings.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No listings yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
