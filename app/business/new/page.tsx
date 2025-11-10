"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/image-upload"
import { SiteHeaderSimple } from "@/components/site-header-simple"
import { supabase } from "@/lib/supabase"

export default function NewBusinessPage() {
  const router = useRouter()
  const [logoUrl, setLogoUrl] = useState<string[]>([])
  const [bannerUrl, setBannerUrl] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const name = formData.get('name') as string

      const businessData = {
        name,
        slug: generateSlug(name),
        description: formData.get('description') as string,
        logo_url: logoUrl[0] || null,
        banner_url: bannerUrl[0] || null,
        website: formData.get('website') as string,
        location: formData.get('location') as string,
        category: formData.get('category') as string,
        owner_id: 'temp-owner-id', // Will be replaced with actual user ID when auth is added
      }

      const { data, error } = await supabase
        .from('businesses')
        .insert([businessData])
        .select()

      if (error) {
        console.error('Error creating business:', error)
        alert(`Error creating business: ${error.message}`)
        return
      }

      console.log('Business created successfully:', data)
      const businessSlug = data[0].slug
      alert("Business created successfully! 🎉")
      router.push(`/business/${businessSlug}`)
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
          <h1 className="text-3xl font-bold mb-2">Register Your Business</h1>
          <p className="text-muted-foreground">
            Create a storefront to showcase your products and services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label htmlFor="name" className="text-base font-semibold">Business Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Dawn's Bike Shop"
                required
                className="mt-2 text-base"
              />
            </CardContent>
          </Card>

          {/* Logo */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label className="text-base font-semibold mb-3 block">Business Logo</Label>
              <ImageUpload
                images={logoUrl}
                onImagesChange={setLogoUrl}
                maxImages={1}
                maxSizeMB={5}
              />
              <p className="text-xs text-muted-foreground mt-2">Square image recommended (e.g., 200x200px)</p>
            </CardContent>
          </Card>

          {/* Banner */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label className="text-base font-semibold mb-3 block">Banner Image</Label>
              <ImageUpload
                images={bannerUrl}
                onImagesChange={setBannerUrl}
                maxImages={1}
                maxSizeMB={10}
              />
              <p className="text-xs text-muted-foreground mt-2">Wide image recommended (e.g., 1200x300px)</p>
            </CardContent>
          </Card>

          {/* Category */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label htmlFor="category" className="text-base font-semibold">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="e.g., Bikes, Scooters, Food, Services"
                className="mt-2 text-base"
              />
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label htmlFor="location" className="text-base font-semibold">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., NS San Francisco, NS Singapore"
                className="mt-2 text-base"
              />
            </CardContent>
          </Card>

          {/* Website */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label htmlFor="website" className="text-base font-semibold">Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="https://yourwebsite.com"
                className="mt-2 text-base"
              />
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <Label htmlFor="description" className="text-base font-semibold">About Your Business</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell people about your business, what you offer, and why they should choose you..."
                rows={5}
                className="mt-2 text-base"
              />
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" size="lg" className="flex-1 text-base" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Business"}
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
