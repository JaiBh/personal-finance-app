import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        500: "40px",
        400: "32px",
        300: "24px",
        250: "20px",
        200: "16px",
        150: "12px",
        100: "8px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        beige: {
          500: "hsl(var(--clr-beige-500))",
          100: "hsl(var(--clr-beige-100))",
        },
        grey: {
          900: "hsl(var(--clr-grey-900))",
          500: "hsl(var(--clr-grey-500))",
          300: "hsl(var(--clr-grey-300))",
          100: "hsl(var(--clr-grey-100))",
        },
        other: {
          pink: "hsl(var(--clr-pink))",
          turquoise: "hsl(var(--clr-turquoise))",
          brown: "hsl(var(--clr-brown))",
          magenta: "hsl(var(--clr-magenta))",
          blue: "hsl(var(--clr-blue))",
          grey: "hsl(var(--clr-grey))",
          army: "hsl(var(--clr-army))",
          gold: "hsl(var(--clr-gold))",
          orange: "hsl(var(--clr-orange))",
        },
        white: "hsl(var(--clr-white))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          green: "hsl(var(--clr-green))",
          yellow: "hsl(var(--clr-yellow))",
          cyan: "hsl(var(--clr-cyan))",
          navy: "hsl(var(--clr-navy))",
          red: "hsl(var(--clr-red))",
          purple: "hsl(var(--clr-purple))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        "2xl": "1440px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
