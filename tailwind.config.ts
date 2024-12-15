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
        "primary": "#6B46C1", // deep purple
        "primary-light": "#9F7AEA", // lighter purple
        "primary-dark": "#44337A", // darker purple
      },
    },
  },
  plugins: [],
};

export default config;
