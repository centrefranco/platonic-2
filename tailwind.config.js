/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/components/universal/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-delay-50': 'fadeIn 0.5s ease-out forwards 0.05s',
        'fade-in-delay-100': 'fadeIn 0.5s ease-out forwards 0.1s',
        'fade-in-delay-200': 'fadeIn 0.5s ease-out forwards 0.2s',
        'fade-in-delay-300': 'fadeIn 0.5s ease-out forwards 0.3s',
        'fade-in-delay-400': 'fadeIn 0.5s ease-out forwards 0.4s',
        'fade-in-delay-500': 'fadeIn 0.5s ease-out forwards 0.5s',
        'fade-in-delay-700': 'fadeIn 0.5s ease-out forwards 0.7s',
        'fade-in-delay-800': 'fadeIn 0.5s ease-out forwards 0.8s',
      },
    },
  },
  plugins: [],
}
