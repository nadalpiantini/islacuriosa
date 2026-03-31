import Image from 'next/image'
import WaitlistForm from '../components/WaitlistForm'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0b1a0e] flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      {/* Vignette overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Subtle color glow behind logo */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #16a34a 0%, #0ea5e9 50%, transparent 100%)' }}
      />

      <div className="relative z-20 flex flex-col items-center">
        <Image
          src="/hero-landing.png"
          alt="Fuzzy y la Isla Curiosa"
          width={800}
          height={600}
          className="mx-auto w-full max-w-2xl"
          priority
        />

        <p className="text-lg sm:text-xl text-emerald-200/90 text-center mt-6 mb-2 max-w-md leading-relaxed font-medium">
          Acompaña a Fuzzy en una isla llena de juegos que enseñan.
        </p>
        <p className="text-base text-slate-400 text-center mb-10">
          Pronto podrás explorarla. Deja tu correo y sé de los primeros.
        </p>

        <WaitlistForm />

        <footer className="mt-16 text-center text-slate-600 text-sm">
          hola@islacuriosa.com
        </footer>
      </div>
    </main>
  )
}
