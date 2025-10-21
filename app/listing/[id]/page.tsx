import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Shield,
  Star,
  MessageCircle,
  ExternalLink,
  Clock,
  Users,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockListings } from "@/lib/mock-data"

export default function ListingPage({ params }: { params: { id: string } }) {
  const listing = mockListings.find((l) => l.id === params.id)

  if (!listing) {
    notFound()
  }

  const relatedListings = mockListings.filter((l) => l.id !== listing.id && l.category === listing.category).slice(0, 3)

  const getTypeBadge = () => {
    switch (listing.type) {
      case "rental":
        return "For Rent"
      case "service":
        return "Service"
      case "membership":
        return "Membership"
      default:
        return "For Sale"
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 ml-72">
        <div className="container py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/marketplace">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <Card className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  <img
                    src={listing.images[0] || "/placeholder.svg"}
                    alt={listing.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </Card>

              {/* Listing Details */}
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">{listing.title}</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="secondary" className="capitalize">
                            {getTypeBadge()}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {listing.category}
                          </Badge>
                          {listing.condition && (
                            <Badge variant="outline" className="capitalize">
                              {listing.condition}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">${listing.price}</div>
                        {listing.type === "rental" && (
                          <div className="text-sm text-muted-foreground">
                            per {listing.rentalPeriod?.replace("ly", "")}
                          </div>
                        )}
                        {listing.type === "service" && <div className="text-sm text-muted-foreground">per hour</div>}
                        {listing.type === "membership" && (
                          <div className="text-sm text-muted-foreground">
                            per {listing.membershipDuration?.replace("ly", "")}
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h2 className="font-semibold mb-2">Description</h2>
                      <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
                    </div>
                  </div>

                  {listing.type === "service" && listing.skills && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="font-semibold mb-3">Skills & Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                          {listing.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {listing.type === "membership" && listing.benefits && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="font-semibold mb-3">Membership Benefits</h2>
                        <ul className="space-y-2">
                          {listing.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        {listing.communitySize && (
                          <div className="mt-4 flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              <span className="font-semibold text-foreground">{listing.communitySize}</span> active
                              members
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {listing.type === "rental" && listing.deposit && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="font-semibold mb-3">Rental Details</h2>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Rental Period:</span>
                            <span className="font-medium capitalize">{listing.rentalPeriod}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Security Deposit:</span>
                            <span className="font-medium">${listing.deposit}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div>
                    <h2 className="font-semibold mb-3">Listing Information</h2>
                    <div className="grid gap-3 sm:grid-cols-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{listing.seller.location || "Network School Campus"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Posted:</span>
                        <span className="font-medium">
                          {new Date(listing.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {(listing.seller.bio || listing.seller.website || listing.seller.links) && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="font-semibold mb-3">
                          About {listing.type === "membership" ? "This Community" : "the Seller"}
                        </h2>
                        {listing.seller.bio && (
                          <p className="text-muted-foreground leading-relaxed mb-4">{listing.seller.bio}</p>
                        )}
                        <div className="space-y-2">
                          {listing.seller.website && (
                            <a
                              href={listing.seller.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <ExternalLink className="h-4 w-4" />
                              {listing.seller.website.replace("https://", "")}
                            </a>
                          )}
                          {listing.seller.links && listing.seller.links.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-3">
                              {listing.seller.links.map((link) => (
                                <a
                                  key={link.url}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          )}
                          {listing.seller.memberSince && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                              <Clock className="h-4 w-4" />
                              <span>
                                Member since{" "}
                                {new Date(listing.seller.memberSince).toLocaleDateString("en-US", {
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Related Listings */}
              {relatedListings.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-4">Similar Listings</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedListings.map((related) => (
                      <Link key={related.id} href={`/listing/${related.id}`}>
                        <Card className="overflow-hidden hover:border-primary/50 transition-colors">
                          <div className="aspect-video relative bg-muted">
                            <img
                              src={related.images[0] || "/placeholder.svg"}
                              alt={related.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <CardContent className="p-3">
                            <h3 className="font-semibold text-sm line-clamp-1 mb-1">{related.title}</h3>
                            <div className="text-lg font-bold text-primary">
                              ${related.price}
                              {related.type === "rental" && (
                                <span className="text-xs text-muted-foreground font-normal">
                                  /{related.rentalPeriod?.replace("ly", "")}
                                </span>
                              )}
                              {related.type === "service" && (
                                <span className="text-xs text-muted-foreground font-normal">/hr</span>
                              )}
                              {related.type === "membership" && (
                                <span className="text-xs text-muted-foreground font-normal">/mo</span>
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
              {/* Seller Card */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4">
                    {listing.type === "membership" ? "Community" : "Seller"} Information
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={listing.seller.avatar || "/placeholder.svg"}
                      alt={listing.seller.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{listing.seller.name}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span>{listing.seller.rating} rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      {listing.type === "service" ? "Book Session" : "Contact Seller"}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Action Card */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4">
                    {listing.type === "rental" && "Rent This Item"}
                    {listing.type === "good" && "Purchase This Item"}
                    {listing.type === "service" && "Book This Service"}
                    {listing.type === "membership" && "Join This Community"}
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          {listing.type === "rental" && "Rental Price"}
                          {listing.type === "good" && "Price"}
                          {listing.type === "service" && "Hourly Rate"}
                          {listing.type === "membership" && "Monthly Price"}
                        </span>
                        <span className="font-bold">
                          ${listing.price}
                          {listing.type === "rental" && (
                            <span className="text-xs text-muted-foreground font-normal">
                              /{listing.rentalPeriod?.replace("ly", "")}
                            </span>
                          )}
                          {listing.type === "service" && (
                            <span className="text-xs text-muted-foreground font-normal">/hr</span>
                          )}
                          {listing.type === "membership" && (
                            <span className="text-xs text-muted-foreground font-normal">/mo</span>
                          )}
                        </span>
                      </div>
                      {listing.type === "rental" && listing.deposit && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Security Deposit</span>
                          <span className="font-bold">${listing.deposit}</span>
                        </div>
                      )}
                    </div>
                    <Button className="w-full" size="lg">
                      {listing.type === "rental" && "Request Rental"}
                      {listing.type === "good" && "Add to Cart"}
                      {listing.type === "service" && "Book Now"}
                      {listing.type === "membership" && "Join Now"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">Protected by NS Market buyer guarantee</p>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Tips */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-2">Safety Tips</h3>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {listing.type === "service" ? (
                          <>
                            <li>• Review portfolios and references</li>
                            <li>• Start with a trial session</li>
                            <li>• Use secure payment methods</li>
                            <li>• Communicate through the platform</li>
                          </>
                        ) : listing.type === "membership" ? (
                          <>
                            <li>• Attend a trial event first</li>
                            <li>• Read member reviews</li>
                            <li>• Understand cancellation policy</li>
                            <li>• Ask questions before joining</li>
                          </>
                        ) : (
                          <>
                            <li>• Meet in public places</li>
                            <li>• Inspect items before payment</li>
                            <li>• Use secure payment methods</li>
                            <li>• Report suspicious activity</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
