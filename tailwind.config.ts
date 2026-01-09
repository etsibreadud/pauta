import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0a0a0f",
          800: "#11111a",
          700: "#1a1a26"
        },
        cloud: "#f7f8fb",
        mint: "#79f2c0",
        blush: "#fddbd0"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 40px -24px rgba(10, 10, 15, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
