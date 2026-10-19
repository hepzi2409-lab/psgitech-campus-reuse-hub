/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: '#06101F',
        deepnavy: '#0C1B2E',
        secondaryblue: '#102B46',
        electriccyan: '#35C8FF',
        iceblue: '#7CEAFF',
        neonmint: '#50EAB2',
        primarytext: '#EAF7FF',
        secondarytext: '#91B3CA'
      }
    }
  },
  plugins: []
};
