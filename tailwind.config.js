/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#13a4ec",
        "background-light": "#f6f7f8",
        "background-dark": "#101c22",
      },
      fontFamily: {
        "display": ["Lexend"]
      },
      borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px"},
    },
  },
  plugins: [],
}