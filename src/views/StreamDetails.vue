<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card :loading="loading">
          <v-sparkline
            v-if="!loading"
            :gradient="gradient"
            :line-width="2"
            :smooth="radius || false"
            :value="graphValues"
            :labels="labels"
            :label-size="2"
            auto-draw
          ></v-sparkline>

          <div v-else style="height: 300px">

          </div>

          <v-card-text>
            <h1>Joke Score: {{ jokeScoreTotal }}</h1>
          </v-card-text>

          <v-card-text>
            <h1>Min: {{ jokeScoreMin }}</h1>

          </v-card-text>

          <v-card-text>
            <h1>Max: {{ jokeScoreMax }}</h1>
          </v-card-text>

          <v-card-text>
            <h1>Low: {{ jokeScoreLow }}</h1>

          </v-card-text>

          <v-card-text>
            <h1>High: {{ jokeScoreHigh }}</h1>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'

import client from '@/plugins/tmi'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'StreamDetails',
  props: {
    streamID: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      radius: 10,
      gradient: ['#f72047', '#ffd200', '#1feaea'],
      messages: [],
      min: 0,
      max: 0,
      high: 0,
      low: 0,
      total: 0,
      dataPoints: [],
      updateInterval: null
    }
  },
  computed: {
    ...mapState(['stream']),
    graphValues () {
      return this.dataPoints.map(data => data.jokeScore)
    },
    streamUpTime () {
      if (this.stream.streamUpTime) return this.stream.streamUpTime

      if (this.stream.type === 'live') return moment().diff(moment(this.stream.startedAt), 'minutes')

      return this.stream.data[this.stream.data.length - 1].interval
    },
    jokeScoreTotal () {
      return this.total + this.stream.jokeScoreTotal
    },
    jokeScoreMin () {
      return this.min + this.stream.jokeScoreMin
    },
    jokeScoreMax () {
      return this.max + this.stream.jokeScoreMax
    },
    jokeScoreHigh () {
      return this.high + this.stream.jokeScoreHigh
    },
    jokeScoreLow () {
      return this.low + this.stream.jokeScoreLow
    }
  },
  async created () {
    try {
      client.on('message', this.onMessageHandler)
      this.loading = true
      await this.fetchStream(this.streamID)
      this.dataPoints = this.calcDataPoints()
      if (this.stream.type === 'live') setInterval(this.updateGraph, 1 * 60 * 1000)
    } catch (error) {
      console.error('Failed to fetch stream:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    ...mapActions(['fetchStream']),
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
      // Calculate the total joke score so far
      this.total = this.messages.reduce((sum, message) => {
        return message.joke ? sum + 2 : sum - 2
      }, 0)

      this.min = this.messages.reduce((sum, message) => {
        return message.joke ? sum : sum - 2
      }, 0)

      this.max = this.messages.reduce((sum, message) => {
        return message.joke ? sum + 2 : sum
      }, 0)

      this.high = 0
      this.messages.reduce((sum, message) => {
        message.joke ? sum += 2 : sum -= 2
        if (sum > this.high) this.high = sum
        return sum
      }, 0)

      this.low = 0
      this.messages.reduce((sum, message) => {
        message.joke ? sum += 2 : sum -= 2
        if (sum < this.low) this.low = sum
        return sum
      }, 0)
    },
    updateGraph () {
      this.analyseMessages()
      this.dataPoints.push({
        jokeScore: this.jokeScoreTotal
      })
    }
  }
}
</script>

<style>

</style>
