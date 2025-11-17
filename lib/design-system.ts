/**
 * Design System - Central Export
 *
 * Import everything you need from one place:
 * import { MotionCard, colorPalette, componentColors } from '@/lib/design-system'
 */

// Motion components
export * from "@/components/motion"
export * from "@/components/motion-wrapper"

// shadcn/ui components (re-export most common)
export { Button } from "@/components/ui/button"
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
export { Badge } from "@/components/ui/badge"
export { Input } from "@/components/ui/input"
export { Label } from "@/components/ui/label"
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
export { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
export { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Colors and utilities
export * from "@/lib/colors"
export { cn } from "@/lib/utils"
