import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, Calendar, ExternalLink, Star, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { SiteHeaderSimple } from "@/components/site-header-simple"

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // 1. Fetch profile by store_slug
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('store_slug', slug)
        .single()

    if (profileError || !profile) {
        notFound()
    }

    // 2. Fetch listings for this seller
    const { data: listings, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .eq('seller_id', profile.id)
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
            <div className="h-48 md:h-64 bg-muted relative overflow-hidden">
                {profile.store_banner_url ? (
                    <img
                        src={profile.store_banner_url}
                        alt="Store Banner"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary/10 to-primary/30 flex items-center justify-center">
                        <span className="text-4xl opacity-20 font-bold tracking-widest">STOREFRONT</span>
                    </div>
                )}
            </div>

            <main className="container mx-auto px-4 lg:px-8 max-w-6xl -mt-16 relative z-10 mb-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Sidebar / Profile Info */}
                    <div className="w-full md:w-80 flex-shrink-0">
                        <Card className="shadow-lg border-border/50">
                            <CardContent className="p-6 text-center md:text-left pt-8 relative">
                                {/* Avatar */}
                                <div className="absolute -top-12 left-1/2 md:left-6 -translate-x-1/2 md:translate-x-0">
                                    <img
                                        src={profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.username}`}
                                        alt={profile.store_name || profile.username}
                                        className="w-24 h-24 rounded-full border-4 border-background bg-muted shadow-sm"
                                    />
                                </div>

                                <div className="mt-10">
                                    <h1 className="text-2xl font-bold mb-1">{profile.store_name || profile.username}</h1>
                                    <p className="text-sm text-muted-foreground mb-4">@{profile.username}</p>

                                    {profile.store_description && (
                                        <p className="text-sm mb-6 leading-relaxed">
                                            {profile.store_description}
                                        </p>
                                    )}

                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            <span>Network School</span>
                                        </div>
                                        {profile.website && (
                                            <div className="flex items-center justify-center md:justify-start gap-2">
                                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                                                    {profile.website.replace(/^https?:\/\//, '')}
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6 pt-6 border-t flex justify-center md:justify-start gap-2">
                                        <Button className="w-full" asChild>
                                            <a href={`https://discord.com/users/${profile.username}`} target="_blank" rel="noopener noreferrer">
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                Contact
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Listings Grid */}
                    <div className="flex-1 w-full">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Products ({activeListings.length})</h2>

                            {/* Optional: Filter/Sort could go here */}
                        </div>

                        {activeListings.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeListings.map((listing) => (
                                    <Link key={listing.id} href={`/listing/${listing.id}`}>
                                        <Card className="overflow-hidden hover:shadow-md transition-shadow border-border h-full flex flex-col group">
                                            <div className="aspect-square relative bg-muted overflow-hidden">
                                                <img
                                                    src={listing.images?.[0] || "/placeholder.svg"}
                                                    alt={listing.title}
                                                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
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
                                                <h3 className="text-base font-medium line-clamp-2 mb-2 flex-1 group-hover:text-primary transition-colors">
                                                    {listing.title}
                                                </h3>
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
                        ) : (
                            <Card className="border-dashed">
                                <CardContent className="py-12 text-center text-muted-foreground">
                                    No active listings found for this store.
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
