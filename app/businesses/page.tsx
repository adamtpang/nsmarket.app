"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Store, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import { supabase, type Business } from "@/lib/supabase"

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching businesses:', error)
          console.error('Error details:', JSON.stringify(error, null, 2))
        } else {
          console.log('Fetched businesses:', data)
          setBusinesses(data || [])
        }
      } catch (err) {
        console.error('Exception fetching businesses:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBusinesses()
  }, [])

  return (
    <div className="min-h-screen">
      <SiteHeaderSimple />

      <main className="container mx-auto px-4 lg:px-8 max-w-7xl py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Store className="h-10 w-10 text-primary" />
              NS Businesses
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover and support businesses in the Network School community
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/business/new">
              <Plus className="mr-2 h-5 w-5" />
              Register Business
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading businesses...</p>
          </div>
        ) : businesses.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-6xl mb-4">🏪</div>
                <h2 className="text-2xl font-bold">No businesses yet</h2>
                <p className="text-muted-foreground">
                  Be the first to register your business on NS Market!
                </p>
                <Button size="lg" asChild className="mt-4">
                  <Link href="/business/new">
                    <Plus className="mr-2 h-5 w-5" />
                    Register Your Business
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <Link href={`/business/${business.slug}`} key={business.id}>
                <Card className="shadow-card hover:shadow-card-hover transition-smooth cursor-pointer overflow-hidden h-full">
                  {business.banner_url ? (
                    <div className="aspect-[4/2] relative overflow-hidden bg-muted">
                      <img
                        src={business.banner_url}
                        alt={business.name}
                        className="object-cover w-full h-full hover:scale-105 transition-smooth"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/2] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <Store className="h-16 w-16 text-primary/30" />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      {business.logo_url ? (
                        <img
                          src={business.logo_url}
                          alt={business.name}
                          className="w-12 h-12 rounded-lg object-cover border-2 border-border flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl border-2 border-border flex-shrink-0">
                          🏪
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                          {business.name}
                        </h3>
                        {business.category && (
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {business.category}
                          </span>
                        )}
                      </div>
                    </div>
                    {business.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {business.description}
                      </p>
                    )}
                    {business.is_featured && (
                      <div className="flex items-center gap-1 text-xs text-primary font-medium">
                        ⭐ Featured Business
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
