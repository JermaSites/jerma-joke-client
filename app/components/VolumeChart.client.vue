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

const options = reactive<ApexOptions>({
  chart: {
    id: 'volumeChart',
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
  dataLabels: {
    enabled: false,
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
  },
  legend: {
    show: true,
  },
  markers: {
    size: 0,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '100%',
      barHeight: '100%',
    },
  },
  stroke: {
    show: true,
    curve: 'straight',
    lineCap: 'butt',
    width: 3,
  },
  theme: {
    mode: 'dark',
  },
  tooltip: {
    enabled: true,
    shared: false,
    followCursor: false,
    intersect: false,
    x: {
      show: true,
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
    show: false,
    opposite: true,
  },
})
</script>

<template>
  <apexchart type="bar" height="200px" :series="series" :options="options" />
</template>

<style scoped>

</style>
