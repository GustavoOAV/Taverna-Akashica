import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        akashic: {
          gold: "#FFD700",      // <--- Ouro Vivido (Gold puro)
          goldHover: "#FFEA00", // <--- Ainda mais brilhante para o hover
          stone: "#0c0c0c",
          mist: "#00f0ff",
        }
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"], 
      },
      backgroundImage: {
        'magic-glow': 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, rgba(0,0,0,0) 70%)',
      }
    },
  },
  plugins: [],
};
export default config;