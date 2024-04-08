// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  build: {
    // https://github.com/prazdevs/pinia-plugin-persistedstate/issues/236
    transpile: ['pinia-plugin-persistedstate'],
  },
})
