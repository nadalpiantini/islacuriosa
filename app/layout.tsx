import '../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
