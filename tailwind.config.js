/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#FF0033",
          black: "#0A0A0A",
          white: "#FFFFFF"
        }
      }
    }
  },
  plugins: []
};
