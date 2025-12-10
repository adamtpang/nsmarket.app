import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, Calendar, ExternalLink, Star, MessageSquare, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { SiteHeaderSimple } from "@/components/site-header-simple"

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // 1. Fetch business by slug
    const { data: business, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('slug', slug)
        .single()

    if (businessError || !business) {
        console.error('Business not found:', businessError)
        return notFound()
    }

    // 2. Fetch listings for this business
    // Fallback: also search by owner_id if business_id isn't set (for legacy compatibility or simple setup)
    const { data: listings, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .or(`business_id.eq.${business.id},seller_id.eq.${business.owner_id}`)
        .eq('available', true)
        .order('created_at', { ascending: false })

    if (listingsError) {
        console.error('Error fetching listings:', listingsError)
    }

    const activeListings = listings || []

    return (
        <div className="min-h-screen bg-background">
            <SiteHeaderSimple />

            {/* Store Banner */}
            <div className="h-48 md:h-80 bg-muted relative overflow-hidden group">
                {business.banner_url ? (
                    <img
                        src={business.banner_url}
                        alt="Store Banner"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 flex items-center justify-center">
                        <Store className="w-24 h-24 text-primary/20" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>

            <main className="container mx-auto px-4 lg:px-8 max-w-7xl -mt-20 relative z-10 mb-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Sidebar / Business Info */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <Card className="shadow-xl border-border/50 sticky top-24">
                            <CardContent className="p-6 text-center lg:text-left pt-8 relative">
                                {/* Avatar / Logo */}
                                <div className="absolute -top-12 left-1/2 lg:left-6 -translate-x-1/2 lg:translate-x-0">
                                    <div className="w-24 h-24 rounded-xl border-4 border-background bg-card shadow-md overflow-hidden flex items-center justify-center">
                                        {business.logo_url ? (
                                            <img src={business.logo_url} alt={business.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-3xl font-bold text-primary">{business.name.charAt(0)}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-12 space-y-4">
                                    <div>
                                        <h1 className="text-2xl font-bold leading-tight">{business.name}</h1>
                                        {business.location && (
                                            <div className="flex items-center justify-center lg:justify-start gap-1 text-sm text-muted-foreground mt-1">
                                                <MapPin className="h-3 w-3" />
                                                <span>{business.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    {business.description && (
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {business.description}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                        {business.category && (
                                            <Badge variant="secondary" className="capitalize">
                                                {business.category}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t space-y-3">
                                        {business.website && (
                                            <a
                                                href={business.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-primary hover:underline"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                Visit Website
                                            </a>
                                        )}

                                        <Button className="w-full font-semibold" size="lg">
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            Contact Vendor
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content: Listings */}
                    <div className="flex-1 w-full min-w-0">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                Store Listings
                                <Badge variant="secondary" className="rounded-full">{activeListings.length}</Badge>
                            </h2>
                        </div>

                        {activeListings.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {activeListings.map((listing) => (
                                    <Link key={listing.id} href={`/listing/${listing.id}`}>
                                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/60 h-full flex flex-col group">
                                            <div className="aspect-[4/3] relative bg-muted overflow-hidden">
                                                <img
                                                    src={listing.images?.[0] || "/placeholder.svg"}
                                                    alt={listing.title}
                                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                                />
                                                {listing.listing_type !== 'sale' && (
                                                    <Badge className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm border-0 font-medium">
                                                        Rent
                                                    </Badge>
                                                )}
                                                {listing.price === 0 && (
                                                    <Badge className="absolute top-2 left-2 bg-green-500 text-white border-0 font-bold">
                                                        FREE
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardContent className="p-4 flex-1 flex flex-col">
                                                <div className="flex justify-between items-start gap-2 mb-2">
                                                    <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
                                                        {listing.title}
                                                    </h3>
                                                </div>

                                                <div className="mt-auto flex items-end justify-between">
                                                    <div className="font-bold text-lg">
                                                        ${listing.price}
                                                        {listing.listing_type === 'rent' && (
                                                            <span className="text-xs text-muted-foreground font-normal ml-1">/{listing.rental_period}</span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground capitalize">
                                                        {listing.category}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <Card className="border-dashed bg-muted/30">
                                <CardContent className="py-20 text-center">
                                    <Store className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                                    <h3 className="text-lg font-medium text-muted-foreground">No listings yet</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Checking back later for updates from {business.name}.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

