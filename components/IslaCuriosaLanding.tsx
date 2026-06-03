'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * ISLA-CURIOSA-LANDING-A
 * Full-screen landing VIDEO (public/landing.mp4) on a seamless loop, with an
 * invented Disney-style music-box score that also loops forever.
 *
 * The video autoplays muted+looping (its own audio is silenced — Alan asked
 * for invented music). The music is synthesized live with the Web Audio API
 * (no audio file): a I–V–vi–IV fairy-tale progression in D major with a soft
 * pad, twinkle arpeggios, and a melody on top. Browsers block sound until the
 * user interacts, so a tasteful "tap to enter" gate starts the audio.
 */
export default function IslaCuriosaLanding() {
  const [entered, setEntered] = useState(false)
  const [muted, setMuted] = useState(false)

  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const schedulerRef = useRef<number | null>(null)
  const nextNoteTimeRef = useRef(0)
  const stepRef = useRef(0)

  // --- music data (D major fairy-tale) ---------------------------------
  // chord tones (Hz) for arpeggios + pad, one chord every 2s
  const CHORDS = [
    { pad: [293.66, 369.99, 440.0], arp: [293.66, 369.99, 440.0, 587.33] }, // D
    { pad: [220.0, 277.18, 329.63], arp: [329.63, 440.0, 554.37, 659.25] }, // A
    { pad: [246.94, 293.66, 369.99], arp: [369.99, 493.88, 587.33, 739.99] }, // Bm
    { pad: [196.0, 246.94, 293.66], arp: [392.0, 493.88, 587.33, 783.99] }, // G
  ]
  // melody: 4 notes per chord (one per beat)
  const MELODY = [
    739.99, 880.0, 739.99, 587.33, // over D
    659.25, 554.37, 440.0, 554.37, // over A
    587.33, 739.99, 587.33, 493.88, // over Bm
    493.88, 587.33, 783.99, 739.99, // over G
  ]

  const BEAT = 0.5 // seconds per beat (120 quarter feel, gentle)
  const STEPS = 32 // 16 beats × 2 (eighth-note arpeggio grid)

  function playPad(ctx: AudioContext, dest: GainNode, freqs: number[], t: number, dur: number) {
    freqs.forEach((f) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'triangle'
      o.frequency.value = f
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.05, t + 0.4)
      g.gain.linearRampToValueAtTime(0.04, t + dur - 0.3)
      g.gain.linearRampToValueAtTime(0, t + dur)
      o.connect(g).connect(dest)
      o.start(t)
      o.stop(t + dur)
    })
  }

  function playTwinkle(ctx: AudioContext, dest: GainNode, f: number, t: number, peak: number) {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = f
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(peak, t + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45)
    o.connect(g).connect(dest)
    o.start(t)
    o.stop(t + 0.5)
  }

  function playMelody(ctx: AudioContext, dest: GainNode, f: number, t: number) {
    const o = ctx.createOscillator()
    const o2 = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o2.type = 'triangle'
    o.frequency.value = f
    o2.frequency.value = f * 2.001 // shimmer octave
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.12, t + 0.04)
    g.gain.exponentialRampToValueAtTime(0.0001, t + BEAT * 1.6)
    o.connect(g)
    o2.connect(g)
    g.connect(dest)
    o.start(t); o2.start(t)
    o.stop(t + BEAT * 1.7); o2.stop(t + BEAT * 1.7)
  }

  function scheduleStep(step: number, t: number) {
    const ctx = ctxRef.current!
    const master = masterRef.current!
    const chordIdx = Math.floor(step / 8) % 4 // 8 eighth-steps per chord (2s)
    const chord = CHORDS[chordIdx]

    // pad once at the start of each chord
    if (step % 8 === 0) playPad(ctx, master, chord.pad, t, BEAT * 4)

    // twinkle arpeggio on every eighth step
    const arpNote = chord.arp[step % chord.arp.length]
    playTwinkle(ctx, master, arpNote, t, step % 2 === 0 ? 0.07 : 0.045)

    // melody on each beat (every 2 eighth-steps)
    if (step % 2 === 0) {
      const melIdx = Math.floor(step / 2) % MELODY.length
      playMelody(ctx, master, MELODY[melIdx], t)
    }
  }

  function scheduler() {
    const ctx = ctxRef.current!
    while (nextNoteTimeRef.current < ctx.currentTime + 0.2) {
      scheduleStep(stepRef.current, nextNoteTimeRef.current)
      nextNoteTimeRef.current += BEAT / 2 // eighth note
      stepRef.current = (stepRef.current + 1) % STEPS
    }
    schedulerRef.current = window.setTimeout(scheduler, 25)
  }

  function enter() {
    if (entered) return
    const Ctx = window.AudioContext || (window as any).webkitAudioContext
    const ctx = new Ctx()
    const master = ctx.createGain()
    master.gain.value = 0.0
    master.connect(ctx.destination)
    // gentle fade-in
    master.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 2.5)
    ctxRef.current = ctx
    masterRef.current = master
    nextNoteTimeRef.current = ctx.currentTime + 0.1
    stepRef.current = 0
    scheduler()
    setEntered(true)
  }

  function toggleMute() {
    const master = masterRef.current
    const ctx = ctxRef.current
    if (!master || !ctx) return
    const next = !muted
    setMuted(next)
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.linearRampToValueAtTime(next ? 0 : 0.32, ctx.currentTime + 0.4)
  }

  useEffect(() => {
    return () => {
      if (schedulerRef.current) clearTimeout(schedulerRef.current)
      ctxRef.current?.close().catch(() => {})
    }
  }, [])

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#0b1a0e]">
      {/* looping landing video — object-contain fits any viewport (mobile-first) */}
      <video
        src="/landing.mp4"
        className="absolute inset-0 h-full w-full object-contain select-none"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* soft vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)' }}
      />

      {/* tap-to-enter gate */}
      {!entered && (
        <button
          onClick={enter}
          className="absolute inset-0 z-30 flex flex-col items-center justify-end gap-2 pb-24 bg-black/35 backdrop-blur-[2px] transition-opacity duration-700"
          aria-label="Entrar a Isla Curiosa con música"
        >
          <span className="kc-pulse text-emerald-100/90 text-lg font-medium tracking-wide drop-shadow">
            toca para entrar
          </span>
          <span className="text-emerald-200/70 text-2xl">🔊</span>
        </button>
      )}

      {/* mute toggle */}
      {entered && (
        <button
          onClick={toggleMute}
          className="absolute bottom-5 right-5 z-30 h-11 w-11 rounded-full bg-black/40 backdrop-blur text-emerald-100/90 text-lg flex items-center justify-center hover:bg-black/60 transition"
          aria-label={muted ? 'Activar música' : 'Silenciar música'}
        >
          {muted ? '🔈' : '🔊'}
        </button>
      )}

      <style>{`
        @keyframes kcPulse { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
        .kc-pulse { animation: kcPulse 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .kc-pulse { animation: none; }
        }
      `}</style>
    </main>
  )
}
