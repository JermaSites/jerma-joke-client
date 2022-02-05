// import firebase from 'firebase/compat/app'

// import 'firebase/compat/firestore'
// import 'firebase/compat/analytics'

// const firebaseConfig = {
//   apiKey: 'AIzaSyAz0iwy0SUEdgfEepd58a0DPZwxKoD8MQU',
//   authDomain: 'jerma-joke.firebaseapp.com',
//   databaseURL: 'https://jerma-joke.firebaseio.com',
//   projectId: 'jerma-joke',
//   storageBucket: 'jerma-joke.appspot.com',
//   messagingSenderId: '799027726679',
//   appId: '1:799027726679:web:807cf04ad8529c83',
//   measurementId: 'G-9YWGPSZR1V'
// }

// firebase.initializeApp(firebaseConfig)
// firebase.analytics()

// // Enable cache
// firebase.firestore().enablePersistence()

// export default firebase

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

initializeApp({
  apiKey: 'AIzaSyAz0iwy0SUEdgfEepd58a0DPZwxKoD8MQU',
  authDomain: 'jerma-joke.firebaseapp.com',
  databaseURL: 'https://jerma-joke.firebaseio.com',
  appId: '1:799027726679:web:807cf04ad8529c83',
  projectId: 'jerma-joke',
  measurementId: 'G-9YWGPSZR1V'
})

const db = getFirestore()

export { db }
