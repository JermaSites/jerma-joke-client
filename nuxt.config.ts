import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxtjs/algolia'],
  css: ['~/assets/css/main.css'],

  ssr: false,

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'firebase-core': ['firebase/app'],
            'firebase-firestore': ['firebase/firestore'],
            'apexcharts': ['apexcharts', 'vue3-apexcharts'],
            'twitch': ['tmi.js'],
          },
        },
      },
    },
  },

  runtimeConfig: {
    twitchClientId: process.env.NUXT_TWITCH_CLIENT_ID,
    public: {
      twitchApiUrl: process.env.NUXT_PUBLIC_TWITCH_API_URL,
      twitchChannelName: process.env.NUXT_PUBLIC_TWITCH_CHANNEL_NAME,
      twitchChannelId: process.env.NUXT_PUBLIC_TWITCH_CHANNEL_ID,

      algoliaAppId: process.env.NUXT_PUBLIC_ALGOLIA_APP_ID,
      algoliaSearchApiKey: process.env.NUXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
    },
  },
})
