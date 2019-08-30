import firebase from '../../plugins/firebase'

const db = firebase.firestore()

export default {
  state: {
    loading: false,
    streams: [],
    liveStream: null,
    cursor: null
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
    },
    setLiveStream (state, payload) {
      state.liveStream = payload
    },
    setCursor (state, payload) {
      state.cursor = payload
    },
    addStreams (state, payload) {
      state.streams = state.streams.concat(payload)
    }
  },
  actions: {
    async fetchStreams ({ commit }) {
      try {
        commit('setLoading', true)
        const streams = []
        const snapshot = await db.collection('streams').orderBy('id', 'desc').limit(6).get()
        snapshot.forEach(doc => {
          streams.push(doc.data())
        })
        const last = snapshot.docs[snapshot.docs.length - 1]
        commit('setStreams', streams)
        commit('setCursor', last)
        commit('setLoading', false)
      } catch (error) {
        console.error('Error fetching streams:', error)
      }
    },
    async fetchLiveStream ({ commit }) {
      try {
        commit('setLoading', true)
        let liveStream
        const snapshot = await db.collection('streams').where('type', '==', 'live').get()
        snapshot.forEach(doc => {
          liveStream = doc.data()
        })
        commit('setLiveStream', liveStream)
        commit('setLoading', false)
      } catch (error) {
        console.error('Error fetching streams:', error)
      }
    },
    async fetchMoreStreams ({ state, commit }) {
      try {
        const streams = []
        const snapshot = await db.collection('streams').orderBy('id', 'desc').startAfter(state.cursor).limit(6).get()
        snapshot.forEach(doc => {
          streams.push(doc.data())
        })
        const last = snapshot.docs.length < 6 ? null : snapshot.docs[snapshot.docs.length - 1]
        commit('setCursor', last)
        commit('addStreams', streams)
      } catch (error) {
        console.error('Error fetching more streams:', error)
      }
    }
  }
}