import Link from "next/link"
import { Plus } from "lucide-react"
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
              🏪 nsmarket.app
            </Link>
          </div>

          {showListButton && (
            <Button asChild>
              <Link href="/seller/new">
                <Plus className="mr-2 h-4 w-4" />
                Post Listing
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
