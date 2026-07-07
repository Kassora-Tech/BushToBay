import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        bush: {
          50: "#f0f9f2",
          100: "#dbf0e0",
          200: "#bae0c5",
          300: "#8cc9a1",
          400: "#5aab77",
          500: "#388e59",
          600: "#277245",
          700: "#1f5b39",
          800: "#1b492f",
          900: "#173c28",
          950: "#0b2116",
        },
        bay: {
          50: "#effaff",
          100: "#def3ff",
          200: "#b6eaff",
          300: "#75dbff",
          400: "#2cc9ff",
          500: "#00b1f1",
          600: "#008ecf",
          700: "#0071a7",
          800: "#065f8a",
          900: "#0b4f72",
          950: "#07324c",
        },
        sand: {
          50: "#faf8f3",
          100: "#f3efe4",
          200: "#e6dcc8",
          300: "#d5c4a3",
          400: "#c3a87d",
          500: "#b69263",
          600: "#a97f57",
          700: "#8d674a",
          800: "#735440",
          900: "#5e4636",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "spin-slow": "spin 12s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
