export default function interpolateStreamData(stream: Stream | null): StreamData[] {
  if (!stream)
    return []

  const streamUptime = getStreamUptime(stream)
  const dataMap = new Map(stream.data.map(d => [d.interval, d]))
  const result: StreamData[] = []

  let jokeScore = 0
  let high = 0
  let low = 0
  let open = 0
  let close = 0
  let totalMinusTwo = 0
  let totalPlusTwo = 0

  for (let i = 0; i <= streamUptime; i++) {
    const dataPoint = dataMap.get(i)

    if (dataPoint) {
      jokeScore = dataPoint.jokeScore
      high = dataPoint.high
      low = dataPoint.low
      open = dataPoint.open
      close = dataPoint.close
      totalMinusTwo = dataPoint.totalMinusTwo
      totalPlusTwo = dataPoint.totalPlusTwo
      result.push(dataPoint)
    }
    else {
      result.push({ jokeScore, high, low, open, close, totalMinusTwo, totalPlusTwo, interval: i, volume: 0 })
    }
  }

  return result
}
