import { db } from '../../plugins/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default {
  state: {
    announcements: [],
    hiddenIds: []
  },
  getters: {
    announcements (state) {
      return state.announcements.filter(a => !state.hiddenIds.includes(a.id))
    }
  },
  mutations: {
    setAnnouncements (state, announcements) {
      state.announcements = announcements
    },
    hideAnnouncement (state, id) {
      state.hiddenIds.push(id)
    }
  },
  actions: {
    async fetchAnnouncements ({ state, commit }) {
      try {
        const announcements = []
        const snapshot = await getDocs(collection(db, 'announcements'))
        snapshot.forEach(doc => {
          announcements.push({
            id: doc.id,
            ...doc.data()
          })
        })
        commit('setAnnouncements', announcements)
      } catch (error) {
        console.error('Error fetching announcements:', error)
      }
    }
  }
}
