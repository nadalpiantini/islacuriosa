import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Isla Curiosa
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover the mysteries of our island paradise
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors">
            Explore Now
          </button>
        </div>
      </div>
    </main>
  )
}