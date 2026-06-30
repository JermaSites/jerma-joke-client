import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'

export function useStream() {
  async function getStreams() {
    const { firestore } = useFirebase()
    const { twitchChannelId } = useRuntimeConfig().public
    const streamsRef = collection(firestore, 'streams')
    const q = query(streamsRef, where('userID', '==', twitchChannelId.toString()), where('type', '==', 'offline'), orderBy('startedAt', 'desc'), limit(12))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => doc.data() as Stream)
  }

  async function getLiveStream() {
    const { firestore } = useFirebase()
    const { twitchChannelId } = useRuntimeConfig().public
    const streamsRef = collection(firestore, 'streams')
    const q = query(streamsRef, where('userID', '==', twitchChannelId.toString()), where('type', '==', 'live'), orderBy('startedAt', 'desc'), limit(1))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => doc.data() as Stream).pop()
  }

  async function getStream(id: string) {
    const { firestore } = useFirebase()
    const docRef = doc(firestore, 'streams', id)
    const docSnap = await getDoc(docRef)
    return docSnap.data() as Stream | undefined
  }

  return {
    getStreams,
    getStream,
    getLiveStream,
  }
}
