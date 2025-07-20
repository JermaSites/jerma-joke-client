export const useStreamStore = defineStore('stream', () => {
  const { getStreams } = useStream()

  const streams = ref<Stream[]>()

  async function fetchStreams() {
    streams.value = await getStreams()
  }

  return {
    streams,
    fetchStreams,
  }
})
