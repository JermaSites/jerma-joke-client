<template>
  <ApexChart type="area" height="300" :options="options" :series="series" />
</template>

<script>
export default {
  name: 'BrushChart',
  components: {
    ApexChart: () => import('vue-apexcharts')
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      options: {
        chart: {
          id: 'jokeBrushChart',
          background: '#424242',
          fontFamily: 'Roboto, sans-serif',
          brush: {
            target: 'jokeLineChart',
            enabled: true
          },
          selection: {
            enabled: true
          }
        },
        fill: {
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        theme: {
          mode: 'dark'
        },
        xaxis: {
          type: 'numeric',
          labels: {
            formatter (value) {
              return Math.floor(value - 1)
            }
          },
          tickAmount: 10,
          title: {
            text: 'Time in Minutes'
          }
        },
        yaxis: {
          title: {
            text: 'Score'
          }
        }
      }
    }
  },
  computed: {
    series () {
      return [{
        name: 'Score',
        data: this.data
      }]
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
