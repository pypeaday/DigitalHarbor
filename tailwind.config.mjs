/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Ocean/Harbor theme
        navy: {
          900: '#0A1628',
          800: '#0F2137',
          700: '#1E3A5F',
          600: '#2D5A87',
        },
        seafoam: {
          500: '#4A9B8E',
          400: '#5CB8A9',
          300: '#7DD3C4',
        },
        coral: {
          500: '#E07856',
          400: '#E8927A',
          300: '#F0AC9E',
        },
        sand: {
          100: '#F4E8D0',
          200: '#E8D9BC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'wave': 'wave 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(-25px) translateY(10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
