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

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Activate the sponsor
        const { error } = await supabase
          .from('sponsors')
          .update({ status: 'active', stripe_customer_id: session.customer as string })
          .eq('stripe_payment_intent_id', session.id)

        if (error) {
          console.error('Failed to activate sponsor:', error)
        } else {
          console.log('Sponsor activated:', session.metadata?.companyName)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        // Cancel the sponsor when subscription ends
        const { error } = await supabase
          .from('sponsors')
          .update({ status: 'cancelled' })
          .eq('stripe_customer_id', subscription.customer as string)

        if (error) {
          console.error('Failed to cancel sponsor:', error)
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice

        // Extend subscription for another month
        const expiresAt = new Date()
        expiresAt.setMonth(expiresAt.getMonth() + 1)

        const { error } = await supabase
          .from('sponsors')
          .update({ expires_at: expiresAt.toISOString() })
          .eq('stripe_customer_id', invoice.customer as string)
          .eq('status', 'active')

        if (error) {
          console.error('Failed to extend sponsor expiry:', error)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook error' },
      { status: 400 }
    )
  }
}
