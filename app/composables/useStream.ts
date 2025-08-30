import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'

export function useStream() {
  const { firestore } = useFirebase()
  const { twitchChannelId } = useRuntimeConfig().public

  async function getStreams() {
    const streamsRef = collection(firestore, 'streams')
    const q = query(streamsRef, where('userID', '==', twitchChannelId.toString()), where('type', '==', 'offline'), orderBy('startedAt', 'desc'), limit(12))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      return doc.data() as Stream
    })
  }

  async function getLiveStream() {
    const streamsRef = collection(firestore, 'streams')
    const q = query(streamsRef, where('userID', '==', twitchChannelId.toString()), where('type', '==', 'live'), orderBy('startedAt', 'desc'), limit(1))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      return doc.data() as Stream
    }).pop()
  }

  async function getStream(id: string) {
    const docRef = doc(firestore, 'streams', id)
    const docSnap = await getDoc(docRef)

    return docSnap.data() as Stream
  }

  return {
    getStreams,
    getStream,
    getLiveStream,
  }
}
