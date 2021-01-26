<template>
  <ApexChart type="donut" height="300" :options="options" :series="series" />
</template>

<script>
export default {
  name: 'MinMaxPieChart',
  components: {
    ApexChart: () => import('vue-apexcharts')
  },
  props: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      options: {
        legend: {
          show: false
        },
        tooltip: {
          enabled: false
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              labels: {
                show: true,
                name: {
                  color: 'white'
                },
                value: {
                  show: true,
                  formatter (value, w) {
                    return +value === w.config.series[0] ? w.config.series[0] * -1 : w.config.series[1]
                  }
                },
                total: {
                  show: true,
                  formatter (w) {
                    return w.config.series[1] - w.config.series[0]
                  }
                }
              }
            }
          }
        },
        chart: {
          animations: {
            enabled: false
          },
          background: '#1E1E1E',
          fontFamily: 'Roboto, sans-serif'
        },
        theme: {
          mode: 'dark'
        },
        colors: [this.$vuetify.theme.themes.dark.primary, this.$vuetify.theme.themes.dark.secondary],
        stroke: {
          colors: ['red', 'green']
        },
        labels: ['Min', 'Max']
      }
    }
  },
  computed: {
    series () {
      const min = Math.abs(this.min)
      const max = Math.abs(this.max)
      return [min, max]
    }
  }
}
</script>

<style>

</style>
