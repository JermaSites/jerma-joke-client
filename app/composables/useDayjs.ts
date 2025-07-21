export function useFirebase() {
  const { $dayjs } = useNuxtApp()

  return {
    dayjs: $dayjs,
  }
}
