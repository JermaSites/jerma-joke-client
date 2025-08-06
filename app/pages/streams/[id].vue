<script setup lang="ts">
// import tmi from 'tmi.js'

// const config = useRuntimeConfig()
// const client = new tmi.Client({
//   channels: [config.public.twitchChannelName],
// })

// client.connect()
import type { BreadcrumbItem } from '@nuxt/ui'

const route = useRoute()
const streamStore = useStreamStore()
const { currentStream } = storeToRefs(streamStore)

const streamId = computed(() => {
  const id = route.params.id

  if (Array.isArray(id)) {
    return id[0] || ''
  }

  if (!id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User ID is required',
    })
  }

  return id
})

await streamStore.fetchStream(streamId.value)

const interpolatedStreamData = computed(() => {
  if (!currentStream.value)
    return []

  return interpolateStreamData(currentStream.value)
})

const scoreData = computed(() => {
  return interpolatedStreamData.value.map((data) => {
    return { x: data.interval, y: data.jokeScore }
  })
})

const plusTwoData = computed(() => {
  return interpolatedStreamData.value.map((data) => {
    return { x: data.interval, y: data.totalPlusTwo / 2 }
  })
})

const minusTwoData = computed(() => {
  return interpolatedStreamData.value.map((data) => {
    return { x: data.interval, y: Math.abs(data.totalMinusTwo / 2) }
  })
})

const series = computed<ApexAxisChartSeries>(() => {
  return [
    {
      name: 'Score',
      data: scoreData.value,
    },
    {
      name: '+2',
      data: plusTwoData.value,
    },
    {
      name: '-2',
      data: minusTwoData.value,
    },
  ]
})

function updateChart() {
  if (!currentStream.value)
    return

  const dataPoint = currentStream.value.data.find(p => p.interval === interpolatedStreamData.value.length)

  if (dataPoint) {
    //
  }
}

function updateIntervalData(dataPoint: StreamData) {
  dataPoint.jokeScore = total

  dataPoint.high
          = dataPoint.jokeScore > dataPoint.high
      ? dataPoint.jokeScore
      : dataPoint.high

  dataPoint.low
          = dataPoint.jokeScore < dataPoint.low
      ? dataPoint.jokeScore
      : dataPoint.low

  dataPoint.close = dataPoint.jokeScore

  dataPoint.totalMinusTwo = min

  dataPoint.totalPlusTwo = max
}

// onMounted(() => {
//   const intervalId = setInterval(() => {
//     currentStream.value.data.at(-1).jokeScore += 2
//     currentStream.value = { ...currentStream.value }
//   }, 1000)

//   onUnmounted(() => {
//     clearInterval(intervalId)
//   })
// })

const items: BreadcrumbItem[] = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: streamStore.currentStream?.title,
    to: `/streams/${streamId.value}`,
  },
]
</script>

<template>
  <UContainer class="py-4 sm:py-6 lg:py-8">
    <UBreadcrumb :items="items" />
    <div class="py-4 text-5xl">
      {{ streamStore.currentStream?.title }}
    </div>
    <LineChart :series="series" />
  </UContainer>
</template>

<style scoped>

</style>
