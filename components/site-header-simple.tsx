import Link from "next/link"
import { Plus, Store } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SiteHeaderProps {
  showListButton?: boolean
}

export function SiteHeaderSimple({ showListButton = true }: SiteHeaderProps) {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
              🏪 NS Market
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Marketplace
              </Link>
              <Link href="/businesses" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                <Store className="h-4 w-4" />
                Businesses
              </Link>
            </nav>
          </div>

          {showListButton && (
            <Button asChild>
              <Link href="/seller/new">
                <Plus className="mr-2 h-4 w-4" />
                List Item
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
