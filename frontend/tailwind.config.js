/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    content: ["./src/**/*.{ts,tsx,js,jsx}"],
    extend: {
      colors: {
        backgroundLight: "#152B5A",
        secondaryPink: "#f4d3d1",
        lightGray: "#7E7E82",
        text: "#08111F",
        border: "#FA0C1A",
        input: "hsl(22, 37%, 90%)",
        ring: "hsl(221, 62%, 22%)",
        background: "#FFFFFF",
        foreground: "hsl(25, 39%, 91%)",
        primary: {
          DEFAULT: "#FA0C1A",
          foreground: "#FA0C1A",
        },
        secondary: {
          DEFAULT: "#000000",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(240, 2%, 50%)",
          foreground: "hsl(240, 2%, 50%)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        walsheim: ["'GT Walsheim Trial'", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      screens: {
        laptop: "837px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
