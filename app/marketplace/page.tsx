"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MarketplaceSidebar } from "@/components/marketplace-sidebar"
import { mockListings } from "@/lib/mock-data"

export default function MarketplacePage() {
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const filteredListings = mockListings.sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    return 0
  })

  return (
    <div className="flex min-h-screen">
      <MarketplaceSidebar />

      <main className="ml-72 flex-1">
        {/* Header */}
        <div className="border-b border-border bg-background px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Marketplace</h1>
              <p className="text-sm text-muted-foreground">{filteredListings.length} items available</p>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredListings.map((listing) => (
              <Link key={listing.id} href={`/listing/${listing.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow border-border">
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={listing.images[0] || "/placeholder.svg"}
                      alt={listing.title}
                      className="object-cover w-full h-full"
                    />
                    {listing.type === "rental" && (
                      <div className="absolute top-2 right-2 bg-foreground text-background text-xs font-medium px-2 py-1 rounded">
                        Rental
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
                    </div>
                    <h3 className="text-sm font-medium line-clamp-2 mb-2">{listing.title}</h3>
                    <p className="text-xs text-muted-foreground">{listing.location}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
