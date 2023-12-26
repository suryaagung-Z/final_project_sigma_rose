/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        DARKBLUE06: "rgba(32, 34, 68, 0.50)",
        DARKBLUE05: "#6148FF",
        DARKBLUE04: "#6148FF.35",
        DARKBLUE03: "#489CFF",
        DARKBLUE02: "#D0B7E6",
        DARKBLUE01: "#E2D4F0",

        LIGHTBLUE: "#EBF3FC",
        
        DARKGREY02: "#3C3C3C",
        DARKGREY01: "#232323",
        DARKGREY: "#B4BDC4",
        LIGHTGREY: "#D9D9D9",

        LIMEGREEN05: "#AA9B87",
        LIMEGREEN04: "#D4C2A8",
        LIMEGREEN03: "#FFE9CA",
        LIMEGREEN02: "#FFF0DC",
        LIMEGREEN01: "#FFF8ED",

        WARNING: "#FF0000",
        ATTENTION: "#F9CC00",
        SUCCESS: "#73CA5C",
      },
      width: {
        THREESEVEN: "380px",
      },
      margin: {
        TOP: "8px",
        RIGHT: "332px",
        left: "150px",
        right: "450px",
        LEFT: "100px",
        LEFTWR: "113px",
        LEFTWG: "60px",
        MiNLEFT: "-500px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar')({ nocompatible: true }),
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar-hide')
  ],
});
