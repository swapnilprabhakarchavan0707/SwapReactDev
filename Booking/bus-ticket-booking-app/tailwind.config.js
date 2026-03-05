/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This makes 'font-sans', 'font-serif', and default text all use Times
        sans: ["Times New Roman", "Times", "serif"],
        serif: ["Times New Roman", "Times", "serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}