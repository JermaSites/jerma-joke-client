import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'

export function useStream() {
  const { firestore } = useFirebase()
  const streamsRef = collection(firestore, 'streams')

  const jermaUserId = '23936415'

  async function getStreams() {
    const q = query(streamsRef, where('userID', '==', jermaUserId), orderBy('startedAt', 'desc'), limit(12))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => {
      return doc.data() as Stream
    })
  }

  return {
    getStreams,
  }
}
