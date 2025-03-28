// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss:{
    cssPath: '~/assets/css/tailwind.css',
  },
  devtools: { enabled: true }
})
