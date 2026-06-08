import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#071525",
        mist: "#f6e7e9",
        electric: "#2437ff",
        "electric-soft": "#8fb5ff",
        night: "#030a1d",
        bone: "#fff5e8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
      },
      keyframes: {
        "gradient-drift": {
          "0%, 100%": { transform: "translate3d(-5%, -3%, 0) scale(1)" },
          "33%": { transform: "translate3d(3%, 5%, 0) scale(1.1)" },
          "66%": { transform: "translate3d(5%, -2%, 0) scale(1.05)" },
        },
        blink: {
          "0%, 45%": { opacity: "1" },
          "46%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "gradient-drift": "gradient-drift 52s ease-in-out infinite",
        blink: "blink 1s steps(1, end) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
