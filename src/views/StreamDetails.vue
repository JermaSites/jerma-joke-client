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
      value: [0, 0]
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
        const streamData = docSnapshot.data()
        let data = streamData.analyzedData
        const test = []
        let value = -1
        data.reverse().forEach(item => {
          if (item.interval !== value) {
            test.unshift(item)
            value = item.interval
          }
        })

        const totalTime = test[test.length - 1].interval
        let finalArr = []
        let jokeTotal = 0

        for (let i = 0; i < totalTime; i++) {
          const val = test.find(e => e.interval === i)
          if (val) {
            jokeTotal = val.currentJokeValue
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

        this.value = test.map(data => data.currentJokeValue)
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
