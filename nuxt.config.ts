// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-vuefire'],
  compatibilityDate: '2024-09-25',

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
})
