/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./data/**/*.{js,jsx,ts,tsx,json}"
  ],
  theme: {
    extend: {
      colors: {
        ochi: {
          bg: "#f1f1f1",
          ink: "#212121",
          lime: "#cdea68",
          slate: "#212121",
          bone: "#f4f4f4",
          mint: "#d8e982",
          green: "#004d43",
          gray100: "#f1f1f1",
          gray200: "#e7e7e7",
          gray300: "#4b4b4b",
          gray400: "#3c3c3c",
          gray900: "#212121"
        }
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"]
      },
      boxShadow: {
        card: "0 20px 45px -24px rgba(0, 0, 0, 0.35)"
      },
      keyframes: {
        "logo-slide": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        crawl: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        blink: {
          "0%, 5%, 100%": { transform: "scaleY(1)" },
          "2.5%": { transform: "scaleY(0.1)" }
        }
      },
      animation: {
        "logo-slide": "logo-slide 20s linear infinite",
        crawl: "crawl 10s linear infinite",
        blink: "blink 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
