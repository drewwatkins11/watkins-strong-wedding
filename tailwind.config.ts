/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["light", "dark", "autumn"],
  },
  theme: {
    textShadow: {
      sm: "1px 1px 2px var(--tw-shadow-color)",
      DEFAULT: "2px 2px 4px var(--tw-shadow-color)",
      lg: "4px 4px 8px var(--tw-shadow-color)",
      xl: "4px 4px 16px var(--tw-shadow-color)",
    },
    extend: {
      fontSize: {
        mobFix: "130px",
        bigFix: "150px",
      },
      fontFamily: {
        bambi: ["var(--font-bambi)"],
        rabbit: ["var(--font-rabbit)"],
        oyster: ["var(--font-oyster)"],
        montserrat: ["var(--font-montserrat)"],
      },
      colors: {
        white: "#fff",
        snow: "#EBEBEB",
        latte: "#F5F0E0",
        parchment: "#F1E9D2",
        wheat: "#f1dca7",
        peach: "#D9AE94",
        sage: "#9B9B7A",
        darkGreen: "#3a5a40",
        deepGreen: "#1b4332",
        burntOrange: "#a44200",
        ember: "#8f250c",
        wine: "#562D36",
        "transparent-15": "rgba(0,0,0,.15)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwind-fontawesome")({
      version: 6,
    }),
    // @ts-ignore
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
export default config;
