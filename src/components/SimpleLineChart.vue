<template>
  <ApexChart type="line" height="500" :series="series" :options="options" />
</template>

<script>
export default {
  props: {
    series: {
      type: Array,
      default: () => ([{
        data: [1, 2, 3, 4, 5]
      }])
    }
  },
  data () {
    return {
      options: {
        chart: {
          animations: {
            enabled: false
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
