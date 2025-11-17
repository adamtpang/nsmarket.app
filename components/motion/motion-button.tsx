"use client"

import { motion } from "motion/react"
import { type ComponentPropsWithoutRef, forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MotionButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  pulseOnHover?: boolean
}

/**
 * Animated Button with enhanced interactions
 */
export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, pulseOnHover = false, children, ...props }, ref) => {
    const MotionButtonWrapper = motion.create(Button)

    return (
      <MotionButtonWrapper
        ref={ref}
        whileHover={{
          scale: 1.02,
          ...(pulseOnHover && {
            boxShadow: "0 0 0 4px oklch(var(--primary) / 0.2)"
          })
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </MotionButtonWrapper>
    )
  }
)

MotionButton.displayName = "MotionButton"
