import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'

export function useStream() {
  async function getStreams() {
    try {
      const { firestore } = useFirebase()
      const { twitchChannelId } = useRuntimeConfig().public
      const streamsRef = collection(firestore, 'streams')
      const q = query(streamsRef, where('userID', '==', twitchChannelId.toString()), where('type', '==', 'offline'), orderBy('startedAt', 'desc'), limit(12))
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map((doc) => {
        return doc.data() as Stream
      })
    }
    catch (error) {
      console.error('Error getting streams')
      console.error(error)
    }
  }

  async function getLiveStream() {
    try {
      const { firestore } = useFirebase()
      const { twitchChannelId } = useRuntimeConfig().public
      const streamsRef = collection(firestore, 'streams')
      const q = query(streamsRef, where('userID', '==', twitchChannelId.toString()), where('type', '==', 'live'), orderBy('startedAt', 'desc'), limit(1))
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map((doc) => {
        return doc.data() as Stream
      }).pop()
    }
    catch (error) {
      console.error('Error getting live stream')
      console.error(error)
    }
  }

  async function getStream(id: string) {
    try {
      const { firestore } = useFirebase()
      const docRef = doc(firestore, 'streams', id)
      const docSnap = await getDoc(docRef)

      return docSnap.data() as Stream
    }
    catch (error) {
      console.error('Error getting stream')
      console.error(error)
    }
  }

  return {
    getStreams,
    getStream,
    getLiveStream,
  }
}
