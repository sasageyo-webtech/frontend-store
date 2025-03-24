// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // pages: false,

  modules: [
    '@vueuse/nuxt',
    "@nuxtjs/tailwindcss"
  ],

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
    },
  },

  alias: {
    '@api': '/api'  // Update this path to point to your actual API folder
  },

  compatibilityDate: "2025-02-22",

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost',
    }
  }

  
})