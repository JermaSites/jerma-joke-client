import Vue from 'vue'
import Vuex from 'vuex'

import firebase from '../plugins/firebase'

const db = firebase.firestore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    streams: null,
    stream: null,
    recentStreams: null,
    currentStream: null
  },
  mutations: {
    setStreams (state, payload) {
      state.streams = payload
    },
    setStream (state, payload) {
      state.stream = payload
    },
    setRecentStream (state, payload) {
      state.recentStreams = payload
    },
    setCurrentStream (state, payload) {
      state.currentStream = payload
    }
  },
  actions: {
    async fetchStreams ({ commit }) {
      try {
        const streams = []
        const snapshot = await db.collection('streams').orderBy('id', 'desc').get()
        snapshot.forEach(doc => {
          streams.push(doc.data())
        })
        commit('setStreams', streams)
      } catch (error) {
        console.error('Error fetching streams:', error)
      }
    },
    async fetchStream ({ commit }, payload) {
      try {
        const snapshot = await db.collection('streams').doc(`${payload}`).get()
        const data = snapshot.data()
        commit('setStream', data)
      } catch (error) {
        console.error('Failed to fetch stream:', error)
      }
    },
    async fetchRecentStreams ({ commit }) {
      try {
        const streams = []
        const snapshot = await db.collection('streams').where('type', '==', 'offline').orderBy('id', 'desc').limit(6).get()
        snapshot.forEach(doc => {
          streams.push(doc.data())
        })
        commit('setRecentStream', streams)
      } catch (error) {
        console.error('Failed to fetch recent streams:', error)
      }
    },
    async fetchCurrentStream ({ commit }) {
      try {
        let stream = null
        const snapshot = await db.collection('streams').where('type', '==', 'live').get()
        snapshot.forEach(doc => {
          stream = doc.data()
        })
        commit('setCurrentStream', stream)
      } catch (error) {
        console.error('Failed to fetch current stream:', error)
      }
    }
  }
})
