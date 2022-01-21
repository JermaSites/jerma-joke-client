<template>
  <ApexChart type="bar" height="200" :series="series" :options="options" />
</template>

<script>
import moment from 'moment'

export default {
  name: 'VolumeChart',
  props: {
    series: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    options () {
      return {
        chart: {
          id: 'volumeChart',
          animations: {
            enabled: false
          },
          background: '#1E1E1E',
          fontFamily: 'Roboto, sans-serif',
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
        responsive: [{
          breakpoint: this.$vuetify.breakpoint.thresholds.xs,
          options: {
            xaxis: {
              tickAmount: this.series[0].data.length - 1 < 5 ? this.series[0].data.length - 1 : 5
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
          tickAmount: this.series[0].data.length - 1 < 15 ? this.series[0].data.length - 1 : 15,
          title: {
            text: 'Time'
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
