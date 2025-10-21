"use client"

import { useState } from "react"
import Link from "next/link"
import { CreditCard, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketplaceSidebar } from "@/components/marketplace-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="flex min-h-screen">
      <MarketplaceSidebar />

      <main className="ml-72 flex-1">
        {/* Header */}
        <div className="border-b border-border bg-background px-8 py-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/diverse-woman-portrait.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold mb-1">Your Account</h1>
              <p className="text-sm text-muted-foreground">Manage your profile and preferences</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="purchases">Purchases</TabsTrigger>
              <TabsTrigger value="rentals">Rentals</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="jane@networkschool.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" defaultValue="Network School member since 2024" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Primary Location</Label>
                    <Input id="location" defaultValue="San Francisco, CA" />
                  </div>
                  <Button variant="outline">Update Location</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchases">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: "1", item: "Sleep Starter Pack", price: 89.99, date: "Jan 20, 2025", status: "Delivered" },
                      { id: "2", item: "Mechanical Keyboard", price: 120, date: "Jan 15, 2025", status: "Delivered" },
                      { id: "3", item: "Desk Lamp", price: 45, date: "Jan 10, 2025", status: "In Transit" },
                    ].map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between border-b border-border pb-4 last:border-0"
                      >
                        <div>
                          <div className="font-medium">{order.item}</div>
                          <div className="text-sm text-muted-foreground">{order.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${order.price}</div>
                          <Badge variant="outline" className="text-xs">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rentals">
              <Card>
                <CardHeader>
                  <CardTitle>Active Rentals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: "1", item: '27" 4K Monitor', price: 15, period: "week", dueDate: "Jan 27, 2025" },
                      { id: "2", item: "Mountain Bike", price: 25, period: "week", dueDate: "Jan 25, 2025" },
                    ].map((rental) => (
                      <div
                        key={rental.id}
                        className="flex items-center justify-between border-b border-border pb-4 last:border-0"
                      >
                        <div>
                          <div className="font-medium">{rental.item}</div>
                          <div className="text-sm text-muted-foreground">Due: {rental.dueDate}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            ${rental.price}/{rental.period}
                          </div>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            Extend Rental
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { id: "1", title: "Standing Desk", price: 299, image: "/placeholder.svg" },
                      { id: "2", title: "Office Chair", price: 199, image: "/placeholder.svg" },
                      { id: "3", title: "Webcam", price: 89, image: "/placeholder.svg" },
                    ].map((item) => (
                      <Link key={item.id} href={`/listing/${item.id}`}>
                        <Card className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className="aspect-square relative bg-muted">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <CardContent className="p-3">
                            <div className="text-lg font-bold mb-1">${item.price}</div>
                            <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive updates about your orders</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Price Drop Alerts</div>
                      <div className="text-sm text-muted-foreground">Get notified when saved items go on sale</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
