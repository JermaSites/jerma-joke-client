<script setup lang="ts">
const route = useRoute()
const streamStore = useStreamStore()

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

await callOnce('stream', () => streamStore.fetchStream(streamId.value))

const stream = streamStore.getStreamById(streamId.value)

const interpolatedStreamData = computed(() => {
  return interpolateStreamData(stream.value)
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

const series = ref<ApexAxisChartSeries>([
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
])
</script>

<template>
  <UContainer class="py-4 sm:py-6 lg:py-8">
    <LineChart :series="series" />
  </UContainer>
</template>

<style scoped>

</style>
