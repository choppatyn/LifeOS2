/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0808',
          surface: '#141010',
          card: '#1a1515',
          border: '#2a2323',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8d08a',
          dark: '#a8883a',
        },
        text: {
          primary: '#e8e0d8',
          muted: '#7a6e62',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
