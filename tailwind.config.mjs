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
      backgroundImage: {
        'parchment-texture': "url('/images/parchment-texture.svg')",
      },
    },
  },
  plugins: [],
};
