export const useStreamStore = defineStore('stream', () => {
  const { getStreams, getStream } = useStream()

  const streams = ref<Stream[]>([])
  const currentStream = ref<Stream>()

  async function fetchStreams() {
    streams.value = await getStreams()
  }

  async function fetchStream(id: string) {
    let stream = streams.value.find(stream => stream.id === id)
    if (stream) {
      return stream
    }

    stream = await getStream(id)

    streams.value.push(stream)
    currentStream.value = stream
  }

  function getStreamById(id: string) {
    return computed(() => streams.value.find(stream => stream.id === id))
  }

  return {
    streams,
    currentStream,
    fetchStream,
    fetchStreams,
    getStreamById,
  }
})
