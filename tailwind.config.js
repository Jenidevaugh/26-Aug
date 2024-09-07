/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        bodyFont: ["DM Sans", "sans-serif"],
        titleFont: ["Poppins", "sans-serif"],
      },
      colors: {
        primeColor: "#262626",
        lightText: "#6D6D6D",
        black: "#262626",
        ash: "#879",
        blue:"#0e76fd",
        RoyalBlue: "#9ad2ce",
        CornflowerBlue: "#6495ED",
        deepb:"#14067c",
        DarkSlateBlue: "#483D8B",
        reddy:"#ff0202",
        cornsilk:"#fff8dc",
        gradienMix1: "linear-gradient(from-red-500 to-green-200)",
      },
      boxShadow: {
        testShadow: "0px 0px 54px -13px rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
