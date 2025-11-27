"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, BarChart3, Package, Eye, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { User } from "@supabase/supabase-js"

export default function DashboardPage() {
    const [listings, setListings] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    // Store Form State
    const [storeSlug, setStoreSlug] = useState("")
    const [storeName, setStoreName] = useState("")
    const [storeDesc, setStoreDesc] = useState("")
    const [isSavingStore, setIsSavingStore] = useState(false)

    useEffect(() => {
        const initDashboard = async () => {
            // 1. Check Auth
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            let currentSellerId = user?.id

            // Fallback to local storage if not logged in (for anonymous sellers)
            if (!currentSellerId) {
                currentSellerId = localStorage.getItem('ns_seller_id') || undefined
            }

            if (!currentSellerId) {
                setIsLoading(false)
                return
            }

            // 2. Fetch Listings
            const { data: listingsData } = await supabase
                .from('listings')
                .select('*')
                .eq('seller_id', currentSellerId)
                .order('created_at', { ascending: false })

            if (listingsData) setListings(listingsData)

            // 3. Fetch Profile (if logged in)
            if (user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (profileData) {
                    setStoreSlug(profileData.store_slug || "")
                    setStoreName(profileData.store_name || "")
                    setStoreDesc(profileData.store_description || "")
                }
            }

            setIsLoading(false)
        }

        initDashboard()
    }, [])

    const handleSaveStore = async () => {
        if (!user) return
        setIsSavingStore(true)

        try {
            const updates = {
                id: user.id,
                store_slug: storeSlug,
                store_name: storeName,
                store_description: storeDesc,
                updated_at: new Date().toISOString(),
            }

            const { error } = await supabase
                .from('profiles')
                .upsert(updates)

            if (error) throw error
            toast.success("Store settings saved!")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsSavingStore(false)
        }
    }

    const totalViews = listings.reduce((acc, curr) => acc + (curr.views || 0), 0)

    return (
        <div className="min-h-screen bg-background">
            {/* Pass false to indicate we are in "Sell" mode (so "Sell" tab is active) */}
            <SiteHeaderSimple showListButton={false} />

            <main className="container mx-auto px-4 lg:px-8 max-w-5xl py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
                        <p className="text-muted-foreground">Manage your listings and view performance</p>
                    </div>
                    <Button asChild size="lg">
                        <Link href="/seller/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Post New Listing
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{listings.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalViews}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Seller Rating</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5.0</div>
                            <p className="text-xs text-muted-foreground">Based on community trust</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Store Settings (Only if logged in) */}
                {user && (
                    <Card className="mb-8 border-primary/20 bg-primary/5">
                        <CardHeader>
                            <CardTitle>Storefront Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Store Name</Label>
                                    <Input
                                        placeholder="e.g. Dawn's Bikes"
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Store URL Slug</Label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground text-sm">nsmarket.app/store/</span>
                                        <Input
                                            placeholder="dawns-bikes"
                                            value={storeSlug}
                                            onChange={(e) => setStoreSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    placeholder="Tell people about your store..."
                                    value={storeDesc}
                                    onChange={(e) => setStoreDesc(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                {storeSlug ? (
                                    <Button variant="link" asChild className="px-0">
                                        <Link href={`/store/${storeSlug}`} target="_blank">
                                            View Live Store <ExternalLink className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                ) : <div />}

                                <Button onClick={handleSaveStore} disabled={isSavingStore}>
                                    {isSavingStore ? "Saving..." : "Save Settings"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Listings Grid */}
                <h2 className="text-xl font-bold mb-4">Your Active Listings</h2>

                {isLoading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : listings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listings.map((listing) => (
                            <Card key={listing.id} className="overflow-hidden flex flex-col">
                                <div className="aspect-video relative bg-muted">
                                    <img
                                        src={listing.images?.[0] || "/placeholder.svg"}
                                        alt={listing.title}
                                        className="object-cover w-full h-full"
                                    />
                                    <Badge className="absolute top-2 right-2 capitalize" variant="secondary">
                                        {listing.status || 'Active'}
                                    </Badge>
                                </div>
                                <CardContent className="p-4 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                                        <div className="text-right">
                                            <span className="font-bold block">${listing.price}</span>
                                            {listing.quantity !== undefined && (
                                                <span className="text-xs text-muted-foreground">
                                                    {listing.quantity} left
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                                        <Eye className="h-3 w-3" /> {listing.views || 0} views
                                    </div>
                                    <div className="mt-auto flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1" asChild>
                                            <Link href={`/listing/${listing.id}`}>View</Link>
                                        </Button>
                                        <Button variant="secondary" size="sm" className="flex-1">
                                            Edit
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mb-4">
                                <Plus className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
                            <p className="text-muted-foreground max-w-sm mb-6">
                                You haven't posted anything for sale yet. Create your first listing to start selling to the community.
                            </p>
                            <Button asChild>
                                <Link href="/seller/new">
                                    Create First Listing <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    )
}
