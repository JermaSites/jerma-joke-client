import { db } from '../../plugins/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export default {
  state: {
    loading: false,
    liveStream: null
  },
  getters: {
    loading (state) {
      return state.loading
    },
    liveStream (state) {
      return state.liveStream
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setLiveStream (state, payload) {
      state.liveStream = payload
    }
  },
  actions: {
    async fetchLiveStream ({ commit }) {
      try {
        commit('setLoading', true)
        let liveStream
        const q = query(collection(db, 'streams'), where('type', '==', 'live'), where('userID', '==', process.env.VUE_APP_CHANNEL_ID.split(' ')[0]))
        const snapshot = await getDocs(q)
        snapshot.forEach(doc => {
          liveStream = doc.data()
        })
        commit('setLiveStream', liveStream)
        commit('setLoading', false)
      } catch (error) {
        console.error('Error fetching streams:', error)
      }
    }
  }
}
