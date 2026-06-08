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
          "50%": { transform: "translate3d(4%, 5%, 0) scale(1.12)" },
        },
        blink: {
          "0%, 45%": { opacity: "1" },
          "46%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "gradient-drift": "gradient-drift 34s ease-in-out infinite",
        blink: "blink 1.05s steps(1, end) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
