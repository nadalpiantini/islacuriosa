/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
]

const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  async headers() {
    return [
      // Site-wide security headers (the / page's same-origin iframe still works with SAMEORIGIN)
      { source: '/:path*', headers: securityHeaders },
      // Immutable long-cache for static media — big data win on RD mobile revisits
      {
        source: '/:all*(png|jpg|jpeg|webp|gif|svg|mp4|webm|mp3|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
