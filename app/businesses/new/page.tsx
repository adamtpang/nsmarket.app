"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/image-upload"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Store } from "lucide-react"

export default function NewBusinessPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")
    const [description, setDescription] = useState("")
    const [website, setWebsite] = useState("")
    const [location, setLocation] = useState("")
    const [logo, setLogo] = useState<string[]>([])
    const [banner, setBanner] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [ownerId, setOwnerId] = useState<string>("")

    useEffect(() => {
        // 1. Get or create owner ID (same as seller ID)
        let storedSellerId = localStorage.getItem('ns_seller_id')
        if (!storedSellerId) {
            storedSellerId = crypto.randomUUID()
            localStorage.setItem('ns_seller_id', storedSellerId)
        }
        setOwnerId(storedSellerId)
    }, [])

    // Auto-generate slug from name
    useEffect(() => {
        if (name) {
            const autoSlug = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            if (!slug || slug.replace(/-/g, ' ') === name.toLowerCase()) {
                setSlug(autoSlug)
            }
        }
    }, [name])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            if (!name || !slug) {
                toast.error("Name and Slug are required")
                setIsSubmitting(false)
                return
            }

            // Check if slug exists
            const { data: existing } = await supabase
                .from('businesses')
                .select('id')
                .eq('slug', slug)
                .single()

            if (existing) {
                toast.error("This URL is already taken. Please choose another.")
                setIsSubmitting(false)
                return
            }

            const businessData = {
                name,
                slug,
                description,
                website,
                location,
                logo_url: logo[0] || null,
                banner_url: banner[0] || null,
                owner_id: ownerId,
                is_featured: false
            }

            const { data, error } = await supabase
                .from('businesses')
                .insert([businessData])
                .select()
                .single()

            if (error) {
                console.error('Error creating business:', error)
                toast.error(`Error: ${error.message}`)
                return
            }

            toast.success("Storefront created successfully! 🎉")
            router.push(`/store/${slug}`)
        } catch (error) {
            console.error('Error:', error)
            toast.error("An error occurred. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Preview Card Component
    const StorePreview = () => (
        <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Live Preview</h3>
            <Card className="overflow-hidden shadow-lg border-border/60 bg-card group pointer-events-none">
                {/* Store Banner Preview */}
                <div className="h-32 bg-muted relative overflow-hidden">
                    {banner.length > 0 ? (
                        <img
                            src={banner[0]}
                            alt="Banner Preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10" />
                    )}
                    {/* Avatar overlay */}
                    <div className="absolute -bottom-6 left-6">
                        <div className="w-16 h-16 rounded-lg border-4 border-background bg-card shadow-sm overflow-hidden flex items-center justify-center">
                            {logo.length > 0 ? (
                                <img src={logo[0]} alt="Logo Preview" className="w-full h-full object-cover" />
                            ) : (
                                <Store className="w-8 h-8 text-primary/40" />
                            )}
                        </div>
                    </div>
                </div>

                <CardContent className="pt-10 pb-6 px-6">
                    <div className="mb-2">
                        <h3 className="font-bold text-lg line-clamp-1">
                            {name || "Your Store Name"}
                        </h3>
                        {(location || "Network School") && (
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <span className="truncate">{location || "Network School"}</span>
                            </div>
                        )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                        {description || "Your store description will appear here..."}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                        <div className="h-5 w-20 bg-muted rounded animate-pulse" /> {/* Placeholder for category badge */}

                        <span className="text-xs font-medium text-primary opacity-50">
                            Visit Store →
                        </span>
                    </div>
                </CardContent>
            </Card>
            <p className="text-xs text-muted-foreground mt-4 text-center">
                This is how your store will appear in the marketplace list.
            </p>
        </div>
    )

    return (
        <div className="min-h-screen bg-muted/30">
            <SiteHeaderSimple showListButton={false} />

            <main className="container mx-auto px-4 lg:px-8 max-w-6xl py-12">
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                        <Store className="w-6 h-6" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Create Your Storefront</h1>
                    <p className="text-muted-foreground">
                        Launch your brand on NS Marketplace.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left Column: Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <div>
                                        <Label htmlFor="name">Store Name <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Adam's Monitors"
                                            required
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="slug">Store URL <span className="text-red-500">*</span></Label>
                                        <div className="flex items-center mt-2">
                                            <span className="bg-muted px-3 py-2 border border-r-0 rounded-l-md text-muted-foreground text-sm">
                                                nsmarket.app/store/
                                            </span>
                                            <Input
                                                id="slug"
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                                placeholder="adams-monitors"
                                                required
                                                className="rounded-l-none"
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            unique web address
                                        </p>
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Tell us about your business..."
                                            className="mt-2"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6 space-y-6">
                                    <div>
                                        <Label className="block mb-2">Store Logo</Label>
                                        <div className="flex gap-4 items-start">
                                            <div className="flex-1">
                                                <ImageUpload
                                                    images={logo}
                                                    onImagesChange={setLogo}
                                                    maxImages={1}
                                                />
                                            </div>
                                            <div className="text-xs text-muted-foreground max-w-[200px]">
                                                Recommended: Square image (1:1), e.g. 400x400px.
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="block mb-2">Store Banner</Label>
                                        <ImageUpload
                                            images={banner}
                                            onImagesChange={setBanner}
                                            maxImages={1}
                                        />
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Recommended: Wide landscape image, e.g. 1200x400px.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <div>
                                        <Label htmlFor="website">Website <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                                        <Input
                                            id="website"
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                            placeholder="https://..."
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="location">Location <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                                        <Input
                                            id="location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="e.g. Network School, Cabin 4"
                                            className="mt-2"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex gap-3 pt-4">
                                <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                                    {isSubmitting ? "Creating Store..." : "Create Storefront"}
                                </Button>
                                <Button type="button" variant="outline" size="lg" asChild>
                                    <Link href="/">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Preview */}
                    <div className="hidden lg:block">
                        <StorePreview />
                    </div>
                </div>
            </main>
        </div>
    )
}
