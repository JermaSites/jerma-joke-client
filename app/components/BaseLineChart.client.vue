<script setup lang="ts">
import type { ApexOptions } from 'apexcharts'

const { options = {} } = defineProps<{
  options?: ApexOptions
  series: ApexAxisChartSeries
}>()
</script>

<template>
  <apexchart
    type="line"
    :options="options"
    :series="series"
  />
</template>
