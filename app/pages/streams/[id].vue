<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

import tmi from 'tmi.js'

const { twitchChannelName } = useRuntimeConfig().public

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

const totalScore = ref(currentStream.value?.jokeScoreTotal || 0)
const minScore = ref(currentStream.value?.jokeScoreMin || 0)
const maxScore = ref(currentStream.value?.jokeScoreMax || 0)

const lowScore = computed(() => {
  const low = currentStream.value?.jokeScoreLow || 0
  return totalScore.value > low ? totalScore.value : low
})

const highScore = computed(() => {
  const high = currentStream.value?.jokeScoreHigh || 0
  return totalScore.value < high ? totalScore.value : high
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

  const streamUptime = getStreamUptime(currentStream.value) + 1

  const dataPoint = currentStream.value.data.find(p => p.interval === streamUptime)

  if (dataPoint) {
    dataPoint.jokeScore = totalScore.value
    dataPoint.high = highScore.value
    dataPoint.low = lowScore.value
    dataPoint.close = totalScore.value
    dataPoint.totalMinusTwo = minScore.value
    dataPoint.totalPlusTwo = maxScore.value
  }
  else {
    currentStream.value.data.push({
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

onMounted(() => {
  const client = new tmi.Client({
    channels: [twitchChannelName],
  })

  client.connect()

  client.on('message', (_channel, _usersate, message, _self) => {
    const messageContainsScore = /(?<!\S)(?:[+-]2|jerma(?:Plus|Minus)2)(?!\S)/.test(message)

    if (!messageContainsScore)
      return

    if (message.includes('+2')) {
      totalScore.value += 2
      maxScore.value += 2
    }
    else if (message.includes('-2')) {
      totalScore.value -= 2
      minScore.value -= 2
    }

    const lastData = currentStream.value?.data.at(-1)
    if (lastData && lastData.volume != null) {
      lastData.volume += 1
    }
  })

  onBeforeUnmount(() => {
    client.disconnect()
  })
})

onMounted(() => {
  const id = setInterval(() => {
    updateChart()
  }, 10000)

  onBeforeUnmount(() => clearInterval(id))
})

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

    <section>
      <div>
        {{ totalScore }}
      </div>
      <div>
        {{ minScore }}
      </div>
      <div>
        {{ maxScore }}
      </div>
      <div>
        sum: {{ maxScore + minScore }}
      </div>
      <div>
        volume: {{ currentStream?.data.at(-1)?.volume }}
      </div>
    </section>
  </UContainer>
</template>

<style scoped>

</style>
