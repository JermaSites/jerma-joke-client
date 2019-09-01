<template>
  <v-card>
    <v-toolbar
      flat
      dense
    >
      <v-toolbar-title>
        {{ stream.title }}
      </v-toolbar-title>
    </v-toolbar>

    <v-sparkline
      :gradient="gradient"
      :line-width="1"
      :smooth="false"
      :value="graphValues"
      auto-draw
    ></v-sparkline>

    <v-list>
      <v-list-item>
        <v-list-item-title>Joke Score</v-list-item-title>

        <v-list-item-subtitle class="text-right">
          {{ total }}
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Min</v-list-item-title>

        <v-list-item-subtitle class="text-right">
          {{ min }}
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Max</v-list-item-title>

        <v-list-item-subtitle class="text-right">
          {{ max }}
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Low</v-list-item-title>

        <v-list-item-subtitle class="text-right">
          {{ low }}
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>High</v-list-item-title>

        <v-list-item-subtitle class="text-right">
          {{ high }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import moment from 'moment'
import client from '@/plugins/tmi'

export default {
  name: 'StreamGraph',
  props: {
    stream: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      messages: [],
      min: 0,
      max: 0,
      high: 0,
      low: 0,
      total: 0,
      dataPoints: [],
      now: moment(),
      radius: 10,
      gradient: ['#f72047', '#ffd200', '#1feaea']
    }
  },
  computed: {
    graphValues () {
      return this.dataPoints.map(data => data.jokeScore)
    },
    streamUpTime () {
      if (this.stream.type === 'live') return this.now.diff(moment(this.stream.startedAt), 'minutes')

      if (this.stream.streamUpTime) return this.stream.streamUpTime

      return this.stream.data[this.stream.data.length - 1].interval
    }
  },
  created () {
    this.total = this.stream.jokeScoreTotal
    this.min = this.stream.jokeScoreMin
    this.max = this.stream.jokeScoreMax
    this.high = this.stream.jokeScoreHigh
    this.low = this.stream.jokeScoreLow

    this.dataPoints = this.calcDataPoints()

    if (this.stream.type === 'live') {
      console.log('Stream is live')
      setInterval(this.updateGraph, 5000)
      client.on('message', this.onMessageHandler)
    }
  },
  methods: {
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
    calcDataPoints () {
      const data = this.stream.data.slice().reverse()
      const dataPoints = []
      let jokeScore = 0
      for (let i = 0; i <= this.streamUpTime; i++) {
        const dataPoint = data.find(data => data.interval === i)
        if (dataPoint) {
          jokeScore = dataPoint.jokeScore
          dataPoints.push(dataPoint)
        } else {
          dataPoints.push({
            jokeScore: jokeScore,
            interval: i
          })
        }
      }

      return dataPoints
    },
    analyseMessages () {
      this.total = this.messages.reduce((sum, message) => {
        return message.joke ? sum + 2 : sum - 2
      }, this.stream.jokeScoreTotal)

      this.min = this.messages.reduce((sum, message) => {
        return message.joke ? sum : sum - 2
      }, this.stream.jokeScoreMin)

      this.max = this.messages.reduce((sum, message) => {
        return message.joke ? sum + 2 : sum
      }, this.stream.jokeScoreMax)

      this.messages.reduce((sum, message) => {
        message.joke ? sum += 2 : sum -= 2
        if (sum > this.high) this.high = sum
        return sum
      }, this.stream.jokeScoreTotal)

      this.messages.reduce((sum, message) => {
        message.joke ? sum += 2 : sum -= 2
        if (sum < this.low) this.low = sum
        return sum
      }, this.stream.jokeScoreTotal)
    },
    updateGraph () {
      this.now = moment()
      this.analyseMessages()

      const dataPointIndex = this.dataPoints.findIndex(data => data.interval === this.streamUpTime)

      if (dataPointIndex !== -1) {
        this.dataPoints[dataPointIndex].jokeScore = this.total
      } else {
        this.dataPoints.push({
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
