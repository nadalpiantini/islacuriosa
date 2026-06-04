import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
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
