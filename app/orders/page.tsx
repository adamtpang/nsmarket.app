import Link from "next/link"
import { Package, Eye } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockOrders = [
  {
    id: "ORD-2025-001234",
    date: "2025-01-20",
    total: 113.19,
    status: "processing",
    items: [
      { title: "Sleep Starter Pack", price: 89.99 },
      { title: '27" 4K Monitor', price: 15.0 },
    ],
  },
  {
    id: "ORD-2025-001189",
    date: "2025-01-15",
    total: 45.5,
    status: "delivered",
    items: [{ title: "Desk Lamp", price: 45.5 }],
  },
  {
    id: "ORD-2025-001156",
    date: "2025-01-10",
    total: 299.99,
    status: "delivered",
    items: [{ title: "Office Chair", price: 299.99 }],
  },
]

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-card/50">
          <div className="container py-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">My Orders</h1>
            <p className="text-muted-foreground">View and track your order history</p>
          </div>
        </div>

        <div className="container py-8">
          <div className="max-w-4xl mx-auto space-y-4">
            {mockOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-mono">{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on{" "}
                        {new Date(order.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <Badge variant={order.status === "delivered" ? "default" : "secondary"} className="capitalize">
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span>{item.title}</span>
                        </div>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-sm text-muted-foreground">Total: </span>
                      <span className="font-bold">${order.total.toFixed(2)}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {mockOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
                <Button asChild>
                  <Link href="/marketplace">Browse Marketplace</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
