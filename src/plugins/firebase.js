import { initializeApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
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

enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })

export { db }
