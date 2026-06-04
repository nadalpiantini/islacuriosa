import '../styles/globals.css'

export const viewport = {
  themeColor: '#3f7d52',
}

export const metadata = {
  manifest: '/manifest.json',
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
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
