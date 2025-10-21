"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Package, DollarSign, Eye, TrendingUp, MoreVertical, Edit, Trash2 } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketplaceSidebar } from "@/components/marketplace-sidebar"

const mockSellerListings = [
  {
    id: "1",
    title: "Sleep Starter Pack",
    type: "good",
    price: 89.99,
    status: "active",
    views: 234,
    inquiries: 12,
    sales: 3,
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: '27" 4K Monitor',
    type: "rental",
    price: 15,
    status: "active",
    views: 156,
    inquiries: 8,
    rentals: 2,
    createdAt: "2025-01-14",
  },
  {
    id: "3",
    title: "Mechanical Keyboard",
    type: "good",
    price: 120,
    status: "sold",
    views: 89,
    inquiries: 5,
    sales: 1,
    createdAt: "2025-01-12",
  },
]

const mockOrders = [
  {
    id: "ORD-001",
    buyer: "John Smith",
    item: "Sleep Starter Pack",
    amount: 89.99,
    status: "completed",
    date: "2025-01-20",
  },
  {
    id: "ORD-002",
    buyer: "Emma Wilson",
    item: '27" 4K Monitor',
    amount: 15,
    status: "active",
    date: "2025-01-19",
  },
  {
    id: "ORD-003",
    buyer: "David Lee",
    item: "Mechanical Keyboard",
    amount: 120,
    status: "completed",
    date: "2025-01-18",
  },
]

export default function SellerDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = {
    totalListings: mockSellerListings.length,
    activeListings: mockSellerListings.filter((l) => l.status === "active").length,
    totalViews: mockSellerListings.reduce((sum, l) => sum + l.views, 0),
    totalRevenue: mockOrders.filter((o) => o.status === "completed").reduce((sum, o) => sum + o.amount, 0),
  }

  return (
    <div className="flex min-h-screen">
      <MarketplaceSidebar />

      <main className="ml-72 flex-1">
        {/* Header */}
        <div className="border-b border-border bg-background px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Seller Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your listings and track performance</p>
            </div>
            <Button asChild>
              <Link href="/seller/new">
                <Plus className="mr-2 h-4 w-4" />
                New Listing
              </Link>
            </Button>
          </div>
        </div>

        <div className="px-8 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Listings</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalListings}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stats.activeListings} active</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalViews}</div>
                    <p className="text-xs text-muted-foreground mt-1">Across all listings</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground mt-1">From completed orders</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12.5%</div>
                    <p className="text-xs text-muted-foreground mt-1">Views to inquiries</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockOrders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{order.item}</div>
                            <div className="text-sm text-muted-foreground">{order.buyer}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">${order.amount}</div>
                            <Badge variant={order.status === "completed" ? "default" : "secondary"} className="text-xs">
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Listings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockSellerListings
                        .sort((a, b) => b.views - a.views)
                        .slice(0, 3)
                        .map((listing) => (
                          <div key={listing.id} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{listing.title}</div>
                              <div className="text-sm text-muted-foreground">{listing.views} views</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">${listing.price}</div>
                              <div className="text-xs text-muted-foreground">{listing.inquiries} inquiries</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="listings">
              <Card>
                <CardHeader>
                  <CardTitle>My Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Inquiries</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSellerListings.map((listing) => (
                        <TableRow key={listing.id}>
                          <TableCell className="font-medium">{listing.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {listing.type}
                            </Badge>
                          </TableCell>
                          <TableCell>${listing.price}</TableCell>
                          <TableCell>
                            <Badge
                              variant={listing.status === "active" ? "default" : "secondary"}
                              className="capitalize"
                            >
                              {listing.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{listing.views}</TableCell>
                          <TableCell>{listing.inquiries}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">{order.id}</TableCell>
                          <TableCell>{order.buyer}</TableCell>
                          <TableCell>{order.item}</TableCell>
                          <TableCell className="font-bold">${order.amount}</TableCell>
                          <TableCell>
                            <Badge
                              variant={order.status === "completed" ? "default" : "secondary"}
                              className="capitalize"
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(order.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Average Views per Listing</span>
                          <span className="text-sm font-bold">
                            {Math.round(stats.totalViews / stats.totalListings)}
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "65%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Inquiry Rate</span>
                          <span className="text-sm font-bold">12.5%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "12.5%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Conversion Rate</span>
                          <span className="text-sm font-bold">8.3%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "8.3%" }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Wellness</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">234 views</span>
                          <span className="text-sm font-bold">$89.99</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Electronics</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">245 views</span>
                          <span className="text-sm font-bold">$135.00</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <div className="flex-1"></div>
      <SiteFooter />
    </div>
  )
}
