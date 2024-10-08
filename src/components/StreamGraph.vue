<template>
  <v-card tile>
    <v-toolbar flat>
      <v-toolbar-title>
        {{ stream.video.title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y left style="z-index: 20">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
            <v-icon v-if="chartType === 'line'">mdi-chart-line</v-icon>
            <v-icon v-if="chartType === 'candlestick'">mdi-chart-waterfall</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="chartType = 'line'">
            <v-list-item-title>Line</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="chartType = 'candlestick'">
            <v-list-item-title>Candlestick</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="primary" @click="xAxisInterval = 1" :outlined="xAxisInterval === 1">
        1m
      </v-btn>
      <v-btn text color="primary" @click="xAxisInterval = 5" :outlined="xAxisInterval === 5">
        5m
      </v-btn>
      <v-btn text color="primary" @click="xAxisInterval = 10" :outlined="xAxisInterval === 10">
        10m
      </v-btn>
      <v-btn icon title="fullscreen" @click="fullscreen = !fullscreen">
        <v-icon>mdi-arrow-expand</v-icon>
      </v-btn>
    </v-toolbar>

    <v-row>
      <v-col>
        <fullscreen v-model="fullscreen">
          <v-responsive :aspect-ratio="16 / 9" style="height: 100%">
            <LineChart :data="lineChartData" @markerClicked="e => $emit('markerClick', e)"
              v-if="chartType === 'line'" />
            <CandlestickChart :data="candlestickData" v-else />
          </v-responsive>
        </fullscreen>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col>
        <v-responsive :aspect-ratio="4 / 3" max-height="200">
          <VolumeChart :data="volumeData" />
        </v-responsive>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <MinMaxPieChart :min="min" :max="max" />
      </v-col>

      <v-col cols="12" sm="6">
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">Score</th>
              <th class="text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <v-tooltip left nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">Total</span>
                  </template>
                  <span>The total score of the stream</span>
                </v-tooltip>
              </td>
              <td>{{ total }}</td>
            </tr>
            <tr>
              <td>
                <v-tooltip left nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">Highest</span>
                  </template>
                  <span>The highest score of the stream</span>
                </v-tooltip>
              </td>
              <td>{{ high }}</td>
            </tr>
            <tr>
              <td>
                <v-tooltip left nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">Lowest</span>
                  </template>
                  <span>The lowest score of the stream</span>
                </v-tooltip>
              </td>
              <td>{{ low }}</td>
            </tr>
            <tr>
              <td>
                <v-tooltip left nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">Total +2</span>
                  </template>
                  <span>Total number of +2's during the stream</span>
                </v-tooltip>
              </td>
              <td>{{ max }}</td>
            </tr>
            <tr>
              <td>
                <v-tooltip left nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">Total -2</span>
                  </template>
                  <span>Total number of -2's during the stream</span>
                </v-tooltip>
              </td>
              <td>{{ min }}</td>
            </tr>
            <tr>
              <td>
                <v-tooltip left nudge-left="10">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">Total Volume</span>
                  </template>
                  <span>Total number of votes during the stream</span>
                </v-tooltip>
              </td>
              <td>{{ totalVolume }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

import moment from 'moment'
import client from '@/plugins/tmi'

export default {
  name: 'StreamGraph',
  components: {
    LineChart: () => import('@/components/LineChart'),
    CandlestickChart: () => import('@/components/CandlestickChart'),
    VolumeChart: () => import('@/components/VolumeChart'),
    MinMaxPieChart: () => import('@/components/MinMaxPieChart')
  },
  data() {
    return {
      fullscreen: false,
      chartType: 'line',
      high: 0,
      low: 0,
      messages: [],
      data: [],
      now: moment(),
      xAxisInterval: 1
    }
  },
  computed: {
    ...mapState('streams', ['stream']),
    volumeData() {
      const allData = this.data.map((d) => ({ x: d.interval, y: d.volume }))
      const chunkedArray = this.chunkArray(allData, this.xAxisInterval)
      return chunkedArray.map((chunk) => {
        const volumeSum = chunk.reduce((a, b) => {
          return a + b.y
        }, 0)
        return {
          x: chunk[chunk.length - 1].x,
          y: volumeSum
        }
      })
    },
    lineChartData() {
      const scoreData = this.data.map((d) => ({
        x: d.interval,
        y: d.jokeScore
      }))
      const chunkedScoreData = this.chunkArray(scoreData, this.xAxisInterval)
      const finalChunkedScoreData = chunkedScoreData.map(
        (chunk) => chunk[chunk.length - 1]
      )

      const minusTwoData = this.data.map((d) => ({
        x: d.interval,
        y: Math.abs(d.totalMinusTwo / 2)
      }))
      const chunkedMinusTwoData = this.chunkArray(
        minusTwoData,
        this.xAxisInterval
      )
      const finalChunkedMinusTwoData = chunkedMinusTwoData.map(
        (chunk) => chunk[chunk.length - 1]
      )

      const plusTwoData = this.data.map((d) => ({
        x: d.interval,
        y: d.totalPlusTwo / 2
      }))
      const chunkedPlusTwoData = this.chunkArray(
        plusTwoData,
        this.xAxisInterval
      )
      const finalChunkedPlusTwoData = chunkedPlusTwoData.map(
        (chunk) => chunk[chunk.length - 1]
      )

      return [
        {
          name: 'Score',
          data: finalChunkedScoreData
        },
        {
          name: 'Minus Two',
          data: finalChunkedMinusTwoData
        },
        {
          name: 'Plus Two',
          data: finalChunkedPlusTwoData
        }
      ]
    },
    candlestickData() {
      const allData = this.data.map((d) => [
        d.interval,
        d.open,
        d.high,
        d.low,
        d.close
      ])
      const chunkedArray = this.chunkArray(allData, this.xAxisInterval)
      let open = 0
      let high = 0
      let close = 0
      let low = 0

      return chunkedArray.map((chunk, i) => {
        open = chunk[0][1]
        high = chunk.map((c) => c[2]).reduce((a, b) => Math.max(a, b))
        low = chunk.map((c) => c[3]).reduce((a, b) => Math.min(a, b))
        close = chunk[chunk.length - 1][4]
        return [i * this.xAxisInterval, open, high, low, close]
      })
    },
    total() {
      return this.messages.reduce((sum, message) => {
        return message.joke ? sum + 2 : sum - 2
      }, this.stream.jokeScoreTotal)
    },
    max() {
      return this.messages.reduce((sum, message) => {
        return message.joke ? sum + 2 : sum
      }, this.stream.jokeScoreMax)
    },
    min() {
      return this.messages.reduce((sum, message) => {
        return message.joke ? sum : sum - 2
      }, this.stream.jokeScoreMin)
    },
    totalVolume() {
      return this.data.reduce((sum, data) => {
        return sum + data.volume
      }, 0)
    },
    streamUpTime() {
      if (this.stream.type === 'live') {
        return this.now.diff(moment(this.stream.startedAt), 'minutes')
      }

      if (this.stream.streamUpTime) return this.stream.streamUpTime

      return this.stream.data[this.stream.data.length - 1].interval
    }
  },
  watch: {
    total(total) {
      if (total > this.high) this.high = total

      if (total < this.low) this.low = total
    }
  },
  created() {
    this.data = this.createData()
    this.high = this.stream.jokeScoreHigh
    this.low = this.stream.jokeScoreLow

    if (this.stream.type === 'live') {
      setInterval(this.updateGraph, 1000)
      client.on('message', this.onMessageHandler)
    }
  },
  methods: {
    test(e) {
      console.log(e)
    },
    chunkArray(arr, chunkSize) {
      const chunkedArray = []
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize)
        chunkedArray.push(chunk)
      }
      return chunkedArray
    },
    createData() {
      const data = []
      let jokeScore = 0
      let high = 0
      let low = 0
      let open = 0
      let close = 0
      let totalMinusTwo = 0
      let totalPlusTwo = 0
      for (let i = 0; i <= this.streamUpTime; i++) {
        const dataPoint = this.stream.data.find((data) => data.interval === i)

        if (dataPoint) {
          jokeScore = dataPoint.jokeScore
          high = dataPoint.high
          low = dataPoint.low
          open = dataPoint.open
          close = dataPoint.close
          totalMinusTwo = dataPoint.totalMinusTwo
          totalPlusTwo = dataPoint.totalPlusTwo
          data.push(dataPoint)
        } else {
          data.push({
            jokeScore,
            high,
            low,
            open,
            close,
            totalMinusTwo,
            totalPlusTwo,
            interval: i,
            volume: 0
          })
        }
      }

      return data
    },
    onMessageHandler(channel, userstate, message, self) {
      const score =
        message.match(/(?<!\S)[+-]2(?!\S)/g) ||
        message.match(/(?<!\S)jermaPlus2(?!\S)/g) ||
        message.match(/(?<!\S)jermaMinus2(?!\S)/g)

      if (!score) return

      userstate.joke = score.includes('+2') || score.includes('jermaPlus2')
      userstate.msg = message
      this.messages.push(userstate)
      const dataPoint = this.data.find(
        (data) => data.interval === this.streamUpTime
      )
      if (dataPoint) {
        dataPoint.volume += 1
      }
    },
    updateGraph() {
      this.now = moment()
      const dataPoint = this.data.find(
        (data) => data.interval === this.streamUpTime
      )

      if (dataPoint) {
        dataPoint.jokeScore = this.total
        dataPoint.high =
          dataPoint.jokeScore > dataPoint.high
            ? dataPoint.jokeScore
            : dataPoint.high

        dataPoint.low =
          dataPoint.jokeScore < dataPoint.low
            ? dataPoint.jokeScore
            : dataPoint.low

        dataPoint.close = dataPoint.jokeScore

        dataPoint.totalMinusTwo = this.min

        dataPoint.totalPlusTwo = this.max
      } else {
        this.data.push({
          jokeScore: this.total,
          high: this.total,
          low: this.total,
          open: this.total,
          close: this.total,
          totalMinusTwo: this.min,
          totalPlusTwo: this.max,
          interval: this.streamUpTime,
          volume: 0
        })
      }
    }
  }
}
</script>

<style></style>
