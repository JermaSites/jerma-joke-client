import firebase from 'firebase/compat/app'

import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAz0iwy0SUEdgfEepd58a0DPZwxKoD8MQU',
  authDomain: 'jerma-joke.firebaseapp.com',
  databaseURL: 'https://jerma-joke.firebaseio.com',
  projectId: 'jerma-joke',
  storageBucket: 'jerma-joke.appspot.com',
  messagingSenderId: '799027726679',
  appId: '1:799027726679:web:807cf04ad8529c83'
}

firebase.initializeApp(firebaseConfig)

// Enable cache
firebase.firestore().enablePersistence()

export default firebase
