<template>
  <ApexChart type="line" height="500" :options="options" :series="series" />
</template>

<script>
export default {
  name: 'LineChart',
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
          id: 'jokeLineChart',
          background: '#424242',
          fontFamily: 'Roboto, sans-serif',
          zoom: {
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
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            colorStops: [
              {
                offset: 0,
                color: '#1feaea',
                opacity: 1
              },
              {
                offset: 50,
                color: '#ffd200',
                opacity: 1
              },
              {
                offset: 100,
                color: '#f72047',
                opacity: 1
              }
            ]
          }
        },
        responsive: [{
          breakpoint: this.$vuetify.breakpoint.thresholds.xs,
          options: {
            xaxis: {
              tickAmount: 5
            }
          }
        }],
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
  }
}
</script>

<style>

</style>
