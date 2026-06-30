import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
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
    twitchClientId: 'wiw9aegy74pm1mgda23onn8wxdbmea',
    public: {
      twitchApiUrl: 'https://api.twitch.tv/helix/video',
      twitchChannelName: 'jerma985',
      twitchChannelId: '23936415',
    },
  },
})
