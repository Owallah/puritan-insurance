import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f2f8",
          100: "#d9dff0",
          200: "#b3bfe1",
          300: "#8d9fd2",
          400: "#677fc3",
          500: "#4160b4",
          600: "#2a4a9a",
          700: "#1a3580",
          800: "#0f2166",
          900: "#0a1849",
          950: "#060f2e",
        },
        gold: {
          50: "#fdf9ed",
          100: "#faf0d0",
          200: "#f5e0a0",
          300: "#efd070",
          400: "#e9bf40",
          500: "#e6c367",
          600: "#d4a832",
          700: "#b08928",
          800: "#8c6b1e",
          900: "#684d14",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "poppins", "sans-serif"],
        display: ["var(--font-dm-sans)", "poppins"],
        // display: ["var(--font-playfair)", "poppins"],
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(ellipse at 20% 50%, rgba(230,195,103,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(10,24,73,0.6) 0%, transparent 60%)",
        "gold-gradient": "linear-gradient(135deg, #e6c367 0%, #d4a832 100%)",
        "navy-gradient": "linear-gradient(135deg, #0a1849 0%, #1a3580 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "navy-sm": "0 2px 8px rgba(10,24,73,0.12)",
        "navy-md": "0 4px 16px rgba(10,24,73,0.16)",
        "navy-lg": "0 8px 32px rgba(10,24,73,0.20)",
        "gold-glow": "0 0 20px rgba(230,195,103,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
