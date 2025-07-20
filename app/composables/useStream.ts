import { collection, getDocs, limit, query, where } from 'firebase/firestore'

export function useStream() {
  const { firestore } = useFirebase()
  const streamsRef = collection(firestore, 'streams')

  async function getStreams() {
    const q = query(streamsRef, limit(3))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => {
      return doc.data() as Stream
    })
  }

  return {
    getStreams,
  }
}
