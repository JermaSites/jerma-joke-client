import firebase from '../../plugins/firebase'

const db = firebase.firestore()

export default {
  state: {
    loading: false,
    streams: [],
    cursor: null,
    stream: null,
    streamStats: []
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
    setStream (state, payload) {
      state.stream = payload
    },
    setCursor (state, payload) {
      state.cursor = payload
    },
    addStreams (state, payload) {
      state.streams = state.streams.concat(payload)
    },
    setStreamStats (state, payload) {
      state.streamStats = payload
    }
  },
  actions: {
    async fetchStreams ({ state, commit }) {
      if (state.streams.length) return
      try {
        commit('setLoading', true)
        const streams = []
        const snapshot = await db.collection('streams')
          .where('type', '==', 'offline')
          .where('userID', '==', process.env.VUE_APP_CHANNEL_ID)
          .orderBy('startedAt', 'desc')
          .limit(6)
          .get()
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
    async fetchMoreStreams ({ state, commit }) {
      try {
        const streams = []
        const snapshot = await db.collection('streams')
          .where('type', '==', 'offline')
          .where('userID', '==', process.env.VUE_APP_CHANNEL_ID)
          .orderBy('startedAt', 'desc')
          .startAfter(state.cursor)
          .limit(6)
          .get()
        snapshot.forEach(doc => {
          streams.push(doc.data())
        })
        const last = snapshot.docs.length < 6 ? null : snapshot.docs[snapshot.docs.length - 1]
        commit('setCursor', last)
        commit('addStreams', streams)
      } catch (error) {
        console.error('Error fetching more streams:', error)
      }
    },
    async fetchStream ({ getters, commit }, streamID) {
      const stream = getters.streamByID(streamID)
      if (stream && stream.type === 'offline') {
        commit('setStream', stream)
        return
      }

      try {
        const snapshot = await db.collection('streams').doc(`${streamID}`).get()
        const stream = snapshot.data()
        commit('setStream', stream)
      } catch (error) {
        console.error('Error fetching stream:', error)
      }
    },
    async fetchStreamStats ({ state, commit }) {
      if (state.streamStats.length) return
      try {
        const streamData = []
        const snapshot = await db.collection('streams').orderBy('startedAt', 'desc').get()
        snapshot.forEach(doc => {
          streamData.push(doc.data())
        })
        commit('setStreamStats', streamData)
      } catch (error) {
        console.error('Error fetching stream by stats:', error)
      }
    }
  }
}
