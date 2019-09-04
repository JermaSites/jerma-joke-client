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

    <LineChart :data="graphValues" />

    <v-row>
      <v-col>
        <MinMaxPieChart :min="min" :max="max" />
      </v-col>
      <v-col>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">Score</th>
              <th class="text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Highest Score</td>
              <td>{{ high }}</td>
            </tr>
            <tr>
              <td>Lowest Score</td>
              <td>{{ low }}</td>
            </tr>
            <tr>
              <td>Maximum Score</td>
              <td>{{ max }}</td>
            </tr>
            <tr>
              <td>Minimum Score</td>
              <td>{{ min }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from 'moment'
import client from '@/plugins/tmi'

export default {
  name: 'StreamGraph',
  components: {
    LineChart: () => import('@/components/LineChart'),
    MinMaxPieChart: () => import('@/components/MinMaxPieChart')
  },
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
      now: moment()
    }
  },
  computed: {
    graphLabels () {
      return this.dataPoints.map(data => data.interval)
    },
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
    addData () {
      this.dataPoints.push({
        jokeScore: this.dataPoints[this.dataPoints.length - 1].jokeScore - 200,
        interval: this.dataPoints[this.dataPoints.length - 1].interval + 1
      })
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
