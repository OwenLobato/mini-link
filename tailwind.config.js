/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'light-bg-main': '#CCEDFF', // Columbia Blue
        'light-text-main': '#004AAD', // Cobalt Blue
        'light-text-secondary': '#00C4CC', // Robin Egg Blue
        'light-text-third': '#C1C1C1', // Silver
        'light-alert': '#FF0000', // Red
        'light-bg-secondary': '#7597B6', // Air Superiority Blue
        'light-hover': '#DCEBFF', // Alice Blue
        'light-btn-hover': '#005EB8', // Denim
      },
    },
  },
  plugins: [],
};
