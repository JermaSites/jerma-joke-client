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
          background: '#424242',
          fontFamily: 'Roboto, sans-serif',
          zoom: {
            type: 'xy',
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
        stroke: {
          curve: 'smooth',
          width: 3
        },
        theme: {
          mode: 'dark'
        },
        xaxis: {
          type: 'numeric',
          tickAmount: 15,
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
