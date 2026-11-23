import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cosmic: {
          950: "#040612",
          900: "#090d24",
          850: "#0d1335",
          800: "#131b47",
          700: "#1c2666",
          600: "#2a378f",
        },
        celestial: {
          dark: "#0b041c",
          purple: "#1b0b3d",
          plum: "#2d1264",
          violet: "#6b21a8",
          neon: "#a855f7",
          light: "#d8b4fe",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          accent: "#d4af37",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cosmic-glow": "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, rgba(212, 175, 55, 0.08) 35%, transparent 70%)",
        "gold-shimmer": "linear-gradient(135deg, #fcd34d 0%, #d4af37 50%, #b45309 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 90s linear infinite",
        "spin-reverse-slow": "spin 120s linear infinite reverse",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
