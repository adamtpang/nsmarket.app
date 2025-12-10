import Link from "next/link"
import { Store, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"

export const revalidate = 60 // Revalidate every minute

export default async function StoresPage() {
    const { data: stores, error } = await supabase
        .from('businesses')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching stores:", error)
    }

    const businessList = stores || []

    return (
        <div className="min-h-screen bg-background">
            <SiteHeaderSimple />

            <main className="container mx-auto px-4 lg:px-8 max-w-7xl py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Marketplace Vendors</h1>
                        <p className="text-muted-foreground mt-1">
                            Discover independent shops and local services in the Network School.
                        </p>
                    </div>
                    <Button asChild size="lg">
                        <Link href="/businesses/new">
                            <Store className="mr-2 h-4 w-4" />
                            Open a Store
                        </Link>
                    </Button>
                </div>

                {businessList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {businessList.map((store) => (
                            <Link key={store.id} href={`/store/${store.slug}`} className="group">
                                <Card className="overflow-hidden hover:shadow-lg transition-all border-border/60 h-full flex flex-col bg-card/50 hover:bg-card">
                                    {/* Store Banner Preview */}
                                    <div className="h-32 bg-muted relative overflow-hidden">
                                        {store.banner_url ? (
                                            <img
                                                src={store.banner_url}
                                                alt={store.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10" />
                                        )}
                                        {/* Avatar overlay */}
                                        <div className="absolute -bottom-6 left-6">
                                            <div className="w-16 h-16 rounded-lg border-4 border-background bg-card shadow-sm overflow-hidden flex items-center justify-center">
                                                {store.logo_url ? (
                                                    <img src={store.logo_url} alt={store.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Store className="w-8 h-8 text-primary/40" />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="pt-10 pb-6 px-6 flex-1 flex flex-col">
                                        <div className="mb-2">
                                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                                                {store.name}
                                            </h3>
                                            {store.location && (
                                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    <span className="truncate">{store.location}</span>
                                                </div>
                                            )}
                                        </div>

                                        {store.description && (
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                                                {store.description}
                                            </p>
                                        )}

                                        <div className="mt-auto flex items-center justify-between">
                                            {store.category ? (
                                                <Badge variant="secondary" className="text-xs font-normal">
                                                    {store.category}
                                                </Badge>
                                            ) : (
                                                <span />
                                            )}

                                            <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                                Visit Store →
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-muted/20 rounded-xl border border-dashed">
                        <Store className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                        <h3 className="text-xl font-medium text-foreground">No vendors yet</h3>
                        <p className="text-muted-foreground mt-2 mb-6 max-w-md mx-auto">
                            Be the first to open a storefront and start selling to the community.
                        </p>
                        <Button asChild size="lg">
                            <Link href="/businesses/new">Create Storefront</Link>
                        </Button>
                    </div>
                )}
            </main>
        </div>
    )
}
