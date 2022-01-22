<template>
<div>
  <v-btn @click="type = 'line'">Line</v-btn>
  <v-btn @click="type = 'candlestick'">Candle</v-btn>
  <v-btn @click="type = 'bar'">Bar</v-btn>
  <SimpleLineChart v-if="type === 'line'" :series="lineSeries" />
  <ApexChart v-if="type === 'candlestick'" type="candlestick" height="500" :series="candlestickSeries" :options="options" />
  <ApexChart type="bar" height="250" :series="candlestickBarSeries" :options="options" />
</div>
</template>

<script>
import SimpleLineChart from '@/components/SimpleLineChart'

export default {
  name: 'TestPage',
  components: {
    SimpleLineChart
  },
  data () {
    return {
      toggle: false,
      type: 'candlestick',
      lineData: [2, 6, 2, 4, 9],
      volumeData: [],
      candlestickData: [
        [
          1,
          17,
          11,
          18,
          16
        ],
        [
          2,
          3,
          5,
          19,
          11
        ],
        [
          3,
          7,
          16,
          2,
          7
        ],
        [
          4,
          4,
          6,
          17,
          10
        ],
        [
          5,
          10,
          8,
          15,
          7
        ]
      ],
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
      if (this.type === 'line') {
        return this.lineSeries
      } else if (this.type === 'candlestick') {
        return this.candlestickSeries
      }
      return this.lineSeries
    },
    lineSeries () {
      return [{
        name: 'Test 1',
        data: this.lineData
      }]
    },
    lineChartData () {
      return {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20]
          }
        ]
      }
    },
    lineWithBarSeries () {
      return [
        {
          name: 'Score',
          type: 'line',
          data: this.lineData
        },
        {
          name: 'Volume',
          type: 'column',
          data: this.volumeData
        }
      ]
    },
    candlestickSeries () {
      return [{
        name: 'Candlestick score',
        type: 'candlestick',
        data: this.candlestickData
      }]
    },
    candlestickBarSeries () {
      return [
        {
          data: this.candlestickData.map(d => d[4])
        }
      ]
    }
  },
  methods: {
  },
  mounted () {
    for (let i = 0; i < 100; i++) {
      this.lineData.push(Math.floor(Math.random() * 20))
      this.volumeData.push(Math.floor(Math.random() * 20))
      this.candlestickData.push([this.candlestickData.length + 1, Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)])
    }
    // setInterval(() => {
    //   this.lineData.push(Math.floor(Math.random() * 20))
    //   this.volumeData.push(Math.floor(Math.random() * 20))
    //   this.candlestickData.push([this.candlestickData.length + 1, Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)])
    // }, 100)
  }
}
</script>

<style>

</style>
