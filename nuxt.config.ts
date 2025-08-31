import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],

  ssr: true,

  runtimeConfig: {
    twitchClientId: process.env.NUXT_TWITCH_CLIENT_ID,
    public: {
      twitchApiUrl: process.env.NUXT_PUBLIC_TWITCH_API_URL,
      twitchChannelName: process.env.NUXT_PUBLIC_TWITCH_CHANNEL_NAME,
      twitchChannelId: process.env.NUXT_PUBLIC_TWITCH_CHANNEL_ID,
    },
  },
})
