/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08090B',
          900: '#0D0F13',
          850: '#12151A',
          800: '#181C22',
          700: '#232833',
          600: '#333A48',
          500: '#4A5262',
        },
        haze: {
          100: '#F5F7FA',
          300: '#C7CDD8',
          500: '#8B93A3',
        },
        signal: {
          DEFAULT: '#00D9C0',
          soft: '#00D9C033',
          dim: '#0AA894',
        },
        ember: {
          DEFAULT: '#F2B84B',
          soft: '#F2B84B26',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        panel: '0 8px 30px rgba(0,0,0,0.35)',
        glow: '0 0 24px rgba(0,217,192,0.35)',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        wave: 'wave 1s ease-in-out infinite',
        pulseRing: 'pulseRing 1.8s cubic-bezier(0.4,0,0.6,1) infinite',
        fadeUp: 'fadeUp 0.25s ease-out',
      },
    },
  },
  plugins: [],
};
