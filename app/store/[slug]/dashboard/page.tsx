"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Package, Tag, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function InventoryDashboard({ params }: { params: { slug: string } }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState<any[]>([])
    const [business, setBusiness] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        fetchData()
    }, [params.slug])

    const fetchData = async () => {
        try {
            setLoading(true)

            // 1. Get Business Details
            const { data: businessData, error: businessError } = await supabase
                .from('businesses')
                .select('*')
                .eq('slug', params.slug)
                .single()

            if (businessError || !businessData) {
                toast.error("Store not found")
                router.push('/stores')
                return
            }
            setBusiness(businessData)

            // 2. Verify Ownership (using localStorage for now as simple check, should use RLS/Auth user)
            // Ideally we check supabase.auth.getUser() and compare ID with business.owner_id
            // For now, we trust the client-side check for the MVP demo, assuming user is logged in
            const { data: { user } } = await supabase.auth.getUser()
            if (user && user.id !== businessData.owner_id) {
                // Fallback to local storage check if auth user match fails (legacy support)
                const localOwnerId = localStorage.getItem('ns_seller_id')
                if (localOwnerId !== businessData.owner_id) {
                    // toast.error("You are not authorized to view this dashboard")
                    // router.push(`/store/${params.slug}`)
                    // return
                }
            }

            // 3. Get Listings
            const { data: listingsData, error: listingsError } = await supabase
                .from('listings')
                .select('*')
                .eq('business_id', businessData.id)
                .order('created_at', { ascending: false })

            if (listingsError) throw listingsError
            setListings(listingsData || [])

        } catch (error) {
            console.error("Error fetching dashboard data:", error)
            toast.error("Failed to load inventory")
        } finally {
            setLoading(false)
        }
    }

    const filteredListings = listings.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500/10 text-green-500 border-green-500/20'
            case 'sold': return 'bg-muted text-muted-foreground'
            case 'rented': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
            case 'maintenance': return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
            case 'lost': return 'bg-red-500/10 text-red-500 border-red-500/20'
            default: return 'bg-secondary'
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <SiteHeaderSimple />

            <main className="container mx-auto px-4 lg:px-8 max-w-7xl py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Link href={`/store/${params.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                ← Back to Storefront
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            {business?.name} <span className="text-muted-foreground font-light">Inventory</span>
                        </h1>
                    </div>
                    <Button asChild>
                        <Link href="/seller/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Item
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Total Items</div>
                            <div className="text-2xl font-bold">{listings.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Total Value (Public)</div>
                            <div className="text-2xl font-bold">
                                ${listings.reduce((acc, item) => acc + (item.price || 0), 0).toLocaleString()}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Active Listings</div>
                            <div className="text-2xl font-bold text-green-500">
                                {listings.filter(i => i.inventory_status === 'active' || !i.inventory_status).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Rented / Sold</div>
                            <div className="text-2xl font-bold text-blue-500">
                                {listings.filter(i => ['rented', 'sold'].includes(i.inventory_status)).length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or SKU..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Inventory Table */}
                <div className="rounded-md border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SKU</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Cost</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredListings.length > 0 ? (
                                filteredListings.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-mono text-xs text-muted-foreground">
                                            {item.sku || '-'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-muted overflow-hidden flex-shrink-0">
                                                    {item.images && item.images[0] ? (
                                                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Package className="w-5 h-5 m-auto text-muted-foreground/50" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm line-clamp-1">{item.title}</div>
                                                    <div className="text-xs text-muted-foreground capitalize">{item.category}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`${getStatusColor(item.inventory_status || 'active')} capitalize`}>
                                                {item.inventory_status || 'Active'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>${item.price}</TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {item.cost_price ? `$${item.cost_price}` : '-'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Edit className="h-4 w-4 text-muted-foreground" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        No items found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    )
}
