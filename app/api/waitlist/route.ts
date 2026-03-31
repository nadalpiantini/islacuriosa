import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email es requerido' },
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
  } catch {
    return NextResponse.json(
      { error: 'Error procesando tu solicitud' },
      { status: 500 }
    )
  }
}
