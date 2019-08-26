<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-sparkline
            :gradient="gradient"
            :line-width="2"
            :smooth="radius || false"
            :value="value"
            :labels="labels"
            :label-size="2"
            auto-draw
          ></v-sparkline>

          <v-card-text>
            <h1>Joke Tally: {{ currentJokeTally }}</h1>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import firebase from '../plugins/firebase'
import { mapState, mapGetters } from 'vuex'

const db = firebase.firestore()

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
      value: [0, 0],
      labels: [],
      timeScale: 1,
      ticksLabels: ['1', '3', '5', '10']
    }
  },
  computed: {
    ...mapState(['messages', 'streams']),
    ...mapGetters(['getStream']),
    currentJokeTally () {
      return this.value.slice(-1)[0]
    }
  },
  async created () {
    try {
      this.loading = true
      db.collection('streams').doc(`${this.streamID}`).onSnapshot(docSnapshot => {
        console.log('Data updated')
        const streamData = docSnapshot.data()
        const { condensedData } = streamData

        if (!condensedData) return

        let totalTime = 0
        if (streamData.streamUpTime) {
          totalTime = streamData.streamUpTime
        } else
        if (streamData.type === 'live') {
          const streamStartedAt = moment(streamData.started_at)
          totalTime = moment().diff(streamStartedAt, 'minutes')
        } else {
          totalTime = condensedData[condensedData.length - 1].messagePostTime
        }

        let finalArr = []
        let jokeTotal = 0
        for (let i = 0; i < totalTime; i++) {
          const val = condensedData.find(e => e.messagePostTime === i)
          if (val) {
            jokeTotal = val.jokeScore
            finalArr.push({
              currentJokeValue: jokeTotal,
              interval: i
            })
          } else {
            finalArr.push({
              currentJokeValue: jokeTotal,
              interval: i
            })
          }
        }

        this.value = finalArr.map(data => data.currentJokeValue)
      })
    } catch (error) {
      console.error('Error fetching stream messages:', error)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style>

</style>
