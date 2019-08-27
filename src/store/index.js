import Vue from 'vue'
import Vuex from 'vuex'

import firebase from '../plugins/firebase'

const db = firebase.firestore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    streams: [],
    stream: {}
  },
  getters: {
    getStream (state) {
      return streamID => state.streams.find(stream => +stream.id === streamID)
    }
  },
  mutations: {
    setStreams (state, payload) {
      state.streams = payload
    },
    setStream (state, payload) {
      state.stream = payload
    },
    setCondensedData (state, payload) {
      state.stream.condensedData = state.stream.condensedData.concat(payload)
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
    }
  }
})
