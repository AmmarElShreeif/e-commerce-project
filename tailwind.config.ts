import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#2B3445",
          200: "#3d4b64",
        },
        secoundry: {
          100: "#111827 ",
          200: "#f5f5f5",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
