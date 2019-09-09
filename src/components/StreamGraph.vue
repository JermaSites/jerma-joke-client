<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        {{ stream.video.title }}
      </v-toolbar-title>
    </v-toolbar>

    <LineChart :data="dataPoints" />

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
              <td>Total</td>
              <td>{{ total }}</td>
            </tr>
            <tr>
              <td>Highest</td>
              <td>{{ high }}</td>
            </tr>
            <tr>
              <td>Lowest</td>
              <td>{{ low }}</td>
            </tr>
            <tr>
              <td>Maximum</td>
              <td>{{ max }}</td>
            </tr>
            <tr>
              <td>Minimum</td>
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
    MinMaxPieChart: () => import('@/components/MinMaxPieChart')
  },
  data () {
    return {
      high: 0,
      low: 0,
      messages: [],
      data: [],
      now: moment()
    }
  },
  computed: {
    ...mapState('streams', ['stream']),
    dataPoints () {
      return this.data.map(d => d.jokeScore)
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
      if (this.stream.type === 'live') return this.now.diff(moment(this.stream.startedAt), 'minutes')

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
    createData () {
      const data = []
      let jokeScore = 0
      for (let i = 0; i <= this.streamUpTime; i++) {
        const dataPoint = this.stream.data.find(data => data.interval === i)
        if (dataPoint) {
          jokeScore = dataPoint.jokeScore
          data.push(dataPoint)
        } else {
          data.push({
            jokeScore: jokeScore,
            interval: i
          })
        }
      }

      return data
    },
    onMessageHandler (channel, userstate, message, self) {
      if (message.includes('+2')) {
        userstate.joke = true
        userstate.message = message
        this.messages.push(userstate)
      } else if (message.includes('-2')) {
        userstate.joke = false
        userstate.message = message
        this.messages.push(userstate)
      }
    },
    updateGraph () {
      this.now = moment()
      const dataPointIndex = this.data.findIndex(data => data.interval === this.streamUpTime)

      if (dataPointIndex !== -1) {
        this.data[dataPointIndex].jokeScore = this.total
      } else {
        this.data.push({
          jokeScore: this.total,
          interval: this.streamUpTime
        })
      }
    }
  }
}
</script>

<style>

</style>
