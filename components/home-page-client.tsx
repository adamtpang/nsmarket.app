"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Listing } from "@/lib/supabase"
import { useState } from "react"

interface HomePageClientProps {
  listings: Listing[]
  categoryEmojis: Record<string, string>
}

export function HomePageClient({ listings, categoryEmojis }: HomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Group listings by category
  const forSale = listings.filter(l => l.category === 'for-sale')
  const jobs = listings.filter(l => l.category === 'jobs')
  const gigs = listings.filter(l => l.category === 'gigs')
  const housing = listings.filter(l => l.category === 'housing')
  const services = listings.filter(l => l.category === 'services')
  const community = listings.filter(l => l.category === 'community')

  // Filter by search
  const filterBySearch = (items: Listing[]) => {
    if (!searchQuery) return items
    const query = searchQuery.toLowerCase()
    return items.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    )
  }

  const getEmoji = (listing: Listing) => {
    return categoryEmojis[listing.subcategory || ''] || categoryEmojis['default']
  }

  const formatPrice = (listing: Listing) => {
    const price = listing.price
    if (price === null || price === 0) return 'Free'

    // If it's a rental, show per period
    if (listing.listing_type === 'rent' && listing.rental_period) {
      return `$${price}/${listing.rental_period}`
    }

    return `$${price}`
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold mb-2">No listings yet</h2>
        <p className="text-muted-foreground mb-6">
          Be the first to post in NSMarket!
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-8">
        {/* For Sale Section */}
        {filterBySearch(forSale).length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-foreground">
              For Sale
            </h2>
            <div className="space-y-2">
              {filterBySearch(forSale).map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listing/${listing.id}`}
                  className="block hover:bg-muted/50 transition-colors rounded-lg p-3 border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl flex-shrink-0">{getEmoji(listing)}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base truncate">{listing.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{listing.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-lg text-primary">{formatPrice(listing)}</div>
                      <div className="text-xs text-muted-foreground">📍 KL</div>
                    </div>
                    <Button size="sm" variant="outline">Contact</Button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Services Section */}
        {filterBySearch(services).length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-foreground">
              Services
            </h2>
            <div className="space-y-2">
              {filterBySearch(services).map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listing/${listing.id}`}
                  className="block hover:bg-muted/50 transition-colors rounded-lg p-3 border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl flex-shrink-0">{getEmoji(listing)}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base truncate">{listing.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{listing.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-lg text-primary">{formatPrice(listing)}</div>
                      <div className="text-xs text-muted-foreground">📍 KL</div>
                    </div>
                    <Button size="sm" variant="outline">Contact</Button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Housing Section */}
        {filterBySearch(housing).length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-foreground">
              Housing
            </h2>
            <div className="space-y-2">
              {filterBySearch(housing).map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listing/${listing.id}`}
                  className="block hover:bg-muted/50 transition-colors rounded-lg p-3 border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl flex-shrink-0">🏠</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base truncate">{listing.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{listing.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-lg text-primary">{formatPrice(listing)}</div>
                      <div className="text-xs text-muted-foreground">📍 KL</div>
                    </div>
                    <Button size="sm" variant="outline">Contact</Button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Jobs Section */}
        {filterBySearch(jobs).length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-foreground">
              💼 Jobs
            </h2>
            <div className="space-y-2">
              {filterBySearch(jobs).map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listing/${listing.id}`}
                  className="block hover:bg-muted/50 transition-colors rounded-lg p-3 border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl flex-shrink-0">{getEmoji(listing)}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base truncate">{listing.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{listing.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-lg text-primary">{formatPrice(listing)}</div>
                      <div className="text-xs text-muted-foreground capitalize">{listing.subcategory}</div>
                    </div>
                    <Button size="sm" variant="outline">Apply</Button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Gigs Section */}
        {filterBySearch(gigs).length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-foreground">
              ⚡ Gigs
            </h2>
            <div className="space-y-2">
              {filterBySearch(gigs).map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listing/${listing.id}`}
                  className="block hover:bg-muted/50 transition-colors rounded-lg p-3 border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl flex-shrink-0">{getEmoji(listing)}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base truncate">{listing.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{listing.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-lg text-primary">{formatPrice(listing)}</div>
                      <div className="text-xs text-muted-foreground capitalize">{listing.subcategory}</div>
                    </div>
                    <Button size="sm" variant="outline">Contact</Button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Community Section */}
        {filterBySearch(community).length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-foreground">
              💬 Community
            </h2>
            <div className="space-y-2">
              {filterBySearch(community).map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listing/${listing.id}`}
                  className="block hover:bg-muted/50 transition-colors rounded-lg p-3 border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl flex-shrink-0">{getEmoji(listing)}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base truncate">{listing.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{listing.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-lg text-primary">{formatPrice(listing)}</div>
                      <div className="text-xs text-muted-foreground">📍 KL</div>
                    </div>
                    <Button size="sm" variant="outline">Reply</Button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
