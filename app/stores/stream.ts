export const useStreamStore = defineStore('stream', () => {
  const { getStreams, getStream, getLiveStream } = useStream()

  const streams = ref<Stream[]>([])
  const currentStream = ref<Stream | null>(null)
  const liveStream = ref<Stream | null>(null)
  const streamCache = new Map<string, Stream>()

  async function fetchStreams() {
    streams.value = await getStreams()
  }

  async function fetchLiveStream() {
    liveStream.value = await getLiveStream() ?? null
  }

  async function fetchStream(id: string) {
    const cached = streamCache.get(id)

    if (cached) {
      currentStream.value = cached
      if (cached.type === 'offline')
        return
    }

    const fresh = await getStream(id)
    if (fresh) {
      currentStream.value = fresh
      streamCache.set(id, fresh)
    }
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
