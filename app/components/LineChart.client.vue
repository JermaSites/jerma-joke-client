<script setup lang="ts">
import type { ApexOptions } from 'apexcharts'
import colors from 'tailwindcss/colors'

const props = defineProps<{
  series: ApexAxisChartSeries
}>()

const { $dayjs: dayjs } = useNuxtApp()

const seriesLength = computed(() => {
  return props.series.at(0)?.data.length || 0
})

const options = ref<ApexOptions>({
  chart: {
    type: 'line',
    animations: {
      enabled: false,
    },
    background: colors.stone[950],
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
  colors: [colors.amber[400], colors.green[500], colors.red[500]],
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: ['soild', 'solid', 'solid'],
  },
  grid: {
    show: true,
    borderColor: colors.stone[400],
    strokeDashArray: 2,
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
    tickAmount: seriesLength.value - 1 < 15 ? seriesLength.value - 1 : 15,
    tickPlacement: 'on',
    labels: {
      formatter(value) {
        return dayjs.duration(Number.parseInt(value), 'm').format('HH:mm')
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    opposite: true,
    tooltip: {
      enabled: true,
    },
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
