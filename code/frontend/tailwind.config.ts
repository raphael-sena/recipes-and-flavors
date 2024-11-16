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

      fontSize: {
        "2xs": ["0.75rem", { lineHeight: "1.25rem" }],
        xs: ["0.8125rem", { lineHeight: "1.5rem" }],
        sm: ["0.875rem", { lineHeight: "1.5rem" }],
        base: ["1rem", { lineHeight: "1.75rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },

      fontFamily: {
        mulish: ["Mulish", "sans-serif"],
      },

      fontWeight: {
        extrabold: "900",
        verybold: "800",
        bold: "700",
        normal: "400",
        light: "300",
      },
    },
  },
  plugins: [],
} satisfies Config;
