"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Search,
  ShoppingBag,
  Package,
  Store,
  User,
  Plus,
  Heart,
  Clock,
  Shirt,
  Monitor,
  Bike,
  Sofa,
  Wrench,
  BookOpen,
  Briefcase,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Browse all", href: "/marketplace", icon: Home },
  { name: "Your account", href: "/account", icon: User },
]

const categories = [
  { name: "Electronics", href: "/marketplace?category=electronics", icon: Monitor },
  { name: "Furniture", href: "/marketplace?category=furniture", icon: Sofa },
  { name: "Apparel", href: "/marketplace?category=apparel", icon: Shirt },
  { name: "Sports & Outdoors", href: "/marketplace?category=sports", icon: Bike },
  { name: "Tools & Equipment", href: "/marketplace?category=tools", icon: Wrench },
  { name: "Books & Media", href: "/marketplace?category=books", icon: BookOpen },
  { name: "Services", href: "/marketplace?category=services", icon: Briefcase },
  { name: "Memberships", href: "/marketplace?category=memberships", icon: Users },
]

const quickLinks = [
  { name: "Selling", href: "/seller/dashboard", icon: Store },
  { name: "Renting Out", href: "/seller/dashboard?tab=rentals", icon: Package },
  { name: "Your Purchases", href: "/orders", icon: ShoppingBag },
  { name: "Your Rentals", href: "/orders?tab=rentals", icon: Clock },
  { name: "Saved Items", href: "/saved", icon: Heart },
]

export function MarketplaceSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-sidebar-border bg-sidebar overflow-y-auto">
      <div className="p-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
            <Store className="h-5 w-5 text-background" />
          </div>
          <span className="text-xl font-bold">NS Market</span>
        </Link>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search Marketplace" className="pl-9 bg-background" />
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1 mb-6">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Create Listing Button */}
        <Button className="w-full mb-6" asChild>
          <Link href="/seller/new">
            <Plus className="mr-2 h-4 w-4" />
            Create new listing
          </Link>
        </Button>

        {/* Quick Links */}
        <div className="mb-6">
          <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Quick Links
          </h3>
          <nav className="space-y-1">
            {quickLinks.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Categories */}
        <div>
          <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categories</h3>
          <nav className="space-y-1">
            {categories.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  )
}
