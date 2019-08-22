<template>
  <v-container>
    <v-layout align-center justify-center v-if="loading">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-layout>

    <v-layout v-else>
      <v-flex>
        <v-card>
          <v-sparkline
            :fill="fill"
            :gradient="gradient"
            :line-width="width"
            :padding="padding"
            :smooth="radius || false"
            :value="value"
            auto-draw
          ></v-sparkline>

          <v-card-text>
            <h1>Joke Tally: {{ currentJokeTally }}</h1>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from '../plugins/firebase'
import { mapState, mapGetters } from 'vuex'

const db = firebase.firestore()

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]

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
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false
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
        this.value = streamData.analyzedData.map(data => data.currentJokeValue)
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
