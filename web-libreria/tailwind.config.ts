import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#29D0D1",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1E3A5F",
          foreground: "#ffffff",
        },
        tertiary: {
          DEFAULT: "#F8FAFC",
          foreground: "#ffffff",
        },
        neutral: {
          DEFAULT: "#475569",
          foreground: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};

export default config;
