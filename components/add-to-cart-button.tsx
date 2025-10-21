"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddToCartButtonProps {
  listingId: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

export function AddToCartButton({ listingId, variant = "default", size = "default" }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    // Mock add to cart functionality
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button variant={variant} size={size} onClick={handleAddToCart} disabled={added}>
      {added ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
