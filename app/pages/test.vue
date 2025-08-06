<script setup lang="ts">
const seriesData = reactive([23, 34, 12, 54, 32, 43])

const series = [{
  name: 'Test',
  data: seriesData,
}]

function getRandomIntInclusive(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const chartRef = useTemplateRef('chart')

// onMounted(() => {
//   const intervalId = setInterval(() => {
//     seriesData.push(getRandomIntInclusive(10, 50))

//     chartRef.value.updateSeries([{
//       data: seriesData,
//     }])
//   }, 2000)

//   onBeforeUnmount(() => clearInterval(intervalId))
// })

onMounted(() => {
  const intervalId = setInterval(() => {
    seriesData.push(getRandomIntInclusive(10, 50))
  }, 2000)

  onBeforeUnmount(() => clearInterval(intervalId))
})
</script>

<template>
  <div>
    <ClientOnly>
      <apexchart
        ref="chart"
        type="line"
        :options="{}"
        :series="series"
      />
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
