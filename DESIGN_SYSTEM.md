# NSMarket Design System

A production-ready design system built with **shadcn/ui**, **Motion (Framer Motion)**, and a **trust-building blue color palette** from Coolors.

## 🎨 Color Palette

### Coolors Reference
**Link**: https://coolors.co/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8

### Colors (Darkest to Lightest)

| Color | Hex | OKLCH | Usage |
|-------|-----|-------|-------|
| Navy Blue | `#03045e` | `oklch(0.15 0.12 265)` | Text, headers, primary dark |
| Dark Blue | `#023e8a` | `oklch(0.22 0.11 260)` | Dark mode cards, secondary dark |
| Primary Blue | `#0077b6` | `oklch(0.5 0.15 240)` | Buttons, links, interactive |
| Ocean Blue | `#0096c7` | `oklch(0.6 0.13 235)` | Secondary interactive, hover |
| Bright Blue | `#00b4d8` | `oklch(0.67 0.12 235)` | Accents, CTAs, highlights |
| Sky Blue | `#48cae4` | `oklch(0.78 0.1 230)` | Active states, light accents |
| Light Blue | `#90e0ef` | `oklch(0.85 0.08 228)` | Subtle backgrounds, hover |
| Pale Blue | `#ade8f4` | `oklch(0.92 0.02 240)` | Secondary backgrounds |
| Ice Blue | `#caf0f8` | `oklch(0.97 0.01 240)` | Page background |

### Semantic Mapping

```tsx
import { colorPalette } from '@/lib/colors'

// Light mode
background: colorPalette.iceBlue    // Page background
foreground: colorPalette.navy       // Text
primary: colorPalette.blue          // Buttons, links
accent: colorPalette.brightBlue     // CTAs, highlights

// Dark mode
background: colorPalette.navy       // Page background
foreground: colorPalette.iceBlue    // Text
primary: colorPalette.brightBlue    // Buttons, links
accent: colorPalette.skyBlue        // CTAs, highlights
```

## 🧩 Component Library

### shadcn/ui Components

All components use the **New York** style with CSS variables for theming.

**Installed components:**
- `button` - Interactive buttons with variants
- `card` - Content containers with header/footer
- `input` - Form inputs with validation styles
- `select` - Dropdown selections
- `dialog` - Modal dialogs
- `badge` - Status indicators
- `avatar` - User profile images
- `dropdown-menu` - Context menus
- `tabs` - Tabbed interfaces
- `label` - Form labels

**Usage:**
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Button variant="default">Click me</Button>
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Motion Components

Pre-built animated components combining shadcn/ui with Motion.

#### MotionWrapper
Generic wrapper with animation presets:

```tsx
import { MotionWrapper } from "@/components/motion-wrapper"

// Fade in with slide up
<MotionWrapper variant="fadeIn">
  <YourComponent />
</MotionWrapper>

// Scale in with spring
<MotionWrapper variant="scaleIn" delay={0.2}>
  <YourComponent />
</MotionWrapper>

// Slide from left/right
<MotionWrapper variant="slideInFromLeft">
  <YourComponent />
</MotionWrapper>
```

**Available variants:**
- `fadeIn` - Fade + slide up (default)
- `scaleIn` - Scale with spring
- `slideInFromLeft` - Horizontal slide from left
- `slideInFromRight` - Horizontal slide from right

#### MotionCard
Animated card with hover/tap effects:

```tsx
import { MotionCard, CardHeader, CardTitle, CardContent } from "@/components/motion/motion-card"

<MotionCard hover={true} tap={true} delay={0.1}>
  <CardHeader>
    <CardTitle>Hover me!</CardTitle>
  </CardHeader>
  <CardContent>
    This card lifts on hover and scales on tap.
  </CardContent>
</MotionCard>
```

#### MotionButton
Animated button with spring animations:

```tsx
import { MotionButton } from "@/components/motion/motion-button"

<MotionButton variant="default" pulseOnHover>
  Click me
</MotionButton>
```

#### MotionBadge
Animated badge with scale-in:

```tsx
import { MotionBadge } from "@/components/motion/motion-badge"

<MotionBadge variant="default" pulse={false} delay={0.2}>
  New
</MotionBadge>
```

#### Stagger Animations
For lists and grids:

```tsx
import {
  MotionStaggerContainer,
  MotionStaggerItem
} from "@/components/motion-wrapper"

<MotionStaggerContainer>
  {items.map((item, i) => (
    <MotionStaggerItem key={i}>
      <Card>{item.title}</Card>
    </MotionStaggerItem>
  ))}
</MotionStaggerContainer>
```

#### Interactive Elements
For hover/tap effects:

```tsx
import { MotionInteractive } from "@/components/motion-wrapper"

<MotionInteractive scaleOnHover={1.05} scaleOnTap={0.95}>
  <div className="cursor-pointer">
    Click me!
  </div>
</MotionInteractive>
```

## 🎭 Animation Presets

All animations use smooth easing curves and spring physics:

```tsx
export const animationVariants = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  // ... more variants
}
```

## 📁 Project Structure

