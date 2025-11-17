/**
 * NSMarket Color System
 *
 * Trust-Building Blue Palette
 * Designed to convey professionalism, trust, and reliability for a marketplace.
 *
 * Coolors Reference:
 * https://coolors.co/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8
 */

export const colorPalette = {
  // Base palette (from darkest to lightest)
  navy: {
    hex: '#03045e',
    oklch: 'oklch(0.15 0.12 265)',
    name: 'Navy Blue',
    use: 'Text, headers, primary dark elements'
  },
  darkBlue: {
    hex: '#023e8a',
    oklch: 'oklch(0.22 0.11 260)',
    name: 'Dark Blue',
    use: 'Cards in dark mode, secondary dark elements'
  },
  blue: {
    hex: '#0077b6',
    oklch: 'oklch(0.5 0.15 240)',
    name: 'Primary Blue',
    use: 'Primary buttons, links, interactive elements'
  },
  oceanBlue: {
    hex: '#0096c7',
    oklch: 'oklch(0.6 0.13 235)',
    name: 'Ocean Blue',
    use: 'Secondary interactive elements, hover states'
  },
  brightBlue: {
    hex: '#00b4d8',
    oklch: 'oklch(0.67 0.12 235)',
    name: 'Bright Blue',
    use: 'Accents, CTAs, important highlights'
  },
  skyBlue: {
    hex: '#48cae4',
    oklch: 'oklch(0.78 0.1 230)',
    name: 'Sky Blue',
    use: 'Highlights, active states, light accents'
  },
  lightBlue: {
    hex: '#90e0ef',
    oklch: 'oklch(0.85 0.08 228)',
    name: 'Light Blue',
    use: 'Subtle backgrounds, hover effects'
  },
  paleBlue: {
    hex: '#ade8f4',
    oklch: 'oklch(0.92 0.02 240)',
    name: 'Pale Blue',
    use: 'Secondary backgrounds, muted areas'
  },
  iceBlue: {
    hex: '#caf0f8',
    oklch: 'oklch(0.97 0.01 240)',
    name: 'Ice Blue',
    use: 'Page background, lightest surfaces'
  }
} as const

/**
 * Semantic color mapping for UI components
 */
export const semanticColors = {
  // Light mode
  light: {
    background: colorPalette.iceBlue,
    foreground: colorPalette.navy,
    primary: colorPalette.blue,
    accent: colorPalette.brightBlue,
    secondary: colorPalette.paleBlue,
    muted: colorPalette.lightBlue,
    border: colorPalette.paleBlue,
  },
  // Dark mode
  dark: {
    background: colorPalette.navy,
    foreground: colorPalette.iceBlue,
    primary: colorPalette.brightBlue,
    accent: colorPalette.skyBlue,
    secondary: colorPalette.darkBlue,
    muted: colorPalette.oceanBlue,
    border: colorPalette.darkBlue,
  }
} as const

/**
 * Component-specific color utilities
 */
export const componentColors = {
  button: {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  },
  card: {
    default: 'bg-card text-card-foreground border border-border shadow-card',
    elevated: 'bg-card text-card-foreground border border-border shadow-card-hover',
  },
  input: {
    default: 'border-input bg-background text-foreground focus:ring-ring',
  },
  badge: {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    outline: 'border border-border text-foreground',
  }
} as const

/**
 * Accessibility helpers
 */
export const a11yColors = {
  // Focus ring for keyboard navigation
  focusRing: 'ring-2 ring-ring ring-offset-2 ring-offset-background',

  // High contrast text for readability
  highContrast: 'text-foreground',

  // Error states
  error: 'text-destructive border-destructive',

  // Success states (not in base palette, using green)
  success: 'text-green-600 dark:text-green-400',
} as const

/**
 * Get OKLCH color with optional opacity
 */
export function getOklch(color: keyof typeof colorPalette, opacity?: number): string {
  const baseColor = colorPalette[color].oklch
  if (opacity !== undefined) {
    return `${baseColor.replace(')', ` / ${opacity})`)}`
  }
  return baseColor
}

/**
 * Example usage:
 *
 * import { colorPalette, componentColors, getOklch } from '@/lib/colors'
 *
 * // Use in Tailwind classes
 * <Button className={componentColors.button.primary}>Click me</Button>
 *
 * // Use in inline styles
 * <div style={{ backgroundColor: colorPalette.blue.hex }}>...</div>
 *
 * // Use with opacity
 * <div style={{ backgroundColor: getOklch('blue', 0.5) }}>...</div>
 */
