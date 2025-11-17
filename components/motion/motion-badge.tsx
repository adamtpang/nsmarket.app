"use client"

import { motion } from "motion/react"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MotionBadgeProps extends BadgeProps {
  pulse?: boolean
  delay?: number
}

/**
 * Animated Badge with optional pulse effect
 */
export function MotionBadge({
  className,
  pulse = false,
  delay = 0,
  children,
  ...props
}: MotionBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 500,
        damping: 15
      }}
      whileHover={{ scale: 1.1 }}
      className="inline-block"
    >
      <Badge
        className={cn(
          pulse && "animate-pulse",
          className
        )}
        {...props}
      >
        {children}
      </Badge>
    </motion.div>
  )
}
