export function useFirebase() {
  const { $firebase } = useNuxtApp()

  return {
    firestore: $firebase.firestore,
  }
}
