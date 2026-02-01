export const useStreamStore = defineStore('stream', () => {
  const { getStreams, getStream, getLiveStream } = useStream()

  const streams = ref<Stream[] | undefined>([])
  const currentStream = ref<Stream | null>(null)
  const liveStream = ref<Stream | undefined | null>(null)

  async function fetchStreams() {
    try {
      streams.value = await getStreams()
    }
    catch (error) {
      console.error('Error getting streams')
      console.error(error)
    }
  }

  async function fetchLiveStream() {
    try {
      liveStream.value = await getLiveStream()
    }
    catch (error) {
      console.error('Error getting live stream')
      console.error(error)
    }
  }

  async function fetchStream(id: string) {
    try {
      let stream = getStreamById(id).value

      if (stream)
        currentStream.value = stream

      stream = await getStream(id)

      if (stream)
        currentStream.value = stream
    }
    catch (error) {
      console.error('Error getting stream')
      console.error(error)
    }
  }

  function getStreamById(id: string) {
    return computed(() => streams.value?.find(stream => stream.id === id))
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
