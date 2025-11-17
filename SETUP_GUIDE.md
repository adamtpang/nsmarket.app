# Design Stack Setup Guide

Your Next.js project is now configured with a production-ready design system!

## ✅ What's Installed

### 1. **shadcn/ui Components** (New York Style)
- All core components: button, card, input, select, dialog, badge, avatar, form, label, dropdown-menu, tabs
- CSS variables for theming
- Dark mode support via `next-themes`
- Accessible by default (Radix UI primitives)

### 2. **Motion (Framer Motion v12)**
- Installed as `motion` package
- Pre-configured animation variants
- Motion-enhanced components ready to use
- Optimized for performance

### 3. **Coolors Blue Palette**
- 9-color trust-building blue gradient
- Mapped to shadcn semantic tokens
- Available as hex, OKLCH, and CSS variables
- Documented in `lib/colors.ts`

## 📁 File Structure

```
nsmarket.app/
├── app/
│   ├── design-system/page.tsx       ← Demo page
│   └── globals.css                   ← Theme CSS variables
├── components/
│   ├── ui/                           ← shadcn/ui components
│   ├── motion/                       ← Motion components
│   │   ├── motion-card.tsx
│   │   ├── motion-button.tsx
│   │   ├── motion-badge.tsx
│   │   └── index.ts
│   ├── motion-wrapper.tsx            ← Animation utilities
│   └── example-design-system.tsx     ← Full demo component
├── lib/
│   ├── colors.ts                     ← Color palette + utils
│   └── utils.ts                      ← cn() helper
├── tailwind.config.ts                ← Tailwind config
├── DESIGN_SYSTEM.md                  ← Complete docs
└── SETUP_GUIDE.md                    ← This file
```

## 🚀 Quick Start

### 1. View the Demo

Start your dev server and visit the design system demo:

