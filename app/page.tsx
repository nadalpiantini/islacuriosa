import Image from 'next/image'
import WaitlistForm from '../components/WaitlistForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-sky-100 flex flex-col items-center justify-center px-6 py-12">
      <Image
        src="/hero.png"
        alt="Fuzzy y la Isla Curiosa"
        width={800}
        height={600}
        className="mx-auto"
        priority
      />

      <p className="text-lg sm:text-xl text-slate-700 text-center mt-8 mb-2 max-w-md leading-relaxed">
        Acompaña a Fuzzy en una isla llena de juegos que enseñan.
      </p>
      <p className="text-base text-slate-500 text-center mb-10">
        Pronto podrás explorarla. Deja tu correo y sé de los primeros.
      </p>

      <WaitlistForm />

      <footer className="mt-16 text-center text-slate-400 text-sm">
        hola@islacuriosa.com
      </footer>
    </main>
  )
}
