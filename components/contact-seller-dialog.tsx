"use client"

import { useState } from "react"
import { MessageCircle, Mail, Phone, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ContactSellerDialogProps {
  sellerName: string
  sellerId: string
  listingTitle: string
  listingId: string
  children: React.ReactNode
}

export function ContactSellerDialog({
  sellerName,
  sellerId,
  listingTitle,
  listingId,
  children,
}: ContactSellerDialogProps) {
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Replace with actual API call
    // For now, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Contact seller:", {
      sellerName,
      sellerId,
      listingTitle,
      listingId,
      name,
      email,
      phone,
      message,
    })

    setSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 2 seconds
    setTimeout(() => {
      setSubmitted(false)
      setMessage("")
      setName("")
      setEmail("")
      setPhone("")
    }, 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Contact {sellerName}</DialogTitle>
              <DialogDescription>
                Send a message about "{listingTitle}". The seller will receive your contact info and respond
                directly.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Your Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Hi! I'm interested in this listing. Is it still available?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Include questions about availability, condition, pickup/delivery, etc.
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center pt-2">
                Your contact information will be shared with the seller.
              </div>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="mb-2">Message Sent!</DialogTitle>
              <DialogDescription>
                {sellerName} will receive your message and contact you directly via email or phone.
              </DialogDescription>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
