/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
      "./.storybook/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      spacing:{
          2: '4px',
          4: '12px',
      },
    extend: {},
  },
  plugins: [],
}

