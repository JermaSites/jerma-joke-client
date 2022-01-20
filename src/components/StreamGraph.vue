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
            <v-icon v-if="chartType === 'candlestick'"
              >mdi-chart-waterfall</v-icon
            >
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

      <v-btn text color="primary"  @click="xAxisInterval = 1" :outlined="xAxisInterval === 1">
        1m
      </v-btn>
      <v-btn text color="primary" @click="xAxisInterval = 5" :outlined="xAxisInterval === 5">
        5m
      </v-btn>
      <v-btn text color="primary" @click="xAxisInterval = 10" :outlined="xAxisInterval === 10">
        10m
      </v-btn>
      <!-- <v-menu offset-y left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
            <v-icon>mdi-sort-clock-ascending-outline</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="xAxisInterval = 1">
            <v-list-item-title>1 Min</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="xAxisInterval = 5">
            <v-list-item-title>5 Min</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="xAxisInterval = 10">
            <v-list-item-title>10 Min</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-toolbar>

    <LineChart :data="lineChartData" v-if="chartType === 'line'" />
    <Candlestick :data="candlestickData" v-if="chartType === 'candlestick'" />

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
import { setInterval } from 'timers'

export default {
  name: 'StreamGraph',
  components: {
    LineChart: () => import('@/components/LineChart'),
    Candlestick: () => import('@/components/Candlestick'),
    MinMaxPieChart: () => import('@/components/MinMaxPieChart')
  },
  data () {
    return {
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
    lineChartData () {
      const allData = this.data.map((d) => ({ x: d.interval, y: d.jokeScore }))
      const chunkedArray = this.chunkArray(allData, this.xAxisInterval)

      return chunkedArray.map((chunk) => chunk[chunk.length - 1])
    },
    candlestickData () {
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
    total () {
      return this.messages.reduce((sum, message) => {
        return message.joke ? sum + 2 : sum - 2
      }, this.stream.jokeScoreTotal)
    },
    max () {
      return this.messages.reduce((sum, message) => {
        return message.joke ? sum + 2 : sum
      }, this.stream.jokeScoreMax)
    },
    min () {
      return this.messages.reduce((sum, message) => {
        return message.joke ? sum : sum - 2
      }, this.stream.jokeScoreMin)
    },
    streamUpTime () {
      if (this.stream.type === 'live') {
        return this.now.diff(moment(this.stream.startedAt), 'minutes')
      }

      if (this.stream.streamUpTime) return this.stream.streamUpTime

      return this.stream.data[this.stream.data.length - 1].interval
    }
  },
  watch: {
    total (total) {
      if (total > this.high) this.high = total

      if (total < this.low) this.low = total
    }
  },
  created () {
    this.data = this.createData()
    this.high = this.stream.jokeScoreHigh
    this.low = this.stream.jokeScoreLow

    if (this.stream.type === 'live') {
      setInterval(this.updateGraph, 1000)
      client.on('message', this.onMessageHandler)
    }
  },
  methods: {
    chunkArray (arr, chunkSize) {
      const chunkedArray = []
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize)
        chunkedArray.push(chunk)
      }
      return chunkedArray
    },
    createData () {
      const data = []
      let jokeScore = 0
      let high = 0
      let low = 0
      let open = 0
      let close = 0
      for (let i = 0; i <= this.streamUpTime; i++) {
        const dataPoint = this.stream.data.find((data) => data.interval === i)

        if (dataPoint) {
          jokeScore = dataPoint.jokeScore
          high = dataPoint.high
          low = dataPoint.low
          open = dataPoint.open
          close = dataPoint.close
          data.push(dataPoint)
        } else {
          data.push({
            jokeScore,
            high,
            low,
            open,
            close,
            interval: i
          })
        }
      }

      return data
    },
    onMessageHandler (channel, userstate, message, self) {
      const plus2Emote = 'jermaPlus2'
      const minus2Emote = 'jermaMinus2'

      const score =
        message.match(/(?<=^|\s)[+-]2(?=$|\s)/g) ||
        message.includes(plus2Emote) ||
        message.includes(minus2Emote)

      if (!score) return

      userstate.joke = score.includes('+2') || score.includes(plus2Emote)
      userstate.msg = message
      this.messages.push(userstate)
    },
    updateGraph () {
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
      } else {
        this.data.push({
          jokeScore: this.total,
          high: this.total,
          low: this.total,
          open: this.total,
          close: this.total,
          interval: this.streamUpTime
        })
      }
    }
  }
}
</script>

<style></style>
