<script setup lang="ts">
import type { ApexOptions } from 'apexcharts'
import colors from 'tailwindcss/colors'

defineProps<{
  series: number[]
}>()

const options = reactive<ApexOptions>({
  chart: {
    animations: {
      enabled: false,
    },
    background: colors.stone[950],
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  theme: {
    mode: 'dark',
  },
  colors: [
    colors.green[700],
    colors.red[700],
  ],
  stroke: {
    colors: [colors.green[400], colors.red[400]],
  },
  labels: ['Total +2', 'Total -2'],
  plotOptions: {
    pie: {
      expandOnClick: false,
      // startAngle: -90,
      // endAngle: 90,
      // offsetY: 10,
      donut: {
        labels: {
          show: true,
          name: {
            color: 'white',
          },
          value: {
            show: true,
          },
          total: {
            show: true,
            formatter(w) {
              return (w.config.series[0] - w.config.series[1]).toString()
            },
          },
        },
      },
    },
  },
})
</script>

<template>
  <div>
    <ClientOnly>
      <apexchart type="donut" height="300" :options="options" :series="series" />
    </ClientOnly>
  </div>
</template>
