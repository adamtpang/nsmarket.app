import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    // Initialize client at runtime, not build time
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    // Fetch active sponsors, ordered by slot size (largest first for prominence)
    const { data: sponsors, error } = await supabase
      .from('sponsors')
      .select('*')
      .eq('status', 'active')
      .order('total_pixels', { ascending: false })
      .limit(5) // Max 5 sponsors at a time

    if (error) {
      console.error('Failed to fetch sponsors:', error)
      return NextResponse.json({ sponsors: [] })
    }

    return NextResponse.json({ sponsors })
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return NextResponse.json({ sponsors: [] })
  }
}
