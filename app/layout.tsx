import '../styles/globals.css'
import { Baloo_2, Comic_Neue } from 'next/font/google'

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-baloo',
  display: 'swap',
})

const comicNeue = Comic_Neue({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-comic',
  display: 'swap',
})

export const metadata = {
  title: 'Isla Curiosa — Educacion animada del Caribe',
  description: 'Plataforma educativa animada para ninos con personajes del Caribe. Episodios, juegos y un tutor inteligente. Hecha en Republica Dominicana.',
  openGraph: {
    title: 'Isla Curiosa — La aventura educativa que tus hijos merecen',
    description: 'Episodios animados, juegos educativos y un tutor inteligente con personajes del Caribe. Unete a la lista de espera.',
    url: 'https://islacuriosa.com',
    siteName: 'Isla Curiosa',
    locale: 'es_DO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Isla Curiosa — Educacion animada del Caribe',
    description: 'Plataforma educativa para ninos con personajes del Caribe. Hecha en RD.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${baloo2.variable} ${comicNeue.variable}`}>
      <body className="font-body min-h-screen">
        {children}
      </body>
    </html>
  )
}
