/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./node_modules/flowbite/**/*.js",
  ],
  daisyui: {
    themes: ['light']
  },
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('daisyui')
  ],
}