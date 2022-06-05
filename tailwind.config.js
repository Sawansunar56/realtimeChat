module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sawan: {
          '100': '#f2f2f2',
          '200': '#ada2f2',
          '300': '#9080f2',
          '400': '#705cf2',
          '500': '#614bf2'
        }
      }
    },
  },
  plugins: [],
}
