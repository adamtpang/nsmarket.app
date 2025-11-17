"use client"

import { motion, type HTMLMotionProps, type Variants } from "motion/react"
import { type ReactNode } from "react"

/**
 * Pre-configured animation variants for common use cases
 */
export const animationVariants = {
  // Fade in with slide up
  fadeIn: {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1], // easeInOut
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  } as Variants,

  // Scale in with spring
  scaleIn: {
    initial: {
      opacity: 0,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  } as Variants,

  // Slide in from left
  slideInFromLeft: {
    initial: {
      opacity: 0,
      x: -50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.3,
      },
    },
  } as Variants,

  // Slide in from right
  slideInFromRight: {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.3,
      },
    },
  } as Variants,

  // Stagger container for lists
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as Variants,

  // Stagger item (use with staggerContainer)
  staggerItem: {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  } as Variants,
} as const

/**
 * Base motion wrapper with common animation presets
 */
interface MotionWrapperProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: ReactNode
  variant?: keyof typeof animationVariants
  delay?: number
  duration?: number
  className?: string
}

export function MotionWrapper({
  children,
  variant = "fadeIn",
  delay = 0,
  duration,
  className,
  ...props
}: MotionWrapperProps) {
  const variants = animationVariants[variant]

  // Override duration if provided
  const customVariants = duration
    ? {
        ...variants,
        animate: {
          ...variants.animate,
          transition: {
            ...(variants.animate as any).transition,
            duration,
          },
        },
      }
    : variants

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={customVariants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Motion div for stagger container
 */
export function MotionStaggerContainer({
  children,
  className,
  ...props
}: Omit<HTMLMotionProps<"div">, "variants">) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={animationVariants.staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Motion div for stagger items (use inside MotionStaggerContainer)
 */
export function MotionStaggerItem({
  children,
  className,
  ...props
}: Omit<HTMLMotionProps<"div">, "variants">) {
  return (
    <motion.div
      variants={animationVariants.staggerItem}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Hover and tap animations for interactive elements
 */
interface MotionInteractiveProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  scaleOnHover?: number
  scaleOnTap?: number
  className?: string
}

export function MotionInteractive({
  children,
  scaleOnHover = 1.05,
  scaleOnTap = 0.95,
  className,
  ...props
}: MotionInteractiveProps) {
  return (
    <motion.div
      whileHover={{ scale: scaleOnHover }}
      whileTap={{ scale: scaleOnTap }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Motion button component with built-in animations
 */
export const MotionButton = motion.button
export const MotionDiv = motion.div
export const MotionSpan = motion.span
export const MotionSection = motion.section
export const MotionArticle = motion.article
export const MotionLi = motion.li
export const MotionUl = motion.ul