```
nsmarket.app/
├── app/
│   ├── design-system/         # Demo page (visit /design-system)
│   └── globals.css            # Theme CSS variables
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── motion/                # Motion-enhanced components
│   │   ├── motion-card.tsx
│   │   ├── motion-button.tsx
│   │   ├── motion-badge.tsx
│   │   └── index.ts
│   ├── motion-wrapper.tsx     # Base motion utilities
│   └── example-design-system.tsx
├── lib/
│   ├── colors.ts              # Color palette + utilities
│   └── utils.ts               # cn() helper
└── tailwind.config.ts         # Tailwind + shadcn config
```

## 🚀 Quick Start

### 1. Import Components

```tsx
// shadcn/ui components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Motion components
import { MotionCard } from "@/components/motion"
import { MotionWrapper } from "@/components/motion-wrapper"

// Colors
import { colorPalette, componentColors } from "@/lib/colors"
```

### 2. Build a Component

```tsx
import { MotionCard, CardHeader, CardTitle, CardContent } from "@/components/motion/motion-card"
import { MotionButton } from "@/components/motion/motion-button"
import { MotionBadge } from "@/components/motion/motion-badge"
import { Sparkles } from "lucide-react"

export function MyComponent() {
  return (
    <MotionCard>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>My Card</CardTitle>
          <MotionBadge variant="secondary">
            <Sparkles className="w-3 h-3 mr-1" />
            New
          </MotionBadge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          This card has smooth animations!
        </p>
        <MotionButton variant="default" pulseOnHover>
          Get Started
        </MotionButton>
      </CardContent>
    </MotionCard>
  )
}
```

### 3. Use Colors

```tsx
import { colorPalette } from '@/lib/colors'

// In Tailwind classes (recommended)
<div className="bg-primary text-primary-foreground">
  Uses CSS variables
</div>

// In inline styles
<div style={{ backgroundColor: colorPalette.blue.hex }}>
  Uses hex color
</div>

// With opacity
import { getOklch } from '@/lib/colors'
<div style={{ backgroundColor: getOklch('blue', 0.5) }}>
  50% opacity blue
</div>
```

## 🎬 Animation Examples

### Page Transitions

```tsx
import { MotionWrapper } from "@/components/motion-wrapper"

export default function Page() {
  return (
    <MotionWrapper variant="fadeIn">
      <h1>Page Content</h1>
    </MotionWrapper>
  )
}
```

### List Animations

```tsx
import { MotionStaggerContainer, MotionStaggerItem } from "@/components/motion-wrapper"

<MotionStaggerContainer>
  {items.map((item, i) => (
    <MotionStaggerItem key={i}>
      <Card>{item.name}</Card>
    </MotionStaggerItem>
  ))}
</MotionStaggerContainer>
```

### Interactive Cards

```tsx
import { MotionCard } from "@/components/motion/motion-card"

<MotionCard hover={true} tap={true}>
  <CardContent>
    Hover me to lift, tap to scale!
  </CardContent>
</MotionCard>
```

## 🎨 Theming

The design system supports light/dark mode automatically via CSS variables.

### Toggle Dark Mode

```tsx
import { useTheme } from "next-themes"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle theme
    </button>
  )
}
```

### Custom Colors

Add new colors to `app/globals.css`:

```css
:root {
  --custom-color: oklch(0.6 0.15 200);
}

.dark {
  --custom-color: oklch(0.7 0.12 200);
}
```

Then use in Tailwind:

```tsx
<div className="bg-[oklch(var(--custom-color))]">
  Custom color
</div>
```

## 📚 Resources

- **Demo Page**: Visit `/design-system` to see all components
- **shadcn/ui Docs**: https://ui.shadcn.com
- **Motion Docs**: https://motion.dev
- **Coolors Palette**: https://coolors.co/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8

## 🛠️ Development

### Add New Motion Component

1. Create file in `components/motion/`:
```tsx
// components/motion/motion-input.tsx
"use client"

import { motion } from "motion/react"
import { Input } from "@/components/ui/input"

export const MotionInput = motion.create(Input)
```

2. Export from `components/motion/index.ts`:
```tsx
export * from "./motion-input"
```

3. Use in your app:
```tsx
import { MotionInput } from "@/components/motion"

<MotionInput
  whileFocus={{ scale: 1.02 }}
  transition={{ type: "spring" }}
/>
```

### Add New Color

1. Update `lib/colors.ts`:
```tsx
export const colorPalette = {
  // ... existing colors
  customBlue: {
    hex: '#1234ab',
    oklch: 'oklch(0.5 0.15 250)',
    name: 'Custom Blue',
    use: 'Special highlights'
  }
}
```

2. Add to `app/globals.css` if needed for CSS variable access

3. Use in components:
```tsx
style={{ backgroundColor: colorPalette.customBlue.hex }}
```

## 🚢 Production Checklist

- [x] TypeScript paths configured (`@/*`)
- [x] Tailwind CSS with CSS variables
- [x] shadcn/ui components installed
- [x] Motion (Framer Motion) installed
- [x] Color system documented
- [x] Animation presets created
- [x] Example components built
- [x] Demo page at `/design-system`
- [x] Dark mode support
- [x] Accessibility (focus rings, contrast)

## 💡 Tips

1. **Use Motion components for public-facing pages** - They're optimized and have consistent animations
2. **Stick to the color palette** - Trust is built through consistency
3. **Test animations on slower devices** - Use `prefers-reduced-motion` media query
4. **Keep animations subtle** - 300-400ms is usually enough
5. **Use stagger for lists** - Makes content feel more dynamic

## 📝 License

This design system is part of NSMarket and follows the same license.
