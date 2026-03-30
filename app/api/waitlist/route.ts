import { NextResponse } from 'next/server'

const waitlist: Set<string> = new Set()

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

    // Log for now — hook up Supabase or Google Sheets for persistence
    console.log(`[WAITLIST] New signup: ${cleaned}`)
    waitlist.add(cleaned)

    return NextResponse.json({
      message: 'Te anotamos! Pronto sabras de nosotros.',
      ok: true,
    })
  } catch {
    return NextResponse.json(
      { error: 'Error procesando tu solicitud' },
      { status: 500 }
    )
  }
}
