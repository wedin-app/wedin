import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "3xl": "2000px",
      },
    },
    extend: {
      colors: {
        primary: {
          100: "#E0E0E0",
          300: "#4A4A4A",
          400: "#2E2E2E",
          700: "#343434",
        },
        secondary: {
          100: "#E7E7E7",
          400: "#71717A",
          500: "#595959",
        },
        gray: {
          100: "#F3F4F6",
          200: "#C3C3C3",
          300: "#71717A",
          500: "#E0E0E0",
          600: "#F4F4F5",
        },
        text: {
          primary: "#11181C",
          secondary: "#09090B",
          tertiary: "#696969",
        },
        border: {
          default: "#E4E4E7",
          secondary: "#DBDBDB",
        },
        background: {
          primary: "#444444",
          secondary: "#E7E7E7",
          tertiary: "#435E41",
        },
        error: "#D32F2F",
        success: "#388E3C",
        info: "#1976D2",
        warning: "#FBC02D",
      },
      width: {
        "128": "32rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
export default config;
