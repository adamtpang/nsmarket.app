"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import { ArrowRight, CheckCircle2, DollarSign, Zap } from "lucide-react"

export default function SellPage() {
  const searchParams = useSearchParams()
  const refCode = searchParams.get('ref')

  useEffect(() => {
    if (refCode) {
      // Store referral code in cookie for 30 days
      document.cookie = `ns_market_ref=${refCode}; path=/; max-age=${60 * 60 * 24 * 30}`
    }
  }, [refCode])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeaderSimple />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-primary/5 to-background">
          <div className="container max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Sell to your neighbors at <span className="text-primary">Network School</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              The frictionless way to sell products, services, and rentals to the community.
              No fees. No shipping. Cash or Crypto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="xl" className="text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl transition-all">
                <Link href="/seller/new">
                  Start Selling Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
                Takes less than 2 minutes
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="container max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Zero Fees</h3>
                <p className="text-muted-foreground">
                  Keep 100% of what you earn. We don't take a cut of your sales. Transactions happen directly between you and the buyer.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Frictionless Setup</h3>
                <p className="text-muted-foreground">
                  No account required to browse. Simple one-step listing process. Post a product, service, or rental in seconds.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Trusted Community</h3>
                <p className="text-muted-foreground">
                  Deal with verified Network School members. Safe meetups on campus. Build your reputation in the community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">What can you sell?</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { emoji: "🚲", label: "Physical Goods", desc: "Bikes, monitors, gear" },
                { emoji: "🔧", label: "Services", desc: "Design, code, massage" },
                { emoji: "🏠", label: "Rentals", desc: "Rooms, equipment" },
                { emoji: "🎫", label: "Events", desc: "Workshops, dinners" },
              ].map((item) => (
                <div key={item.label} className="bg-background p-6 rounded-xl border text-center">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <div className="font-bold mb-1">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to make your first sale?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the marketplace that's built for the Network School economy.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/seller/new">
                Create Your Listing
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
