export const useStreamStore = defineStore('stream', () => {
  const { getStreams, getStream, getLiveStream } = useStream()

  const streams = ref<Stream[]>([])
  const currentStream = ref<Stream | null>(null)
  const liveStream = ref<Stream | null>(null)

  async function fetchStreams() {
    streams.value = await getStreams()
  }

  async function fetchLiveStream() {
    liveStream.value = await getLiveStream() ?? null
  }

  async function fetchStream(id: string) {
    const cached = getStreamById(id).value
    if (cached)
      currentStream.value = cached

    const fresh = await getStream(id)
    if (fresh)
      currentStream.value = fresh
  }

  function getStreamById(id: string) {
    return computed(() => streams.value.find(stream => stream.id === id))
  }

  return {
    streams,
    currentStream,
    liveStream,
    fetchStream,
    fetchStreams,
    fetchLiveStream,
    getStreamById,
  }
})
