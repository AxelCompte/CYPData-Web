import type { Config } from "tailwindcss";
import { theme } from "./src/lib/constants/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...theme.colors,
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: theme.spacing as any,
      fontFamily: theme.typography.fontFamily as any,
      fontSize: theme.typography.fontSize as any,
      fontWeight: theme.typography.fontWeight as any,
      borderRadius: theme.borderRadius as any,
      boxShadow: theme.shadows as any,
      zIndex: theme.zIndex as any,
      screens: theme.breakpoints as any,
      transitionDuration: theme.animation.duration as any,
      transitionTimingFunction: theme.animation.easing as any,
    },
  },
  plugins: [],
};

export default config;