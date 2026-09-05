import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f8ef",
          100: "#e1eedb",
          200: "#c4ddb9",
          300: "#9ec58d",
          400: "#75aa61",
          500: "#4e8e3c", // compliant WCAG AA contrast
          600: "#3d732f",
          700: "#325c27",
          800: "#2a4a22",
          900: "#233e1d",
          950: "#0f220c",
        },
        saffron: {
          50: "#fdf8f4",
          100: "#faeee5",
          200: "#f4dac9",
          300: "#ecc0a4",
          400: "#e09f73",
          500: "#d97736",
          600: "#cb5f29",
          700: "#a94924",
          800: "#873c23",
          900: "#6e3320",
        },
        cream: {
          50: "#fdfbf7",
          100: "#f8f5ee",
          200: "#f0ebd9",
          300: "#e4dcbe",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      }
    },
  },
  plugins: [],
};

export default config;
