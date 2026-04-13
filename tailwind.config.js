/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        evolvian: {
          primary: "#a3d9b1",
          secondary: "#4a90e2",
          accent: "#f5a623",
          light: "#ededed",
          dark: "#274472",
        },
      },
      fontFamily: {
        sans: ["Manrope", "Segoe UI", "sans-serif"],
        display: ["Space Grotesk", "Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
