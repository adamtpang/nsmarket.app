"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ImageUpload } from "@/components/image-upload"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

const categories = [
  { value: 'for-sale', label: 'For Sale', emoji: '💰', subcategories: ['electronics', 'furniture', 'sports', 'clothing', 'other'] },
  { value: 'jobs', label: 'Jobs', emoji: '💼', subcategories: ['full-time', 'part-time', 'contract', 'internship'] },
  { value: 'gigs', label: 'Gigs', emoji: '⚡', subcategories: ['tech', 'design', 'writing', 'marketing', 'operations', 'other'] },
  { value: 'housing', label: 'Housing', emoji: '🏠', subcategories: ['rent', 'sublet', 'roommate'] },
  { value: 'services', label: 'Services', emoji: '🔧', subcategories: ['personal', 'professional', 'health', 'creative'] },
  { value: 'community', label: 'Community', emoji: '💬', subcategories: ['events', 'looking-for', 'offering'] },
]

export default function NewListingPage() {
  const router = useRouter()
  const [category, setCategory] = useState<string>("for-sale")
  const [subcategory, setSubcategory] = useState<string>("")
  const [listingType, setListingType] = useState<"sale" | "rent">("sale")
  const [rentalPeriod, setRentalPeriod] = useState<string>("day")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sellerId, setSellerId] = useState<string>("")
  const [businesses, setBusinesses] = useState<any[]>([])
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)

  useEffect(() => {
    // 1. Get or create seller ID
    let storedSellerId = localStorage.getItem('ns_seller_id')
    if (!storedSellerId) {
      storedSellerId = crypto.randomUUID()
      localStorage.setItem('ns_seller_id', storedSellerId)
    }
    setSellerId(storedSellerId)

    // 1.5 Fetch businesses owned by this seller
    const fetchBusinesses = async () => {
      const { data } = await supabase
        .from('businesses')
        .select('id, name')
        .eq('owner_id', storedSellerId)

      if (data && data.length > 0) {
        setBusinesses(data)
        // Default to first business? Or let them choose?
        // Let's defaulted to "Individual" (null) unless they pick one, or maybe alert them.
      }
    }
    fetchBusinesses()

    // 2. Check for referral code
    const cookies = document.cookie.split(';')
    const refCookie = cookies.find(c => c.trim().startsWith('ns_market_ref='))
    if (refCookie) {
      setReferralCode(refCookie.split('=')[1])
    }
  }, [])

  const selectedCategory = categories.find(c => c.value === category)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate at least one image
      if (images.length === 0) {
        toast.error('Please add at least one photo of your item')
        setIsSubmitting(false)
        return
      }

      const formData = new FormData(e.target as HTMLFormElement)

      const listingData = {
        title: formData.get('title') as string,
        price: parseFloat(formData.get('price') as string) || 0,
        quantity: parseInt(formData.get('quantity') as string) || 1,
        description: formData.get('description') as string,
        seller_name: formData.get('seller_name') as string,
        discord: formData.get('discord') as string || null,
        category: category,
        subcategory: subcategory || null,
        listing_type: listingType,
        rental_period: listingType === 'rent' ? rentalPeriod : null,
        type: category as any, // Keep for backwards compatibility
        images: images,
        seller_id: sellerId,
        business_id: selectedBusinessId, // Link to business if selected
        referral_code: referralCode,
        available: true,
        views: 0,
      }

      const { data, error } = await supabase
        .from('listings')
        .insert([listingData])
        .select()

      if (error) {
        console.error('Error creating listing:', error)
        toast.error(`Error creating listing: ${error.message}`)
        return
      }

      console.log('Listing created successfully:', data)
      // Show success toast and redirect
      toast.success("Listing posted successfully! 🎉")
      router.push("/")
    } catch (error) {
      console.error('Error:', error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeaderSimple showListButton={false} />

      <main className="container mx-auto px-4 lg:px-8 max-w-2xl py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Post a Listing</h1>
          <p className="text-muted-foreground">
            Quick and easy • <span className="text-red-500">*</span> Required fields
          </p>
        </div>

        {businesses.length > 0 && (
          <Card className="mb-6 border-primary/20 shadow-sm bg-primary/5">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Posting on behalf of a Store?</h3>
                <p className="text-sm text-muted-foreground">Link this listing to one of your businesses.</p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={selectedBusinessId === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedBusinessId(null)}
                >
                  Individual
                </Button>
                {businesses.map(b => (
                  <Button
                    key={b.id}
                    type="button"
                    variant={selectedBusinessId === b.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedBusinessId(b.id)}
                  >
                    {b.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <Card className="shadow-card">
            <CardContent className="p-6 space-y-4">
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Category <span className="text-red-500">*</span>
                </Label>
                <RadioGroup value={category} onValueChange={(value) => { setCategory(value); setSubcategory(""); }}>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <label key={cat.value} className="cursor-pointer">
                        <div className={`border-2 rounded-lg p-4 text-center transition-all ${category === cat.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                          }`}>
                          <RadioGroupItem value={cat.value} className="sr-only" />
                          <div className="text-2xl mb-2">{cat.emoji}</div>
                          <div className="font-semibold">{cat.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Subcategory */}
              {selectedCategory && selectedCategory.subcategories.length > 0 && (
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Subcategory <span className="text-sm text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <RadioGroup value={subcategory} onValueChange={setSubcategory}>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedCategory.subcategories.map((sub) => (
                        <label key={sub} className="cursor-pointer">
                          <div className={`border rounded-lg p-2 text-center text-sm transition-all ${subcategory === sub
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                            }`}>
                            <RadioGroupItem value={sub} className="sr-only" />
                            <div className="capitalize">{sub}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sale vs Rent Toggle (only for "for-sale" category) */}
          {category === 'for-sale' && (
            <Card className="shadow-card">
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Listing Type <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup value={listingType} onValueChange={(value) => setListingType(value as "sale" | "rent")}>
                    <div className="flex gap-3">
                      <label className="flex-1 cursor-pointer">
                        <div className={`border-2 rounded-lg p-4 text-center transition-all ${listingType === 'sale'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                          }`}>
                          <RadioGroupItem value="sale" className="sr-only" />
                          <div className="text-2xl mb-2">💵</div>
                          <div className="font-semibold">For Sale</div>
                          <div className="text-xs text-muted-foreground">One-time purchase</div>
                        </div>
                      </label>

                      <label className="flex-1 cursor-pointer">
                        <div className={`border-2 rounded-lg p-4 text-center transition-all ${listingType === 'rent'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                          }`}>
                          <RadioGroupItem value="rent" className="sr-only" />
                          <div className="text-2xl mb-2">🔄</div>
                          <div className="font-semibold">For Rent</div>
                          <div className="text-xs text-muted-foreground">Recurring rental</div>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Rental Period (only show if rent is selected) */}
                {listingType === 'rent' && (
                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Rental Period <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup value={rentalPeriod} onValueChange={setRentalPeriod}>
                      <div className="grid grid-cols-4 gap-2">
                        {['hour', 'day', 'week', 'month'].map((period) => (
                          <label key={period} className="cursor-pointer">
                            <div className={`border rounded-lg p-2 text-center text-sm transition-all ${rentalPeriod === period
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                              }`}>
                              <RadioGroupItem value={period} className="sr-only" />
                              <div className="capitalize">{period}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Title */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label htmlFor="title" className="text-base font-semibold">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Mountain Bike, Monitor, Desk"
                required
                className="mt-2 text-base"
              />
            </CardContent>
          </Card>

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <Label htmlFor="price" className="text-base font-semibold">
                  {category === 'for-sale' && listingType === 'rent'
                    ? `Price per ${rentalPeriod}`
                    : 'Price'
                  } <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">$</span>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    className="pl-8 text-base"
                    placeholder={category === 'for-sale' && listingType === 'rent'
                      ? `e.g., 10 per ${rentalPeriod}`
                      : "0 for free, or enter amount"
                    }
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <Label htmlFor="quantity" className="text-base font-semibold">
                  Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="mt-2 text-base"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  How many items do you have available?
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Photos */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label className="text-base font-semibold mb-3 block">
                Add Photos <span className="text-red-500">*</span>
              </Label>
              <ImageUpload
                images={images}
                onImagesChange={setImages}
                maxImages={5}
                maxSizeMB={10}
              />
              <p className="text-xs text-muted-foreground mt-2">
                At least 1 photo required, up to 5 total. 10MB each.
              </p>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label htmlFor="description" className="text-base font-semibold">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Condition, features, details..."
                rows={4}
                className="mt-2 text-base"
                required
              />
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="shadow-card">
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="seller_name" className="text-base font-semibold">
                  Your Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="seller_name"
                  name="seller_name"
                  placeholder="e.g., John"
                  required
                  className="mt-2 text-base"
                />
              </div>

              <div>
                <Label htmlFor="discord" className="text-base font-semibold">
                  Discord Username <span className="text-sm text-muted-foreground font-normal">(Optional)</span>
                </Label>
                <Input
                  id="discord"
                  name="discord"
                  placeholder="e.g., john#1234 or user ID"
                  className="mt-2 text-base"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Your Discord will be shown to interested buyers
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" size="lg" className="flex-1 text-base" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish Listing"}
            </Button>
            <Button type="button" variant="outline" size="lg" asChild>
              <Link href="/">Cancel</Link>
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
