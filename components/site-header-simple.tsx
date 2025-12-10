import Link from "next/link"
import { Plus, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthButton } from "@/components/auth-button"

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
              🏪 nsmarket.app
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" asChild>
                <Link href="/stores">
                  <Store className="w-4 h-4 mr-2" />
                  Stores
                </Link>
              </Button>
            </div>

            {/* Buy / Sell Toggle */}
            <div className="hidden md:flex items-center bg-muted/50 p-1 rounded-full border ml-4">
              <Link
                href="/"
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!showListButton ? 'text-muted-foreground hover:text-foreground' : 'bg-background shadow-sm text-foreground'
                  }`}
              >
                Buy
              </Link>
              <Link
                href="/dashboard"
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${showListButton ? 'text-muted-foreground hover:text-foreground' : 'bg-background shadow-sm text-foreground'
                  }`}
              >
                Sell
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="md:hidden">
              <Link href="/stores">Stores</Link>
            </Button>
            <Button variant="ghost" asChild className="md:hidden">
              <Link href="/dashboard">Sell</Link>
            </Button>

            {showListButton && (
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" className="hidden sm:flex">
                  <Link href="/seller/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Post
                  </Link>
                </Button>
                <AuthButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
