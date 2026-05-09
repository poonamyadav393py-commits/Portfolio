/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E0D4F6', // Soft light purple for headings
        accent: '#B388FF', // Vibrant neon-ish purple
        bg: '#0D0B14', // Very dark, almost black purple
        text: '#C8BCE2', // Light purple-tinted gray for body
        muted: '#807599', // Muted purple-grey
        surface: '#1A1625', // Slightly lighter dark purple for cards
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
        '120': '30rem',
      },
    },
  },
  plugins: [],
}
