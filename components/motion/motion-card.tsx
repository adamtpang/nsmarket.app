"use client"

import { motion, type HTMLMotionProps } from "motion/react"
import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

interface MotionCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  tap?: boolean
  delay?: number
}

/**
 * Animated Card component with hover and tap effects
 */
export function MotionCard({
  children,
  className,
  hover = true,
  tap = true,
  delay = 0
}: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={hover ? {
        y: -4,
        boxShadow: "0 10px 30px -10px oklch(0.5 0.15 240 / 0.2)",
        transition: { duration: 0.2 }
      } : undefined}
      whileTap={tap ? { scale: 0.98 } : undefined}
      className={className}
    >
      <Card className="h-full transition-colors">
        {children}
      </Card>
    </motion.div>
  )
}

/**
 * Re-export Card subcomponents for convenience
 */
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
