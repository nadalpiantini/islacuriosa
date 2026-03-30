import Image from 'next/image'
import WaitlistForm from '../components/WaitlistForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-amber-50/30 to-teal-50">
      {/* Hero */}
      <section className="relative px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <Image
            src="/logo.png"
            alt="Isla Curiosa"
            width={400}
            height={300}
            className="mx-auto mb-8"
            priority
          />
          <p className="text-xl sm:text-2xl text-teal-700 font-medium mb-10">
            Aprender puede ser una aventura.
          </p>

          {/* Carta de induccion */}
          <div className="max-w-lg mx-auto mb-12 space-y-4 text-center">
            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed">
              Acompaña a Fuzzy el solenodonte y sus amigos
              en una isla llena de juegos que enseñan
              y se adaptan al ritmo de cada niño.
            </p>
            <p className="text-lg text-stone-700 font-medium">
              Pronto podrás explorarla.<br />
              Deja tu correo y sé de los primeros en llegar.
            </p>
          </div>

          {/* Waitlist Form */}
          <WaitlistForm />
        </div>
      </section>

      {/* Features preview */}
      <section className="px-6 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 text-center mb-12">
            Que van a encontrar en la isla
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <FeatureCard icon="🎬" title="Episodios animados" />
            <FeatureCard icon="🎮" title="Juegos educativos" />
            <FeatureCard icon="🗺️" title="Isla por explorar" />
            <FeatureCard icon="🧠" title="Tutor inteligente" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 text-center">
        <p className="text-stone-400 text-sm">
          Isla Curiosa &mdash; Hecho con amor en Republica Dominicana
        </p>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/60 border border-stone-100 shadow-sm">
      <span className="text-3xl mb-2">{icon}</span>
      <span className="text-sm font-semibold text-stone-700">{title}</span>
    </div>
  )
}
