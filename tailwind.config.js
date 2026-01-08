/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: { 
       boxShadow: {
        'sparkle': '0 0 8px 2px rgba(2, 232, 171, 1)', // Example shadow
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        bellota: ["Bellota", "san-serif"],
        exmouth: ["Exmouth", "san-serif"],
        romantic: ["Romantic", "cursive"],
        wave: ["Wave", "cursive"],
        coolvetica: ["Coolvetica", "helvetica"],
      },},
  },
  plugins: [],
}
