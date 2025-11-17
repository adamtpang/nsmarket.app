"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SiteHeaderSimple } from "@/components/site-header-simple"

// Pricing tiers (quadratic-ish pricing)
const PRICING_TIERS = [
  {
    id: 'small',
    name: 'Small',
    width: 120,
    height: 60,
    price: 100,
    description: 'Perfect for startups',
    features: ['7,200 pixels', 'Visible on all pages', 'Monthly analytics']
  },
  {
    id: 'medium',
    name: 'Medium',
    width: 180,
    height: 90,
    price: 225,
    description: 'Most popular',
    popular: true,
    features: ['16,200 pixels', '2.25x more space', 'Priority placement']
  },
  {
    id: 'large',
    name: 'Large',
    width: 240,
    height: 120,
    price: 400,
    description: 'High visibility',
    features: ['28,800 pixels', '4x more space', 'Top of page placement']
  },
  {
    id: 'xlarge',
    name: 'X-Large',
    width: 300,
    height: 150,
    price: 625,
    description: 'Maximum impact',
    features: ['45,000 pixels', '6.25x more space', 'Hero placement']
  }
]

export default function SponsorPage() {
  const [selectedTier, setSelectedTier] = useState('medium')
  const [formData, setFormData] = useState({
    companyName: '',
    websiteUrl: '',
    contactEmail: '',
    logoUrl: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedPricing = PRICING_TIERS.find(t => t.id === selectedTier)!

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create Stripe Checkout session
      const response = await fetch('/api/sponsors/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slotSize: selectedTier,
          pixelsWidth: selectedPricing.width,
          pixelsHeight: selectedPricing.height,
          amountCents: selectedPricing.price * 100
        })
      })

      const { checkoutUrl, error } = await response.json()

      if (error) {
        alert(`Error: ${error}`)
        return
      }

      // Redirect to Stripe Checkout
      window.location.href = checkoutUrl
    } catch (err) {
      alert('Failed to create checkout session. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeaderSimple />

      <main className="container mx-auto px-4 lg:px-8 max-w-6xl py-6">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Sponsor NSMarket</h1>
          <p className="text-xl text-muted-foreground">
            Get your brand in front of 500+ Network School members actively browsing the marketplace
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-muted-foreground">Active members</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">~2k</div>
                  <div className="text-sm text-muted-foreground">Monthly page views</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-muted-foreground">NS-aligned audience</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pricing Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Spot</CardTitle>
                <CardDescription>
                  Quadratic pricing: larger slots get exponentially more expensive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedTier} onValueChange={setSelectedTier}>
                  <div className="space-y-3">
                    {PRICING_TIERS.map((tier) => (
                      <label
                        key={tier.id}
                        className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedTier === tier.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={tier.id} id={tier.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-bold text-lg">{tier.name}</div>
                            {tier.popular && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">{tier.description}</div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="font-mono text-xs text-muted-foreground">
                              {tier.width}×{tier.height}px
                            </div>
                            <div className="text-xs text-muted-foreground">•</div>
                            {tier.features.map((feature, idx) => (
                              <div key={idx} className="text-xs text-muted-foreground">
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">${tier.price}</div>
                          <div className="text-xs text-muted-foreground">/month</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>

                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-semibold mb-4">Company Details</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div>
                      <Label htmlFor="websiteUrl">Website URL *</Label>
                      <Input
                        id="websiteUrl"
                        type="url"
                        required
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                        placeholder="https://acme.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        required
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        placeholder="hello@acme.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="logoUrl">Logo URL *</Label>
                      <Input
                        id="logoUrl"
                        type="url"
                        required
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                        placeholder="https://your-site.com/logo.png"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload your logo to your site and paste the URL here. Recommended: {selectedPricing.width}×{selectedPricing.height}px PNG
                      </p>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Processing...' : `Pay $${selectedPricing.price} - Continue to Checkout`}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-base">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed rounded flex items-center justify-center bg-muted"
                  style={{
                    width: `${selectedPricing.width}px`,
                    height: `${selectedPricing.height}px`,
                    maxWidth: '100%'
                  }}
                >
                  {formData.logoUrl ? (
                    <img
                      src={formData.logoUrl}
                      alt="Logo preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-sm text-muted-foreground p-4">
                      Your logo will appear here
                      <div className="text-xs mt-2">
                        {selectedPricing.width}×{selectedPricing.height}px
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Slot size:</span>
                    <span className="font-medium">{selectedPricing.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span className="font-medium">{selectedPricing.width}×{selectedPricing.height}px</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total pixels:</span>
                    <span className="font-medium">{(selectedPricing.width * selectedPricing.height).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-medium">Monthly cost:</span>
                    <span className="text-xl font-bold">${selectedPricing.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">How does quadratic pricing work?</h3>
              <p className="text-sm text-muted-foreground">
                Larger ad slots cost proportionally more per pixel ($0.0139/pixel/month). This ensures fair pricing and prevents monopolization of ad space.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Where will my ad appear?</h3>
              <p className="text-sm text-muted-foreground">
                Your ad will be displayed on all pages of NSMarket, including the homepage, listing pages, and search results. Higher tier sponsors get priority placement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Can I update my logo or URL?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Email us at sponsors@nsmarket.app with your requested changes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards via Stripe. Your subscription will auto-renew monthly.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
