import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const app = initializeApp({
  apiKey: 'AIzaSyAz0iwy0SUEdgfEepd58a0DPZwxKoD8MQU',
  authDomain: 'jerma-joke.firebaseapp.com',
  databaseURL: 'https://jerma-joke.firebaseio.com',
  appId: '1:799027726679:web:807cf04ad8529c83',
  projectId: 'jerma-joke',
  measurementId: 'G-9YWGPSZR1V'
})

getAnalytics(app)

const db = getFirestore()

export { db }
