import Vue from 'vue'
import Vuex from 'vuex'

import firebase from '../plugins/firebase'

const db = firebase.firestore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    streams: []
  },
  getters: {
    getStream (state) {
      return streamID => state.streams.find(stream => +stream.id === streamID)
    }
  },
  mutations: {
    setStreams (state, payload) {
      state.streams = payload
    }
  },
  actions: {
    async fetchStreams ({ commit }) {
      try {
        const streams = []
        const snapshot = await db.collection('streams').get()
        snapshot.forEach(doc => {
          streams.push(doc.data())
        })
        commit('setStreams', streams)
      } catch (error) {
        console.error('Error fetching streams:', error)
      }
    }
  }
})
