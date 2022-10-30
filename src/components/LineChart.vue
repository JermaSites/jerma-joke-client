<template>
  <ApexChart type="line" height="100%" :options="options" :series="series" />
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
  computed: {
    series () {
      return this.data
    },
    options () {
      return {
        chart: {
          id: 'lineChart',
          animations: {
            enabled: false
          },
          background: '#1E1E1E',
          fontFamily: 'Roboto, sans-serif',
          selection: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        colors: ['#00FF00', '#FF0000'],
        dataLabels: {
          enabled: false
        },
        fill: {
          type: ['gradient', 'solid', 'solid'],
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
        grid: {
          show: true,
          borderColor: '#90A4AE',
          strokeDashArray: 3,
          position: 'back',
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          },
          padding: {
            top: 0,
            right: 8,
            bottom: 0,
            left: 22
          }
        },
        legend: {
          show: true
        },
        markers: {
          size: 0
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
          show: true,
          curve: 'straight',
          lineCap: 'butt',
          width: 3
        },
        theme: {
          mode: 'dark'
        },
        tooltip: {
          enabled: true,
          shared: false,
          followCursor: true,
          intersect: false,
          x: {
            show: false
          },
          marker: {
            show: false
          }
        },
        xaxis: {
          type: 'numeric',
          tickAmount: this.data.length - 1 < 15 ? this.data.length - 1 : 15,
          tickPlacement: 'on',
          labels: {
            formatter (value) {
              const duration = moment.duration(Math.floor(value), 'minutes')
              let hours = Math.floor(duration.asHours())
              let minutes = duration.asMinutes() % 60

              if (hours < 10) {
                hours = `0${hours}`
              }

              if (minutes < 10) {
                minutes = `0${minutes}`
              }

              return `${hours}:${minutes}`
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          opposite: true
        }
      }
    }
  }
}
</script>

<style>

</style>
