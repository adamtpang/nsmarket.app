# Design System - Quick Reference

## 🚀 One-Line Imports

```tsx
// Everything from one place
import { MotionCard, MotionButton, colorPalette, cn } from '@/lib/design-system'
```

## 🎨 Colors

```tsx
import { colorPalette } from '@/lib/colors'

// Tailwind (recommended)
className="bg-primary text-primary-foreground"

// Inline styles
style={{ backgroundColor: colorPalette.blue.hex }}
```

### Color Scale
`navy` → `darkBlue` → `blue` → `oceanBlue` → `brightBlue` → `skyBlue` → `lightBlue` → `paleBlue` → `iceBlue`

## 🎭 Animations

### Fade In
```tsx
<MotionWrapper variant="fadeIn">
  <YourContent />
</MotionWrapper>
```

### Scale In
```tsx
<MotionWrapper variant="scaleIn" delay={0.2}>
  <YourContent />
</MotionWrapper>
```

### Slide In
```tsx
<MotionWrapper variant="slideInFromLeft">
  <YourContent />
</MotionWrapper>
```

### Stagger List
```tsx
<MotionStaggerContainer>
  {items.map((item, i) => (
    <MotionStaggerItem key={i}>
      <Card>{item}</Card>
    </MotionStaggerItem>
  ))}
</MotionStaggerContainer>
```

## 🧩 Components

### Animated Card
```tsx
<MotionCard hover={true} tap={true}>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</MotionCard>
```

### Animated Button
```tsx
<MotionButton variant="default" pulseOnHover>
  Click me
</MotionButton>
```

### Animated Badge
```tsx
<MotionBadge variant="default" delay={0.1}>
  New
</MotionBadge>
```

### Interactive Element
```tsx
<MotionInteractive scaleOnHover={1.05} scaleOnTap={0.95}>
  <div>Hover & click me</div>
</MotionInteractive>
```

## 📐 Layout Pattern

```tsx
"use client"

import { MotionWrapper, MotionCard } from '@/lib/design-system'

export default function MyPage() {
  return (
    <MotionWrapper variant="fadeIn">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          My Page
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <MotionCard key={i}>
              <CardHeader>
                <CardTitle>Card {i}</CardTitle>
              </CardHeader>
              <CardContent>
                Content here
              </CardContent>
            </MotionCard>
          ))}
        </div>
      </div>
    </MotionWrapper>
  )
}
```

## 🎨 Button Variants

```tsx
<MotionButton variant="default">Primary</MotionButton>
<MotionButton variant="secondary">Secondary</MotionButton>
<MotionButton variant="outline">Outline</MotionButton>
<MotionButton variant="ghost">Ghost</MotionButton>
<MotionButton variant="destructive">Delete</MotionButton>
```

## 🏷️ Badge Variants

```tsx
<MotionBadge variant="default">Default</MotionBadge>
<MotionBadge variant="secondary">Secondary</MotionBadge>
<MotionBadge variant="outline">Outline</MotionBadge>
<MotionBadge variant="destructive">Error</MotionBadge>
```

## 🌗 Dark Mode

```tsx
import { useTheme } from "next-themes"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle Theme
    </button>
  )
}
```

## 🎯 Common Patterns

### Hero Section
```tsx
<MotionWrapper variant="fadeIn" className="text-center py-20">
  <h1 className="text-5xl font-bold mb-4">Welcome</h1>
  <p className="text-xl text-muted-foreground mb-8">Subtitle</p>
  <MotionButton variant="default" pulseOnHover>
    Get Started
  </MotionButton>
</MotionWrapper>
```

### Feature Grid
```tsx
<MotionStaggerContainer>
  <div className="grid md:grid-cols-3 gap-6">
    {features.map((feature, i) => (
      <MotionStaggerItem key={i}>
        <MotionCard>
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {feature.description}
          </CardContent>
        </MotionCard>
      </MotionStaggerItem>
    ))}
  </div>
</MotionStaggerContainer>
```

### Form with Animation
```tsx
<MotionWrapper variant="scaleIn">
  <Card className="max-w-md mx-auto">
    <CardHeader>
      <CardTitle>Sign Up</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label>Email</Label>
        <Input type="email" />
      </div>
      <MotionButton variant="default" className="w-full">
        Submit
      </MotionButton>
    </CardContent>
  </Card>
</MotionWrapper>
```

## 📚 Full Docs

- **Complete Guide**: `DESIGN_SYSTEM.md`
- **Setup Instructions**: `SETUP_GUIDE.md`
- **Color Palette**: `lib/colors.ts`
- **Demo Page**: `/design-system`

## 🎨 Coolors Palette

**URL**: https://coolors.co/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8

| Color | Hex | Usage |
|-------|-----|-------|
| Navy Blue | #03045e | Text, dark elements |
| Primary Blue | #0077b6 | Buttons, links |
| Bright Blue | #00b4d8 | Accents, CTAs |
| Ice Blue | #caf0f8 | Backgrounds |

## 💡 Tips

1. Always use `"use client"` for motion components
2. Import from `@/lib/design-system` for convenience
3. Use `className` with Tailwind utilities
4. Add `delay` prop to stagger multiple animations
5. Test animations on mobile devices

---

**Need help?** Check `DESIGN_SYSTEM.md` or visit `/design-system`
