import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    // Initialize client at runtime, not build time
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { sponsorId } = await request.json()

    if (!sponsorId) {
      return NextResponse.json({ error: 'Missing sponsorId' }, { status: 400 })
    }

    // Increment click counter
    await supabase.rpc('increment_sponsor_clicks', { sponsor_id: sponsorId })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to track click:', error)
    return NextResponse.json({ error: 'Failed to track click' }, { status: 500 })
  }
}
