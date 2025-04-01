// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // pages: false,

  modules: [
    '@vueuse/nuxt',
    "@nuxtjs/tailwindcss",
    '@pinia/nuxt',
  ],

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
    '~/plugins/pinia.ts', // ลงทะเบียน plugin
    '~/plugins/sweetalert2.ts'
  ],

  
})