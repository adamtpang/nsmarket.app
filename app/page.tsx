import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MarketplaceSidebar } from "@/components/marketplace-sidebar"
import { mockListings } from "@/lib/mock-data"

export default function HomePage() {
  const featuredListings = mockListings.slice(0, 8)

  return (
    <div className="flex min-h-screen">
      <MarketplaceSidebar />

      <main className="ml-72 flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/30">
          <div className="px-8 py-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Welcome to NS Market</h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              Buy, sell, and rent within the Network School community
            </p>
            <div className="flex gap-3">
              <Button size="lg" asChild>
                <Link href="/marketplace">Browse Marketplace</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/seller/new">List an Item</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Listings Grid */}
        <section className="px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Today's picks</h2>
            <Button variant="ghost" asChild>
              <Link href="/marketplace">
                See all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featuredListings.map((listing) => (
              <Link key={listing.id} href={`/listing/${listing.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow border-border">
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={listing.images[0] || "/placeholder.svg"}
                      alt={listing.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-3">
                    <div className="text-lg font-bold mb-1">
                      ${listing.price}
                      {listing.type === "rental" && (
                        <span className="text-xs text-muted-foreground font-normal ml-1">
                          /{listing.rentalPeriod?.replace("ly", "")}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-medium line-clamp-2 mb-2">{listing.title}</h3>
                    <p className="text-xs text-muted-foreground">{listing.location}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Rental Section */}
        <section className="px-8 py-8 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Available for rent</h2>
            <Button variant="ghost" asChild>
              <Link href="/marketplace?type=rental">
                See all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockListings
              .filter((l) => l.type === "rental")
              .slice(0, 4)
              .map((listing) => (
                <Link key={listing.id} href={`/listing/${listing.id}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow border-border">
                    <div className="aspect-square relative bg-muted">
                      <img
                        src={listing.images[0] || "/placeholder.svg"}
                        alt={listing.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 bg-foreground text-background text-xs font-medium px-2 py-1 rounded">
                        Rental
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="text-lg font-bold mb-1">
                        ${listing.price}
                        <span className="text-xs text-muted-foreground font-normal ml-1">
                          /{listing.rentalPeriod?.replace("ly", "")}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium line-clamp-2 mb-2">{listing.title}</h3>
                      <p className="text-xs text-muted-foreground">{listing.location}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  )
}
