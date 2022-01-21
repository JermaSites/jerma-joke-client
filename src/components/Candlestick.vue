<template>
  <ApexChart
    type="candlestick"
    height="500"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
import moment from 'moment'
export default {
  name: 'Candlestick',
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
      chartOptions: {
        chart: {
          id: 'jokeLineChart',
          animations: {
            enabled: false
          },
          background: '#1E1E1E',
          fontFamily: 'Roboto, sans-serif',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false,
            type: 'x',
            autoScaleYaxis: true,
            zoomedArea: {
              fill: {
                color: this.$vuetify.theme.themes.dark.primary
              },
              stroke: {
                color: this.$vuetify.theme.themes.dark.secondary
              }
            }
          }
        },
        responsive: [{
          breakpoint: this.$vuetify.breakpoint.thresholds.xs,
          options: {
            xaxis: {
              tickAmount: this.data.length - 1 < 5 ? this.data.length - 1 : 5
            }
          }
        }],
        theme: {
          mode: 'dark'
        },
        xaxis: {
          type: 'numeric',
          labels: {
            formatter (value) {
              const duration = moment.duration(Math.floor(value), 'minutes')
              return moment.utc(duration.asMilliseconds()).format('HH:mm')
            }
          },
          tickAmount: this.data.length - 1 < 15 ? this.data.length - 1 : 15,
          title: {
            text: 'Time'
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
  }
}
</script>

<style>
</style>
