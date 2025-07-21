<script setup lang="ts">
const props = defineProps<{
  stream?: Stream
}>()

const { $dayjs: dayjs } = useNuxtApp()

const streamUpTime = computed(() => {
  if (!props.stream)
    return 0

  if (props.stream.type === 'live') {
    return dayjs().diff(dayjs(props.stream.startedAt), 'minutes')
  }

  if (props.stream.streamUpTime)
    return props.stream.streamUpTime

  return props.stream.data.at(-1)?.interval || 0
})

function interpolateStream(stream: Stream | undefined) {
  if (!stream)
    return []

  const data = []
  let jokeScore = 0
  let high = 0
  let low = 0
  let open = 0
  let close = 0
  let totalMinusTwo = 0
  let totalPlusTwo = 0

  for (let i = 0; i <= streamUpTime.value; i++) {
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

const streamData = computed(() => {
  return interpolateStream(props.stream).map((point) => {
    return { x: point.interval, y: point.jokeScore }
  })
})

const series = ref([
  {
    name: 'Live Data',
    data: streamData.value,
  },
])

const options = ref({
  chart: {
    type: 'line',
    animations: {
      enabled: false,
    },
    selection: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  colors: ['#ffd200', '#FF0000', '#00FF00'],
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: ['soild', 'solid', 'solid'],
    gradient: {
      type: 'vertical',
      colorStops: [
        {
          offset: 0,
          color: '#1feaea',
          opacity: 1,
        },
        {
          offset: 50,
          color: '#ffd200',
          opacity: 1,
        },
        {
          offset: 100,
          color: '#f72047',
          opacity: 1,
        },
      ],
    },
  },
  grid: {
    show: true,
    borderColor: '#90A4AE',
    strokeDashArray: 3,
    position: 'back',
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 0,
      right: 8,
      bottom: 0,
      left: 22,
    },
  },
  markers: {
    size: 0,
  },
  stroke: {
    show: true,
    curve: 'straight',
    lineCap: 'butt',
    width: 3,
    dashArray: [0, 5, 5],
  },
  theme: {
    mode: 'dark',
  },
  tooltip: {
    enabled: true,
    shared: false,
    followCursor: false,
    intersect: false,
    onDatasetHover: {
      highlightDataSeries: true,
    },
    x: {
      show: false,
    },
    marker: {
      show: false,
    },
  },
  xaxis: {
    type: 'numeric',
    tickAmount: streamData.value.length - 1 < 15 ? streamData.value.length - 1 : 15,
    tickPlacement: 'on',
    labels: {
      formatter(value: number) {
        return dayjs.duration(value, 'm').format('HH:mm')
      },
    },
  },
  yaxis: {
    opposite: true,
  },
})
</script>

<template>
  <apexchart
    type="line"
    :options="options"
    :series="series"
  />
</template>

<style scoped>

</style>
