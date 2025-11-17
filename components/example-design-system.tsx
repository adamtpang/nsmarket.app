"use client"

import { MotionWrapper, MotionStaggerContainer, MotionStaggerItem } from "@/components/motion-wrapper"
import { MotionCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/motion/motion-card"
import { MotionButton } from "@/components/motion/motion-button"
import { MotionBadge } from "@/components/motion/motion-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { colorPalette } from "@/lib/colors"
import { Sparkles, Zap, TrendingUp } from "lucide-react"

/**
 * Example Design System Component
 *
 * This component demonstrates the integration of:
 * - shadcn/ui components (Button, Card, Badge)
 * - Framer Motion animations (MotionWrapper, MotionCard, etc.)
 * - Coolors palette (Trust-Building Blue)
 *
 * Use this as a reference for building new components.
 */
export function ExampleDesignSystem() {
  return (
    <div className="min-h-screen bg-background p-8">
      {/* Hero Section with fadeIn animation */}
      <MotionWrapper variant="fadeIn" className="text-center mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          NSMarket Design System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Built with shadcn/ui, Motion (Framer Motion), and a trust-building blue palette
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <MotionBadge variant="default">
            <Sparkles className="w-3 h-3 mr-1" />
            shadcn/ui
          </MotionBadge>
          <MotionBadge variant="secondary" delay={0.1}>
            <Zap className="w-3 h-3 mr-1" />
            Motion
          </MotionBadge>
          <MotionBadge variant="outline" delay={0.2}>
            <TrendingUp className="w-3 h-3 mr-1" />
            Coolors
          </MotionBadge>
        </div>
      </MotionWrapper>

      {/* Color Palette Section */}
      <MotionWrapper variant="fadeIn" delay={0.2} className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Color Palette
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {Object.entries(colorPalette).map(([key, color], index) => (
            <MotionWrapper
              key={key}
              variant="scaleIn"
              delay={0.3 + index * 0.05}
            >
              <div className="text-center">
                <div
                  className="w-full aspect-square rounded-lg shadow-card-hover mb-2 cursor-pointer transition-transform hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                  title={color.use}
                />
                <p className="text-sm font-medium text-foreground">{color.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{color.hex}</p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </MotionWrapper>

      {/* Button Examples */}
      <MotionWrapper variant="slideInFromLeft" delay={0.4} className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Interactive Buttons
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <MotionButton variant="default" pulseOnHover>
            Primary Button
          </MotionButton>
          <MotionButton variant="secondary">
            Secondary Button
          </MotionButton>
          <MotionButton variant="outline">
            Outline Button
          </MotionButton>
          <MotionButton variant="ghost">
            Ghost Button
          </MotionButton>
          <MotionButton variant="destructive">
            Destructive Button
          </MotionButton>
        </div>
      </MotionWrapper>

      {/* Card Grid with Stagger Animation */}
      <div className="mb-16">
        <MotionWrapper variant="fadeIn" delay={0.5}>
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Animated Cards
          </h2>
        </MotionWrapper>

        <MotionStaggerContainer>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "Beautiful UI",
                description: "Crafted with shadcn/ui components for consistent design",
                badge: "Design",
              },
              {
                icon: Zap,
                title: "Smooth Animations",
                description: "Motion (Framer Motion) powers delightful interactions",
                badge: "Animation",
              },
              {
                icon: TrendingUp,
                title: "Trust-Building",
                description: "Professional blue palette that conveys reliability",
                badge: "Branding",
              },
            ].map((item, index) => (
              <MotionStaggerItem key={index}>
                <MotionCard delay={0}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="secondary">{item.badge}</Badge>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Hover over this card to see the lift effect. Tap to see the scale
                      animation.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardFooter>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </div>
        </MotionStaggerContainer>
      </div>

      {/* Usage Example */}
      <MotionWrapper variant="fadeIn" delay={0.8}>
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How to Use
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                1. Import Components
              </h3>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                <code>{`import { MotionCard } from "@/components/motion"
import { Button } from "@/components/ui/button"
import { colorPalette } from "@/lib/colors"`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                2. Use in Your Components
              </h3>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                <code>{`<MotionCard>
  <CardHeader>
    <CardTitle>Your Title</CardTitle>
  </CardHeader>
  <CardContent>
    Your content here
  </CardContent>
</MotionCard>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                3. Access Color Palette
              </h3>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                <code>{`// Use in styles
style={{ backgroundColor: colorPalette.blue.hex }}

// Use in Tailwind
className="bg-primary text-primary-foreground"`}</code>
              </pre>
            </div>
          </div>
        </div>
      </MotionWrapper>
    </div>
  )
}
