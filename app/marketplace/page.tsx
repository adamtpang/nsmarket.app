import { SiteHeaderSimple } from "@/components/site-header-simple"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen">
      <SiteHeaderSimple />

      <main className="container mx-auto px-4 lg:px-8 max-w-7xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Browse all listings</p>
        </div>

        {/* Empty State */}
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-6xl mb-4">🛍️</div>
              <h2 className="text-2xl font-bold">No listings yet</h2>
              <p className="text-muted-foreground">
                Be the first to list an item!
              </p>
              <Button size="lg" asChild className="mt-4">
                <Link href="/seller/new">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Listing
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
