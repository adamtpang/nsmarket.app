import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeaderSimple } from "@/components/site-header-simple"

export default function SponsorSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeaderSimple />

      <main className="container mx-auto px-4 lg:px-8 max-w-2xl py-12">
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
            <p className="text-muted-foreground mb-8">
              Your sponsorship is now active. Your ad will appear across NSMarket within the next few minutes.
            </p>

            <div className="space-y-4 text-left max-w-md mx-auto mb-8">
              <h2 className="font-semibold">What happens next?</h2>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✅ Your ad is now live on all pages</li>
                <li>📊 Track impressions & clicks in your dashboard (coming soon)</li>
                <li>🔄 Subscription auto-renews monthly</li>
                <li>📧 Check your email for the receipt</li>
              </ul>
            </div>

            <div className="flex gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/">View NSMarket</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="mailto:sponsors@nsmarket.app">Contact Support</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
