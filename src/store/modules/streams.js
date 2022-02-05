import { db } from '../../plugins/firebase'
import { collection, getDocs, getDoc, doc, query, where, orderBy, limit, startAfter } from 'firebase/firestore'

export default {
  state: {
    loading: false,
    streams: [],
    cursor: null,
    stream: null,
    streamStats: [],
    limit: 12
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
        const q = query(collection(db, 'streams'), where('type', '==', 'offline'), where('userID', '==', process.env.VUE_APP_CHANNEL_ID.split(' ')[0]), orderBy('startedAt', 'desc'), limit(state.limit))
        const snapshot = await getDocs(q)
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
        const q = query(collection(db, 'streams'), where('type', '==', 'offline'), where('userID', '==', process.env.VUE_APP_CHANNEL_ID), orderBy('startedAt', 'desc'), startAfter(state.cursor), limit(state.limit))
        const snapshot = await getDocs(q)
        snapshot.forEach(doc => {
          streams.push(doc.data())
        })
        const last = snapshot.docs.length < state.limit ? null : snapshot.docs[snapshot.docs.length - 1]
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
        const snapshot = await getDoc(doc(db, 'streams', streamID))
        const stream = snapshot.data()
        commit('setStream', stream)
      } catch (error) {
        console.error('Error fetching stream:', error)
      }
    },
    async fetchStreamStats ({ commit }, options) {
      try {
        let { sortBy, sortDesc, itemsPerPage } = { ...options }

        sortDesc[0] ? sortDesc = 'desc' : sortDesc = 'asc'

        if (!sortBy.length) {
          sortBy = 'startedAt'
          sortDesc = 'desc'
        } else {
          sortBy = sortBy[0]
        }

        const streamData = []
        const q = query(collection(db, 'streams'), where('userID', '==', process.env.VUE_APP_CHANNEL_ID), orderBy(sortBy, sortDesc), limit(itemsPerPage))
        const snapshot = await getDocs(q)
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
