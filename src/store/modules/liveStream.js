import firebase from '../../plugins/firebase'

const db = firebase.firestore()

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
        const snapshot = await db.collection('streams').where('type', '==', 'live').get()
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
