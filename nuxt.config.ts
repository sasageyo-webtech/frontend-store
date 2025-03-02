// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

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