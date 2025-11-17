"use client"

import { useEffect, useState } from "react"

interface Sponsor {
  id: string
  company_name: string
  logo_url: string
  website_url: string
  slot_size: 'small' | 'medium' | 'large' | 'xlarge'
  pixels_width: number
  pixels_height: number
  impressions: number
  clicks: number
}

export function SponsorDisplay() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const response = await fetch('/api/sponsors')
        const data = await response.json()
        setSponsors(data.sponsors || [])

        // Track impressions
        if (data.sponsors?.length > 0) {
          await fetch('/api/sponsors/impression', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sponsorIds: data.sponsors.map((s: Sponsor) => s.id)
            })
          })
        }
      } catch (err) {
        console.error('Failed to load sponsors:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSponsors()
  }, [])

  const handleSponsorClick = async (sponsor: Sponsor) => {
    // Track click
    try {
      await fetch('/api/sponsors/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sponsorId: sponsor.id })
      })
    } catch (err) {
      console.error('Failed to track click:', err)
    }

    // Open in new tab
    window.open(sponsor.website_url, '_blank')
  }

  if (loading || sponsors.length === 0) {
    return null
  }

  return (
    <div className="w-full border-y bg-muted/30 py-4 mb-6">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            Sponsored
          </div>

          {/* Sponsor Slots */}
          <div className="flex items-center gap-3 flex-wrap justify-center flex-1">
            {sponsors.map((sponsor) => (
              <button
                key={sponsor.id}
                onClick={() => handleSponsorClick(sponsor)}
                className="transition-all hover:scale-105 hover:shadow-lg rounded border border-border bg-background p-2"
                style={{
                  width: `${Math.min(sponsor.pixels_width, 300)}px`,
                  height: `${Math.min(sponsor.pixels_height, 150)}px`,
                }}
                title={`Visit ${sponsor.company_name}`}
              >
                <img
                  src={sponsor.logo_url}
                  alt={sponsor.company_name}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>

          {/* CTA to become a sponsor */}
          <a
            href="/sponsor"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline whitespace-nowrap"
          >
            Sponsor NSMarket
          </a>
        </div>
      </div>
    </div>
  )
}
