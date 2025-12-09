import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY')
      return NextResponse.json({ error: 'Internal server configuration error' }, { status: 500 })
    }

    // Initialize clients at runtime, not build time
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia'
    })

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const body = await request.json()
    const {
      companyName,
      websiteUrl,
      contactEmail,
      logoUrl,
      slotSize,
      pixelsWidth,
      pixelsHeight,
      amountCents
    } = body

    // Validation
    if (!companyName || !websiteUrl || !contactEmail || !logoUrl || !slotSize) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `NSMarket Sponsor - ${slotSize.charAt(0).toUpperCase() + slotSize.slice(1)} Slot`,
              description: `${pixelsWidth}×${pixelsHeight}px sponsor slot on NSMarket`,
              images: [logoUrl],
            },
            unit_amount: amountCents,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/sponsor/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/sponsor?cancelled=true`,
      customer_email: contactEmail,
      metadata: {
        companyName,
        websiteUrl,
        logoUrl,
        slotSize,
        pixelsWidth: pixelsWidth.toString(),
        pixelsHeight: pixelsHeight.toString(),
      },
    })

    // Store pending sponsor record
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + 1) // 1 month from now

    const { error: dbError } = await supabase
      .from('sponsors')
      .insert({
        company_name: companyName,
        website_url: websiteUrl,
        contact_email: contactEmail,
        logo_url: logoUrl,
        slot_size: slotSize,
        pixels_width: pixelsWidth,
        pixels_height: pixelsHeight,
        amount_paid_cents: amountCents,
        stripe_payment_intent_id: session.id,
        stripe_customer_id: session.customer as string || null,
        status: 'pending',
        starts_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Failed to save sponsor record' }, { status: 500 })
    }

    return NextResponse.json({ checkoutUrl: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
