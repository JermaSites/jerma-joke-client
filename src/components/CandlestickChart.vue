<template>
  <ApexChart
    type="candlestick"
    height="100%"
    :options="options"
    :series="series"
  />
</template>

<script>
import moment from 'moment'
export default {
  name: 'CandlestickChart',
  components: {
    ApexChart: () => import('vue-apexcharts')
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    series () {
      return [{
        name: 'Score',
        data: this.data
      }]
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
          candlestick: {
            colors: {
              upward: '#00B746',
              downward: '#EF403C'
            },
            wick: {
              useFillColor: true
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
