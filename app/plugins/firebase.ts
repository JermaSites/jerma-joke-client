import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAz0iwy0SUEdgfEepd58a0DPZwxKoD8MQU',
    authDomain: 'jerma-joke.firebaseapp.com',
    databaseURL: 'https://jerma-joke.firebaseio.com',
    projectId: 'jerma-joke',
    storageBucket: 'jerma-joke.appspot.com',
    messagingSenderId: '799027726679',
    appId: '1:799027726679:web:807cf04ad8529c83',
  }

  const app = initializeApp(firebaseConfig)

  const firestore = getFirestore(app)

  return {
    provide: {
      firebase: {
        app,
        firestore,
      },
    },
  }
})
