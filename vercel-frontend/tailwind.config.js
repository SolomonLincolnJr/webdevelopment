/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        quantum: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49'
        },
        apex: {
          primary: '#00ff9f',
          secondary: '#00ccff',
          accent: '#ff00ff',
          dark: '#0a0e27',
          light: '#1a1f3a'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'quantum-fade': 'quantumFade 1.5s ease-in-out infinite',
        'matrix-rain': 'matrixRain 2s linear infinite'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 159, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 255, 159, 0.8), 0 0 40px rgba(0, 204, 255, 0.6)' }
        },
        quantumFade: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'quantum-mesh': 'linear-gradient(45deg, #00ff9f 25%, transparent 25%), linear-gradient(-45deg, #00ff9f 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #00ff9f 75%), linear-gradient(-45deg, transparent 75%, #00ff9f 75%)'
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
        'quantum': ['Orbitron', 'Rajdhani', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}