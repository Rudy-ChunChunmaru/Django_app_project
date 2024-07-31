/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
    variants: {
      extend: {},
    },
    screens: {
      xs: "480px",
      sm: "720px",
      md: "1080px",
      xl: "1440px",
    },
  },
  plugins: [],
};
