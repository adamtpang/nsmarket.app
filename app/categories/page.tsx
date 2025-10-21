import type React from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/mock-data"
import { Package, Laptop, Sofa, Heart, Dumbbell, Book, UtensilsCrossed, Shirt } from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  electronics: <Laptop className="h-8 w-8" />,
  furniture: <Sofa className="h-8 w-8" />,
  wellness: <Heart className="h-8 w-8" />,
  sports: <Dumbbell className="h-8 w-8" />,
  books: <Book className="h-8 w-8" />,
  kitchen: <UtensilsCrossed className="h-8 w-8" />,
  clothing: <Shirt className="h-8 w-8" />,
  other: <Package className="h-8 w-8" />,
}

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-card/50">
          <div className="container py-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Categories</h1>
            <p className="text-muted-foreground">Browse items by category</p>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/marketplace?category=${category.id}`}>
                <Card className="hover:border-primary/50 transition-colors h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {categoryIcons[category.id] || categoryIcons.other}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.count} {category.count === 1 ? "listing" : "listings"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
