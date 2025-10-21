import Link from "next/link"
import { ArrowLeft, CheckCircle2, DollarSign, Camera, MessageSquare, Shield } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SellerGuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-card/50">
          <div className="container py-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/seller/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Seller Guide</h1>
            <p className="text-muted-foreground">Everything you need to know about selling on NS Market</p>
          </div>
        </div>

        <div className="container py-12">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Getting Started */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Camera className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Take Great Photos</h3>
                        <p className="text-sm text-muted-foreground">
                          Use good lighting and multiple angles. Clear photos get 3x more inquiries.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Price Competitively</h3>
                        <p className="text-sm text-muted-foreground">
                          Research similar items. Fair pricing leads to faster sales.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Respond Quickly</h3>
                        <p className="text-sm text-muted-foreground">
                          Reply to inquiries within 24 hours. Fast responses build trust.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Stay Safe</h3>
                        <p className="text-sm text-muted-foreground">
                          Meet in public places and use secure payment methods.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Best Practices */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Best Practices</h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Write Detailed Descriptions</h3>
                      <p className="text-sm text-muted-foreground">
                        Include condition, dimensions, features, and any flaws. Transparency builds trust.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Choose the Right Category</h3>
                      <p className="text-sm text-muted-foreground">
                        Proper categorization helps buyers find your items faster.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Update Availability</h3>
                      <p className="text-sm text-muted-foreground">
                        Mark items as sold or unavailable promptly to avoid confusion.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Be Honest About Condition</h3>
                      <p className="text-sm text-muted-foreground">
                        Accurate condition ratings prevent disputes and build your reputation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Fees & Payments */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Fees & Payments</h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">No Listing Fees</h3>
                    <p className="text-sm text-muted-foreground">
                      Your first 5 listings are completely free. After that, it's just $1 per listing.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Transaction Fees</h3>
                    <p className="text-sm text-muted-foreground">
                      We charge 5% on completed sales to maintain the platform. Rentals have a 10% fee.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Payment Options</h3>
                    <p className="text-sm text-muted-foreground">
                      Accept payments via Stripe (credit/debit cards) or Solana Pay (cryptocurrency).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTA */}
            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/seller/new">Create Your First Listing</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
