import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Best-effort in-memory rate limit (per warm serverless instance). Caps burst
// abuse from a single client cheaply + dependency-free. The robust layer is a
// Vercel WAF / Firewall rate-limit rule (configure in the dashboard).
const RL_MAX = 5 // requests
const RL_WINDOW_MS = 60_000 // per minute
const rlHits = new Map<string, number[]>()
function rateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (rlHits.get(ip) || []).filter((t) => now - t < RL_WINDOW_MS)
  hits.push(now)
  rlHits.set(ip, hits)
  if (rlHits.size > 5000) rlHits.clear() // crude memory guard
  return hits.length > RL_MAX
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Demasiados intentos, espera un momento' },
        { status: 429 }
      )
    }

    const { email, company } = await request.json()

    // Honeypot: humans never fill the hidden "company" field; bots do.
    // Pretend success without storing anything.
    if (typeof company === 'string' && company.trim() !== '') {
      return NextResponse.json({ message: 'Te anotamos!', ok: true })
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      )
    }

    // Length cap (RFC 5321 max = 254) — blocks storage-bloat abuse.
    if (email.length > 254) {
      return NextResponse.json(
        { error: 'Email no valido' },
        { status: 400 }
      )
    }

    const cleaned = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(cleaned)) {
      return NextResponse.json(
        { error: 'Email no valido' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !supabaseKey) {
      console.error('[WAITLIST] Missing Supabase env vars')
      return NextResponse.json(
        { error: 'Error del servidor' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase
      .from('waitlist')
      .insert({ email: cleaned, referral_source: 'islacuriosa' })

    if (error) {
      // Duplicate email — treat as success
      if (error.code === '23505') {
        return NextResponse.json({
          message: 'Ya estás en la lista! Pronto sabrás de nosotros.',
          ok: true,
        })
      }
      console.error('[WAITLIST] Supabase error:', error)
      return NextResponse.json(
        { error: 'Error guardando tu email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Te anotamos! Pronto sabrás de nosotros.',
      ok: true,
    })
  } catch (err) {
    console.error('[WAITLIST] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Error procesando tu solicitud' },
      { status: 500 }
    )
  }
}
