// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // pages: false,

<<<<<<< HEAD
  modules: ['@vueuse/nuxt', "@nuxtjs/tailwindcss", '@pinia/nuxt'],
=======
  modules: [
    '@vueuse/nuxt',
    "@nuxtjs/tailwindcss",
    '@pinia/nuxt'
  ],
>>>>>>> 50680a6e2d90fb8e0cdf07b55e381415f913ee9d

  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },

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
  },
  plugins: [
    '~/plugins/pinia.ts' // ลงทะเบียน plugin
  ]

  
})