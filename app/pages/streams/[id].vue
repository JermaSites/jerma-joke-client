<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import type { ApexAxisChartSeries } from 'apexcharts'
import tmi from 'tmi.js'

const { twitchChannelName } = useRuntimeConfig().public

const route = useRoute()
const streamStore = useStreamStore()
const { currentStream } = storeToRefs(streamStore)

const streamId = computed(() => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

  if (!id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Stream ID is required',
    })
  }

  return id
})

try {
  await streamStore.fetchStream(streamId.value)
}
catch (error) {
  console.error('Error fetching stream', error)
}

const interpolatedStreamData = ref(interpolateStreamData(currentStream.value))

const totalScore = ref(currentStream.value?.jokeScoreTotal ?? 0)
const minScore = ref(currentStream.value?.jokeScoreMin ?? 0)
const maxScore = ref(currentStream.value?.jokeScoreMax ?? 0)
const high = ref(currentStream.value?.jokeScoreHigh ?? 0)
const low = ref(currentStream.value?.jokeScoreLow ?? 0)
const volume = ref(interpolatedStreamData.value.at(-1)?.volume ?? 0)

watch(totalScore, (newTotal) => {
  if (newTotal > high.value)
    high.value = newTotal

  if (newTotal < low.value)
    low.value = newTotal
})

const totalVolume = ref(interpolatedStreamData.value.reduce((sum, data) => sum + data.volume, 0))

const scoreData = computed(() =>
  interpolatedStreamData.value.map(data => ({ x: data.interval, y: data.jokeScore })),
)

const plusTwoData = computed(() =>
  interpolatedStreamData.value.map(data => ({ x: data.interval, y: data.totalPlusTwo / 2 })),
)

const minusTwoData = computed(() =>
  interpolatedStreamData.value.map(data => ({ x: data.interval, y: Math.abs(data.totalMinusTwo / 2) })),
)

const volumeData = computed(() =>
  interpolatedStreamData.value.map(data => ({ x: data.interval, y: data.volume })),
)

const donutChartSeries = computed(() => [Math.abs(maxScore.value), Math.abs(minScore.value)])

const lineChartSeries = computed<ApexAxisChartSeries>(() => [
  { name: 'Score', data: scoreData.value },
  { name: '+2', data: plusTwoData.value },
  { name: '-2', data: minusTwoData.value },
])

const volumeChartSeries = computed<ApexAxisChartSeries>(() => [
  { name: 'Volume', data: volumeData.value },
])

function updateChart() {
  if (!currentStream.value)
    return

  const streamUptime = getStreamUptime(currentStream.value)
  const dataPoint = interpolatedStreamData.value.find(p => p.interval === streamUptime)

  if (dataPoint) {
    dataPoint.jokeScore = totalScore.value
    dataPoint.high = high.value
    dataPoint.low = low.value
    dataPoint.close = totalScore.value
    dataPoint.totalMinusTwo = minScore.value
    dataPoint.totalPlusTwo = maxScore.value
    dataPoint.volume = volume.value
  }
  else {
    volume.value = 0
    interpolatedStreamData.value.push({
      jokeScore: totalScore.value,
      high: totalScore.value,
      low: totalScore.value,
      open: totalScore.value,
      close: totalScore.value,
      totalMinusTwo: minScore.value,
      totalPlusTwo: maxScore.value,
      interval: streamUptime,
      volume: 0,
    })
  }
}

let tmiClient: tmi.Client | null = null
let updateInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (currentStream.value?.type !== 'live')
    return

  tmiClient = new tmi.Client({ channels: [twitchChannelName] })
  tmiClient.connect()

  tmiClient.on('message', (_channel, _userstate, message, _self) => {
    const messageContainsScore = /(?<!\S)(?:[+-]2|jerma(?:Plus|Minus)2)(?!\S)/.test(message)

    if (!messageContainsScore)
      return

    volume.value += 1
    totalVolume.value += 1

    if (message.includes('+2') || message.includes('jermaPlus2')) {
      totalScore.value += 2
      maxScore.value += 2
    }
    else {
      totalScore.value -= 2
      minScore.value -= 2
    }
  })

  updateInterval = setInterval(updateChart, 1000)
})

onBeforeUnmount(() => {
  tmiClient?.disconnect()
  if (updateInterval !== null)
    clearInterval(updateInterval)
})

const items = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: currentStream.value?.title ?? '', to: `/streams/${streamId.value}` },
])

const tableData = computed(() => ([
  { score: 'Total', value: totalScore.value },
  { score: 'Highest', value: high.value },
  { score: 'Lowest', value: low.value },
  { score: 'Total +2', value: maxScore.value },
  { score: 'Total -2', value: minScore.value },
  { score: 'Total Volume', value: totalVolume.value },
]))
</script>

<template>
  <UContainer class="py-4 sm:py-6 lg:py-8">
    <UBreadcrumb :items="items" />

    <div class="py-4 sm:text-4xl">
      {{ currentStream?.title }}
    </div>

    <div class="px-4 bg-stone-950">
      <LazyLineChart :series="lineChartSeries" />
    </div>

    <div class="px-4 bg-stone-950">
      <LazyVolumeChart :series="volumeChartSeries" />
    </div>

    <section class="grid sm:grid-cols-2 p-4 bg-stone-950">
      <div class="flex justify-center items-center">
        <LazyDonutChart :series="donutChartSeries" />
      </div>

      <div>
        <UTable :data="tableData" />
      </div>
    </section>
  </UContainer>
</template>
