/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      animation: {
        'fade-up': 'fade-in-bottom 0.6s cubic-bezier(0.33, 1, 0.68, 1) both',
        'fade-up-200': 'fade-in-bottom 0.6s cubic-bezier(0.33, 1, 0.68, 1) 200ms both',
        'fade-up-400': 'fade-in-bottom 0.6s cubic-bezier(0.33, 1, 0.68, 1) 400ms both',
        'fade-up-600': 'fade-in-bottom 0.6s cubic-bezier(0.33, 1, 0.68, 1) 600ms both',
        'fade-up-800': 'fade-in-bottom 0.6s cubic-bezier(0.33, 1, 0.68, 1) 800ms both',
      },
      keyframes: {
        'fade-in-bottom': {
          '0%': {
            opacity: '0',
            transform: 'translateY(35px)',
            filter: 'blur(12px)',
            visibility: 'visible',
          },
          '30%': {
            opacity: '0.5',
            transform: 'translateY(15px)',
            filter: 'blur(6px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
            filter: 'blur(0)',
            visibility: 'visible',
          },
        },
      },
      animationDelay: {
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 