export const useStreamStore = defineStore('stream', () => {
  const { getStreams, getStream, getLiveStream } = useStream()

  const streams = ref<Stream[] | undefined>([])
  const currentStream = ref<Stream | null>(null)
  const liveStream = ref<Stream | undefined | null>(null)

  async function fetchStreams() {
    streams.value = await getStreams()
  }

  async function fetchLiveStream() {
    liveStream.value = await getLiveStream()
  }

  async function fetchStream(id: string) {
    let stream = getStreamById(id).value

    if (stream && stream.type !== 'live')
      return currentStream.value = stream

    stream = await getStream(id)

    if (stream && streams.value) {
      streams.value.push(stream)
      currentStream.value = stream
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
