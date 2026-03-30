'use client'

import { useState, FormEvent } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Te anotamos. Pronto sabras de nosotros.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Algo salio mal. Intenta de nuevo.')
      }
    } catch {
      setStatus('error')
      setMessage('Error de conexion. Intenta de nuevo.')
    }
  }

  if (status === 'success') {
    return (
      <div className="w-full max-w-md mx-auto text-center py-6 px-4">
        <div className="text-4xl mb-3">🏝️</div>
        <p className="text-lg font-semibold text-stone-800">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="Tu correo electronico"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
          className="flex-1 px-5 py-4 rounded-xl border-2 border-stone-200 bg-white text-stone-800 text-lg placeholder:text-stone-400 focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/30 transition-all"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-4 rounded-xl bg-coral text-white text-lg font-bold hover:bg-coral-dark active:scale-[0.97] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-coral/25"
        >
          {status === 'loading' ? 'Enviando...' : 'Quiero entrar'}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-3 text-red-500 text-sm text-center">{message}</p>
      )}
      <p className="mt-4 text-stone-400 text-sm text-center">
        Sin spam. Solo novedades de la isla.
      </p>
    </form>
  )
}
