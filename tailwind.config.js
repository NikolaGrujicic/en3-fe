/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: ' linear-gradient(0deg, rgba(5,0,36,1) 44%, rgba(9,121,120,1) 100%, rgba(0,212,255,1) 100%)',
      }
    },
  },
  plugins: [],
};
