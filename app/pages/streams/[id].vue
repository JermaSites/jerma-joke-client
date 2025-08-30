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

const totalScore = ref(currentStream.value?.jokeScoreTotal || 0)
const minScore = ref(currentStream.value?.jokeScoreMin || 0)
const maxScore = ref(currentStream.value?.jokeScoreMax || 0)
const high = ref(currentStream.value?.jokeScoreHigh || 0)
const low = ref(currentStream.value?.jokeScoreLow || 0)
const volume = ref(interpolatedStreamData.value.at(-1)?.volume || 0)

const lowScore = computed(() => {
  return totalScore.value < low.value ? totalScore.value : low.value
})

const highScore = computed(() => {
  return totalScore.value > high.value ? totalScore.value : high.value
})

const totalVolume = computed(() => {
  return interpolatedStreamData.value.reduce((sum, data) => {
    return sum + data.volume
  }, 0)
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
  const high = Math.abs(maxScore.value)
  const low = Math.abs(minScore.value)
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
    dataPoint.jokeScore = totalScore.value
    dataPoint.high = highScore.value
    dataPoint.low = lowScore.value
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

onMounted(() => {
  const client = new tmi.Client({
    channels: [twitchChannelName],
  })

  client.connect()

  client.on('message', (_channel, _usersate, message, _self) => {
    const score
        = message.match(/(?<!\S)[+-]2(?!\S)/g)
          || message.match(/(?<!\S)jermaPlus2(?!\S)/g)
          || message.match(/(?<!\S)jermaMinus2(?!\S)/g)

    if (!score)
      return

    volume.value += 1

    if (score.includes('+2') || score.includes('jermaPlus2')) {
      totalScore.value += 2
      maxScore.value += 2
    }
    else {
      totalScore.value -= 2
      minScore.value -= 2
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

const tableData = computed(() => ([
  {
    score: 'Total',
    value: totalScore.value,
  },
  {
    score: 'Highest',
    value: highScore.value,
  },
  {
    score: 'Lowest',
    value: lowScore.value,
  },
  {
    score: 'Total +2',
    value: maxScore.value,
  },
  {
    score: 'Total -2',
    value: minScore.value,
  },
  {
    score: 'Total Volume',
    value: totalVolume.value,
  },
]))
</script>

<template>
  <UContainer class="py-4 sm:py-6 lg:py-8 ">
    <UBreadcrumb :items="items" />

    <div class="py-4 text-4xl">
      {{ streamStore.currentStream?.title }}
    </div>

    <div class="px-4 bg-stone-950">
      <LineChart :series="lineChartSeries" />
    </div>

    <div class="px-4 bg-stone-950">
      <VolumeChart :series="volumeChartSeries" />
    </div>

    <section class="grid grid-cols-2 p-4 bg-stone-950">
      <div class="flex justify-center items-center">
        <DonutChart :series="donutChartSeries" />
      </div>

      <div>
        <UTable :data="tableData" />
      </div>
    </section>
  </UContainer>
</template>

<style scoped>

</style>
