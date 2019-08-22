import Vue from 'vue'
import Vuex from 'vuex'

import firebase from '../plugins/firebase'

const db = firebase.firestore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    streams: [],
    messages: []
  },
  getters: {
    getStream (state) {
      return streamID => state.streams.find(stream => stream.id == streamID)
    }
  },
  mutations: {
    addStream (state, payload) {
      state.streams.push(payload)
    },
    setStreams (state, payload) {
      state.streams = payload
    },
    setMessages (state, payload) {
      state.messages = payload
    }
  },
  actions: {
    async fetchStream ({ commit, getters }, payload) {
      try {
        let stream = getters.getStream(payload)

        if (!stream) {
          await db.collection('streams').doc(payload).onSnapshot(docSnapshot => {
            console.log('Snapshot', docSnapshot.data())
            commit('addStream', docSnapshot.data())
          })
        }
      } catch (error) {
        console.error('Error getting stream:', error)
      }
    },
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
    },
    async fetchStreamMessages ({ commit }, streamID) {
      try {
        const messages = []
        const snapshot = await db.collection('streams').doc(`${streamID}`).collection('messages').orderBy('tmi-sent-ts').get()
        snapshot.forEach(doc => {
          messages.push(doc.data())
        })
        commit('setMessages', messages)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }
  }
})
