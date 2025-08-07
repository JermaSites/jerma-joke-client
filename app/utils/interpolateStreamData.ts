export default function (stream: Stream) {
  const data = []
  let jokeScore = 0
  let high = 0
  let low = 0
  let open = 0
  let close = 0
  let totalMinusTwo = 0
  let totalPlusTwo = 0

  const streamUptime = getStreamUptime(stream)

  for (let i = 0; i <= streamUptime; i++) {
    const dataPoint = stream.data.find(data => data.interval === i)

    if (dataPoint) {
      jokeScore = dataPoint.jokeScore
      high = dataPoint.high
      low = dataPoint.low
      open = dataPoint.open
      close = dataPoint.close
      totalMinusTwo = dataPoint.totalMinusTwo
      totalPlusTwo = dataPoint.totalPlusTwo
      data.push(dataPoint)
    }
    else {
      data.push({
        jokeScore,
        high,
        low,
        open,
        close,
        totalMinusTwo,
        totalPlusTwo,
        interval: i,
        volume: 0,
      })
    }
  }

  return data
}
