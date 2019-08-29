import firebase from '../../plugins/firebase'

const db = firebase.firestore()

export default {
  state: {
    loading: false,
    streams: []
  },
  getters: {
    streamByID (state) {
      return id => state.streams.find(stream => stream.id === id)
    },
    loading (state) {
      return state.loading
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setStreams (state, payload) {
      state.streams = payload
    }
  },
  actions: {
    async fetchStreams ({ commit }) {
      try {
        commit('setLoading', true)
        const streams = []
        const snapshot = await db.collection('streams').orderBy('id', 'desc').get()
        snapshot.forEach(doc => {
          streams.push(doc.data())
        })
        commit('setStreams', streams)
        commit('setLoading', false)
      } catch (error) {
        console.error('Error fetching streams:', error)
      }
    }
  }
}