\`\`\`bash
npm run dev
\`\`\`

Then open: **http://localhost:3000/design-system**

You'll see:
- Color palette showcase
- Interactive buttons
- Animated cards with hover effects
- Staggered list animations
- Usage examples with code

### 2. Use in Your Components

#### Basic Example

\`\`\`tsx
import { MotionCard, CardHeader, CardTitle, CardContent } from "@/components/motion/motion-card"
import { MotionButton } from "@/components/motion/motion-button"

export function MyComponent() {
  return (
    <MotionCard>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          This card animates on mount and lifts on hover!
        </p>
        <MotionButton variant="default">
          Click me
        </MotionButton>
      </CardContent>
    </MotionCard>
  )
}
\`\`\`

#### Page Transition Example

\`\`\`tsx
import { MotionWrapper } from "@/components/motion-wrapper"

export default function Page() {
  return (
    <MotionWrapper variant="fadeIn">
      <h1 className="text-4xl font-bold text-foreground">
        My Page
      </h1>
      <p className="text-muted-foreground">
        Content fades in smoothly
      </p>
    </MotionWrapper>
  )
}
\`\`\`

#### List Animation Example

\`\`\`tsx
import { MotionStaggerContainer, MotionStaggerItem } from "@/components/motion-wrapper"
import { Card } from "@/components/ui/card"

const items = ['Item 1', 'Item 2', 'Item 3']

export function AnimatedList() {
  return (
    <MotionStaggerContainer>
      {items.map((item, i) => (
        <MotionStaggerItem key={i}>
          <Card className="p-4">{item}</Card>
        </MotionStaggerItem>
      ))}
    </MotionStaggerContainer>
  )
}
\`\`\`

### 3. Access Colors

\`\`\`tsx
import { colorPalette, componentColors } from '@/lib/colors'

// Method 1: Tailwind classes (recommended)
<Button className={componentColors.button.primary}>
  Click me
</Button>

// Method 2: Inline styles with hex
<div style={{ backgroundColor: colorPalette.blue.hex }}>
  Blue background
</div>

// Method 3: CSS variables (for dynamic theming)
<div className="bg-primary text-primary-foreground">
  Uses CSS variables (supports dark mode)
</div>
\`\`\`

## 🎨 Available Components

### shadcn/ui Base Components
- `Button` - 5 variants (default, secondary, outline, ghost, destructive)
- `Card` - Container with header/content/footer
- `Input` - Form input with validation styles
- `Select` - Dropdown selection
- `Dialog` - Modal dialog
- `Badge` - Status indicators
- `Avatar` - Profile images
- `Dropdown Menu` - Context menus
- `Tabs` - Tabbed navigation
- `Label` - Form labels

### Motion-Enhanced Components
- `MotionCard` - Animated card with hover lift
- `MotionButton` - Button with spring animation
- `MotionBadge` - Badge with scale-in animation
- `MotionWrapper` - Generic animation wrapper
- `MotionStaggerContainer` - Container for list animations
- `MotionStaggerItem` - Individual list item

### Animation Utilities
- `animationVariants` - Pre-configured animation presets
- `MotionInteractive` - Hover/tap scale effects
- `MotionDiv/Button/Span/etc` - Raw motion elements

## 🎭 Animation Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `fadeIn` | Fade + slide up | Page content, sections |
| `scaleIn` | Scale with spring | Modals, cards |
| `slideInFromLeft` | Slide from left | Sidebars, navigation |
| `slideInFromRight` | Slide from right | Panels, details |
| `staggerContainer` | Stagger children | Lists, grids |
| `staggerItem` | Individual item | List items |

## 🌗 Dark Mode

Dark mode is automatically supported via CSS variables. Toggle with:

\`\`\`tsx
import { useTheme } from "next-themes"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  )
}
\`\`\`

## 📖 Documentation

- **Full Design System Docs**: See `DESIGN_SYSTEM.md`
- **Color Palette**: See `lib/colors.ts`
- **Example Components**: See `components/example-design-system.tsx`
- **Demo Page**: Visit `/design-system`

## 🔧 Customization

### Add New Animation Variant

Edit `components/motion-wrapper.tsx`:

\`\`\`tsx
export const animationVariants = {
  // ... existing variants
  myCustomAnimation: {
    initial: { opacity: 0, rotate: -45 },
    animate: {
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 300 }
    }
  }
}
\`\`\`

Use it:

\`\`\`tsx
<MotionWrapper variant="myCustomAnimation">
  <YourComponent />
</MotionWrapper>
\`\`\`

### Add New Color

Edit `lib/colors.ts`:

\`\`\`tsx
export const colorPalette = {
  // ... existing colors
  customGreen: {
    hex: '#10b981',
    oklch: 'oklch(0.7 0.15 160)',
    name: 'Success Green',
    use: 'Success states'
  }
}
\`\`\`

Use it:

\`\`\`tsx
<div style={{ backgroundColor: colorPalette.customGreen.hex }}>
  Success!
</div>
\`\`\`

### Create New Motion Component

\`\`\`tsx
// components/motion/motion-input.tsx
"use client"

import { motion } from "motion/react"
import { Input } from "@/components/ui/input"

export const MotionInput = motion.create(Input)
\`\`\`

Export from `components/motion/index.ts` and use:

\`\`\`tsx
import { MotionInput } from "@/components/motion"

<MotionInput
  whileFocus={{ scale: 1.02 }}
  transition={{ type: "spring" }}
/>
\`\`\`

## 🧪 Testing

Check if everything works:

1. **View demo page**: http://localhost:3000/design-system
2. **Test animations**: Hover cards, click buttons
3. **Check dark mode**: Toggle theme
4. **Verify colors**: All blues should be visible
5. **Test responsive**: Resize window

## 🚢 Production Build

Before deploying:

\`\`\`bash
# Build the project
npm run build

# Test production build locally
npm start
\`\`\`

Visit http://localhost:3000/design-system to verify animations work in production mode.

## 🎯 Next Steps

1. ✅ **View the demo** at `/design-system`
2. ✅ **Read** `DESIGN_SYSTEM.md` for detailed API docs
3. ✅ **Start building** with motion components
4. ✅ **Customize** colors and animations as needed
5. ✅ **Test** on different devices and themes

## 🆘 Troubleshooting

### "Module not found: motion/react"

Motion was installed with `--legacy-peer-deps`. If you see errors:

\`\`\`bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
\`\`\`

### Animations not working

Make sure you're using `"use client"` at the top of components using Motion:

\`\`\`tsx
"use client"

import { MotionCard } from "@/components/motion/motion-card"
// ... rest of component
\`\`\`

### Colors not applying

Verify Tailwind is compiling correctly:

\`\`\`bash
# Check tailwind.config.ts exists
ls tailwind.config.ts

# Restart dev server
npm run dev
\`\`\`

### TypeScript errors

Make sure imports use `@/` aliases:

\`\`\`tsx
// ✅ Correct
import { Button } from "@/components/ui/button"

// ❌ Wrong
import { Button } from "../../components/ui/button"
\`\`\`

## 📚 Resources

- **shadcn/ui**: https://ui.shadcn.com
- **Motion**: https://motion.dev
- **Coolors**: https://coolors.co/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8
- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**You're all set!** 🎉 Start building beautiful, animated components with your new design system.
