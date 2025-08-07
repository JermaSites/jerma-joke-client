export default function (stream: Stream) {
  const { dayjs } = useDayjs()

  if (stream.type === 'live')
    return dayjs().diff(dayjs(stream.startedAt), 'minutes')

  if (stream.streamUpTime)
    return stream.streamUpTime

  return stream.data.at(-1)?.interval || 0
}
