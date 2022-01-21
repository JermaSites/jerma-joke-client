<template>
  <ApexChart type="line" height="500" :options="options" :series="series" />
</template>

<script>
import moment from 'moment'

export default {
  name: 'LineChart',
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
              tickAmount: this.data.length - 1 < 5 ? this.data.length - 1 : 5
            }
          }
        }],
        stroke: {
          curve: 'straight',
          lineCap: 'butt',
          width: 3
        },
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
