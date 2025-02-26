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

  compatibilityDate: "2025-02-22"
})