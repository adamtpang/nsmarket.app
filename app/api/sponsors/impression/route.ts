import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    // Initialize client at runtime, not build time
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { sponsorIds } = await request.json()

    if (!sponsorIds || !Array.isArray(sponsorIds)) {
      return NextResponse.json({ error: 'Missing sponsorIds array' }, { status: 400 })
    }

    // Increment impressions for all sponsors
    await Promise.all(
      sponsorIds.map((id: string) =>
        supabase.rpc('increment_sponsor_impressions', { sponsor_id: id })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to track impressions:', error)
    return NextResponse.json({ error: 'Failed to track impressions' }, { status: 500 })
  }
}
