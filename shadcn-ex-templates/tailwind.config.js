const colors = require('tailwindcss/colors')

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
      colors: {
          accent: {
              DEFAULT: 'lightgray'
          },
          background: {
              DEFAULT: 'white',
          },
          ...colors
      },
    extend: {},
  },
  plugins: [],
}

