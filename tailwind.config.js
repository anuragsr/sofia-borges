/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,pug,js}"],
  theme: {
    extend: {
      gridTemplateRows: {
        9: "repeat(9, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
