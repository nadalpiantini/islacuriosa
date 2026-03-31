/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#3B82F6',
        },
        cta: {
          DEFAULT: '#F97316',
          dark: '#EA580C',
          light: '#FB923C',
        },
        secondary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#60A5FA',
        },
        background: '#F8FAFC',
        text: {
          DEFAULT: '#1E293B',
          light: '#64748B',
          lighter: '#94A3B8',
        },
        coral: {
          DEFAULT: '#F97316',
          dark: '#EA580C',
          light: '#FB923C',
        },
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
        },
      },
      fontFamily: {
        heading: ['var(--font-baloo)', 'Baloo 2', 'cursive'],
        body: ['var(--font-comic)', 'Comic Neue', 'cursive'],
      },
      borderRadius: {
        'clay': '16px',
        'clay-lg': '24px',
      },
      borderWidth: {
        'clay': '3px',
        'clay-lg': '4px',
      },
      boxShadow: {
        'clay': '6px 6px 12px rgba(0,0,0,0.12), -6px -6px 12px rgba(255,255,255,0.8)',
        'clay-sm': '4px 4px 8px rgba(0,0,0,0.10), -4px -4px 8px rgba(255,255,255,0.7)',
        'clay-lg': '8px 8px 16px rgba(0,0,0,0.14), -8px -8px 16px rgba(255,255,255,0.9)',
        'clay-inner': 'inset 4px 4px 8px rgba(0,0,0,0.08), inset -4px -4px 8px rgba(255,255,255,0.6)',
        'clay-accent': '6px 6px 12px rgba(37,99,235,0.15), -6px -6px 12px rgba(255,255,255,0.8)',
        'clay-cta': '6px 6px 14px rgba(249,115,22,0.25), -4px -4px 10px rgba(255,255,255,0.8)',
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
      },
      transitionDuration: {
        'clay': '200ms',
      },
    },
  },
  plugins: [],
}
