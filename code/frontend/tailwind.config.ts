import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#E1DEC5",
        light: "#E1DEC5",
        darkBrown: "#60452E", 
        lightBrown: "rgba(96, 69, 46, 0.5",
        darkBlue: "rgba(9, 40, 34)",
        lightBlue: "rgba(9, 40, 34, 0.8)",
        darkRed: "rgba(227, 34, 34)",
        lightRed: "rgba(227, 34, 34, 0.5)",
        yellow: "#AFBD18",
      },
    },
  },
  plugins: [],
} satisfies Config;
