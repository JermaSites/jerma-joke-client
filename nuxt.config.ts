// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'dayjs-nuxt',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-vuefire',
  ],
  dayjs: {
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'en',
    defaultTimezone: 'America/New_York',
  },
  vuefire: {
    config: {
      apiKey: 'AIzaSyAz0iwy0SUEdgfEepd58a0DPZwxKoD8MQU',
      authDomain: 'jerma-joke.firebaseapp.com',
      databaseURL: 'https://jerma-joke.firebaseio.com',
      projectId: 'jerma-joke',
      storageBucket: 'jerma-joke.appspot.com',
      messagingSenderId: '799027726679',
      appId: '1:799027726679:web:807cf04ad8529c83',
      measurementId: 'G-9YWGPSZR1V',
    },
  },
  // build: {
  //   // https://github.com/prazdevs/pinia-plugin-persistedstate/issues/236
  //   transpile: ['pinia-plugin-persistedstate'],
  // },
})