/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        flicker: "flicker 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
