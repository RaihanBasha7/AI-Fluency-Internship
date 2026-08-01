/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#050507',
          900: '#0a0a0f',
          850: '#0e0e14',
          800: '#121218',
          700: '#1a1a22',
          600: '#24242e',
          500: '#34343f',
        },
        accent: {
          blue: '#5b8cff',
          cyan: '#4fd1e0',
          violet: '#8b7cff',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'aurora-slow': 'aurora 18s ease-in-out infinite',
        'aurora-slower': 'aurora 26s ease-in-out infinite',
        'grid-pan': 'gridPan 40s linear infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        'float-slower': 'floatSlow 14s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'spin-slow': 'spin 22s linear infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.55' },
          '50%': { transform: 'translate3d(4%, -6%, 0) scale(1.15)', opacity: '0.8' },
        },
        gridPan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-18px) translateX(8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
};
