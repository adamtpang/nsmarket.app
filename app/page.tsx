import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import { supabase, type Listing } from "@/lib/supabase"
import { HomePageClient } from "@/components/home-page-client"
import { SponsorDisplay } from "@/components/sponsor-display"

// Category emoji mapping
const categoryEmojis: Record<string, string> = {
  // For Sale
  'electronics': '🖥️',
  'furniture': '🪑',
  'sports': '🚲',
  'clothing': '👕',
  // Jobs
  'full-time': '💼',
  'part-time': '⏰',
  'contract': '📄',
  'internship': '🎓',
  // Gigs
  'tech': '💻',
  'design': '🎨',
  'writing': '✍️',
  'marketing': '📢',
  'operations': '⚙️',
  // Housing
  'rent': '🏠',
  'sublet': '🔑',
  'roommate': '👥',
  // Services
  'personal': '💆',
  'professional': '💼',
  'health': '💊',
  'creative': '🎨',
  // Community
  'events': '🎉',
  'looking-for': '🔍',
  'offering': '🤝',
  'other': '📦',
  'default': '📦'
}

export default async function HomePage() {
  // Fetch listings on the server (instant page loads!)
  const { data: listings, error } = await supabase
    .from('listings')
    .select('*')
    .eq('available', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching listings:', error)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeaderSimple />

      {/* Sponsor Display - visible on mobile and desktop */}
      <SponsorDisplay />

      <main className="container mx-auto px-4 lg:px-8 max-w-5xl py-6">
        {/* Search Bar */}
        <div className="mb-8 flex gap-3 items-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/seller/new">
              <Plus className="mr-2 h-4 w-4" />
              Post Listing
            </Link>
          </Button>
        </div>

        {/* Client component handles search + rendering */}
        <HomePageClient
          listings={listings || []}
          categoryEmojis={categoryEmojis}
        />
      </main>
    </div>
  )
}
