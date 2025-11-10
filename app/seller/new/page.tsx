"use client"

import { useState } from "react"
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

export default function NewListingPage() {
  const router = useRouter()
  const [listingType, setListingType] = useState<"sale" | "rent">("sale")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)

      const listingData = {
        title: formData.get('title') as string,
        price: parseFloat(formData.get('price') as string),
        description: formData.get('description') as string,
        type: listingType,
        rental_period: listingType === 'rent' ? (formData.get('rental-period') as string) : null,
        images: images,
        seller_id: 'temp-seller-id', // Will be replaced with actual user ID when auth is added
      }

      const { data, error } = await supabase
        .from('listings')
        .insert([listingData])
        .select()

      if (error) {
        console.error('Error creating listing:', error)
        alert(`Error creating listing: ${error.message}`)
        return
      }

      console.log('Listing created successfully:', data)
      alert("Listing created successfully! 🎉")
      router.push("/")
    } catch (error) {
      console.error('Error:', error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeaderSimple showListButton={false} />

      <main className="container mx-auto px-4 lg:px-8 max-w-2xl py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">List an Item</h1>
          <p className="text-muted-foreground">Quick and easy</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* What are you listing? */}
          <Card className="shadow-card">
            <CardContent className="p-6 space-y-4">
              <div>
                <Label className="text-base font-semibold mb-3 block">What are you listing?</Label>
                <RadioGroup value={listingType} onValueChange={(value) => setListingType(value as "sale" | "rent")}>
                  <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer">
                      <div className={`border-2 rounded-lg p-4 text-center transition-all ${
                        listingType === 'sale'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="sale" id="type-sale" className="sr-only" />
                        <div className="text-2xl mb-2">💰</div>
                        <div className="font-semibold">For Sale</div>
                        <div className="text-xs text-muted-foreground">One-time purchase</div>
                      </div>
                    </label>

                    <label className="flex-1 cursor-pointer">
                      <div className={`border-2 rounded-lg p-4 text-center transition-all ${
                        listingType === 'rent'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="rent" id="type-rent" className="sr-only" />
                        <div className="text-2xl mb-2">📦</div>
                        <div className="font-semibold">For Rent</div>
                        <div className="text-xs text-muted-foreground">Recurring rental</div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Title */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label htmlFor="title" className="text-base font-semibold">What are you {listingType === 'sale' ? 'selling' : 'renting out'}?</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Mountain Bike, Monitor, Desk"
                required
                className="mt-2 text-base"
              />
            </CardContent>
          </Card>

          {/* Price */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label htmlFor="price" className="text-base font-semibold">
                {listingType === 'sale' ? 'Price' : 'Rental Price'}
              </Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">$</span>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  className="pl-8 text-base"
                  placeholder="0.00"
                  required
                />
              </div>

              {listingType === 'rent' && (
                <div className="mt-3">
                  <Label htmlFor="rental-period" className="text-sm">Per</Label>
                  <div className="flex gap-2 mt-2">
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="rental-period" value="day" defaultChecked className="sr-only peer" />
                      <div className="border-2 rounded-lg p-2 text-center text-sm peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all">
                        Day
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="rental-period" value="week" className="sr-only peer" />
                      <div className="border-2 rounded-lg p-2 text-center text-sm peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all">
                        Week
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="rental-period" value="month" className="sr-only peer" />
                      <div className="border-2 rounded-lg p-2 text-center text-sm peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all">
                        Month
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Photos */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label className="text-base font-semibold mb-3 block">Add Photos</Label>
              <ImageUpload
                images={images}
                onImagesChange={setImages}
                maxImages={5}
                maxSizeMB={10}
              />
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label htmlFor="description" className="text-base font-semibold">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Condition, features, why you're selling..."
                rows={4}
                className="mt-2 text-base"
                required
              />
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
