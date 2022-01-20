<template>
<div>
  <h1>Test Page</h1>
  <v-btn @click="toggleData">Toggle Series</v-btn>
  <ApexChart :type="type" :series="series1" :options="options" />
</div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      toggle: false,
      type: 'line',
      data: [1, 3, 9, 12, 4, 16],
      options: {
        chart: {
          animations: {
            enabled: false
          }
        }
      }
    }
  },
  computed: {
    series () {
      if (this.toggle) return this.series1
      return this.series2
    },
    series1 () {
      return [{
        name: 'Test 1',
        data: this.data
      }]
    },
    series2 () {
      return [{
        name: 'Test 2',
        data: this.data
      }]
    }
  },
  methods: {
    toggleData () {
      this.toggle = !this.toggle
      this.type === 'line' ? this.type = 'bar' : this.type = 'line'
    }
  },
  mounted () {
    setInterval(() => {
      const copy = this.data.slice()
      copy[copy.length - 1] = Math.floor(Math.random() * 20)
      this.data = copy
    }, 500)
  }
}
</script>

<style>

</style>
