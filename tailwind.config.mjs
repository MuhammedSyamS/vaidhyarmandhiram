/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4332',
          dark: '#081C15',
        },
        accent: {
          gold: '#B8860B',
        },
        background: {
          parchment: '#FAF6EF',
          cream: '#F0E8D8',
        },
        earth: '#8B5E3C',
        text: {
          DEFAULT: '#2C2C2C',
          muted: '#6B6B6B',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Source Sans 3"', 'sans-serif'],
        malayalam: ['"Noto Serif Malayalam"', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .8 },
        }
      },
      backgroundImage: {
        'parchment-texture': "url('https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/parchment-texture.svg')",
      },
    },
  },
  plugins: [],
};
