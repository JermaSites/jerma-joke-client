import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'

export function useStream() {
  const { firestore } = useFirebase()

  const jermaUserId = '23936415'

  async function getStreams() {
    const streamsRef = collection(firestore, 'streams')
    const q = query(streamsRef, where('userID', '==', jermaUserId), orderBy('startedAt', 'desc'), limit(12))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      return doc.data() as Stream
    })
  }

  async function getStream(id: string) {
    const docRef = doc(firestore, 'streams', id)
    const docSnap = await getDoc(docRef)

    return docSnap.data() as Stream
  }

  return {
    getStreams,
    getStream,
  }
}
