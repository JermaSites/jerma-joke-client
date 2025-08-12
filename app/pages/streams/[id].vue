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

const interpolatedStreamData = ref(interpolateStreamData(currentStream.value))

let totalScore = interpolatedStreamData.value.at(-1)?.jokeScore || 0
let minScore = interpolatedStreamData.value.at(-1)?.totalMinusTwo || 0
let maxScore = interpolatedStreamData.value.at(-1)?.totalPlusTwo || 0
let volume = interpolatedStreamData.value.at(-1)?.volume || 0

const lowScore = computed(() => {
  const low = currentStream.value?.jokeScoreLow || 0
  return totalScore < low ? totalScore : low
})

const highScore = computed(() => {
  const high = currentStream.value?.jokeScoreHigh || 0
  return totalScore > high ? totalScore : high
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

const volumeData = computed(() => {
  return interpolatedStreamData.value.map((data) => {
    return { x: data.interval, y: data.volume }
  })
})

const donutChartSeries = computed(() => {
  const high = Math.abs(maxScore)
  const low = Math.abs(minScore)
  return [high, low]
})

const lineChartSeries = computed<ApexAxisChartSeries>(() => {
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

const volumeChartSeries = computed<ApexAxisChartSeries>(() => {
  return [{
    name: 'Volume',
    data: volumeData.value,
  }]
})

function updateChart() {
  if (!currentStream.value)
    return

  const streamUptime = getStreamUptime(currentStream.value)

  const dataPoint = interpolatedStreamData.value.find(p => p.interval === streamUptime)

  if (dataPoint) {
    dataPoint.jokeScore = totalScore
    dataPoint.high = highScore.value
    dataPoint.low = lowScore.value
    dataPoint.close = totalScore
    dataPoint.totalMinusTwo = minScore
    dataPoint.totalPlusTwo = maxScore
    dataPoint.volume = volume
  }
  else {
    volume = 0
    interpolatedStreamData.value.push({
      jokeScore: totalScore,
      high: totalScore,
      low: totalScore,
      open: totalScore,
      close: totalScore,
      totalMinusTwo: minScore,
      totalPlusTwo: maxScore,
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

    volume += 1

    if (message.includes('+2')) {
      totalScore += 2
      maxScore += 2
    }
    else if (message.includes('-2')) {
      totalScore -= 2
      minScore -= 2
    }
  })

  onBeforeUnmount(() => {
    client.disconnect()
  })
})

onMounted(() => {
  const id = setInterval(() => {
    updateChart()
  }, 1000)

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

    <div>
      <LineChart :series="lineChartSeries" />
    </div>

    <div>
      <VolumeChart :series="volumeChartSeries" />
    </div>

    <div>
      <DonutChart :series="donutChartSeries" />
    </div>

    <section>
      <div>
        Total: {{ totalScore }}
      </div>
      <div>
        Min: {{ minScore }}
      </div>
      <div>
        Low: {{ lowScore }}
      </div>
      <div>
        High: {{ highScore }}
      </div>
      <div>
        Max: {{ maxScore }}
      </div>
      <div>
        Sum: {{ maxScore + minScore }}
      </div>
      <div>
        Volume: {{ interpolatedStreamData.at(-1)?.volume }}
      </div>
    </section>
  </UContainer>
</template>

<style scoped>

</style>
