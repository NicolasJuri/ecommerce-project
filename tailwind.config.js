/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollBehavior: ['smooth'],
      screens: {
        'xs': '430px',
      },
      colors: {
        'verde': '#17371F',
        'dorado': '#EBC688',
        'beige': '#F4F1E8',
        'verde-pastel': '#D0E1BE',
        'rojo-tierra': '#BE462A'
      },
      fontFamily: {
        figtree: ["Figtree", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
      fontWeight: {
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 57%)',
      }
      
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
