/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
colors: {
  dark: {
    bg: '#0d0b12',
    surface: '#14121a',
    card: '#14121a',
    border: '#23202a',
  },
  gold: { DEFAULT: '#c9a84c', light: '#e8d08a' },
},
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
