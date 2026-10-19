/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          saffron: '#FF7A00',
          gold: '#FFB800',
          maroon: '#800020',
          dark: '#1C1917',
          light: '#FFFBF5',
          cream: '#FEF3C7',
          teal: '#0D9488'
        }
      }
    },
  },
  plugins: [],
}
