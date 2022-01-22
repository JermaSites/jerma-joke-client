<template>
  <ApexChart type="bar" height="100%" :series="series" :options="options" />
</template>

<script>
import moment from 'moment'

export default {
  name: 'VolumeChart',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    series () {
      return [{
        name: 'Volume',
        data: this.data
      }]
    },
    options () {
      return {
        chart: {
          id: 'volumeChart',
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
        dataLabels: {
          enabled: false
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
          show: false
        },
        markers: {
          size: 0
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: '100%',
            barHeight: '100%'
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
          followCursor: false,
          intersect: false,
          x: {
            show: true
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
          show: true,
          opposite: true
        }
      }
    }
  }
}
</script>

<style>

</style>
