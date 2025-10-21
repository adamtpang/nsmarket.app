import Link from "next/link"
import { CheckCircle, Package, Download } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground">Thank you for your purchase. Your order has been received.</p>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid gap-4 sm:grid-cols-2 mb-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Order Number</div>
                    <div className="font-mono font-semibold">ORD-2025-001234</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Order Date</div>
                    <div className="font-semibold">January 20, 2025</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                    <div className="font-semibold">$113.19</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Payment Method</div>
                    <div className="font-semibold">Stripe</div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Order Items</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Sleep Starter Pack</span>
                      <span className="font-medium">$89.99</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>27" 4K Monitor (Rental)</span>
                      <span className="font-medium">$15.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Track Your Order</h3>
                  <p className="text-sm text-muted-foreground mb-4">We'll send you shipping updates via email</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/orders">View Orders</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Download className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Download Receipt</h3>
                  <p className="text-sm text-muted-foreground mb-4">Get a copy of your order confirmation</p>
                  <Button variant="outline" size="sm">
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">A confirmation email has been sent to your email address</p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/marketplace">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
