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
      <v-card
        class="mx-auto"
        max-width="850"
        tile
      >
        <v-sparkline
          :value="value"
          :gradient="gradient"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
          :fill="fill"
          :type="type"
          :auto-line-width="autoLineWidth"
          auto-draw
        ></v-sparkline>
        <v-list>
          <v-list-item
            two-line
            v-for="message in messages"
            :key="message.id"
          >
            <v-list-item-content>
              <v-list-item-title>{{ message['display-name'] }}</v-list-item-title>
              <v-list-item-subtitle>{{ message.msg }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters, mapActions } from 'vuex'

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
      value: [],
      labels: [],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false
    }
  },
  computed: {
    ...mapState(['messages']),
    ...mapGetters(['getStream'])
  },
  async created () {
    try {
      this.loading = true
      await this.fetchStreamMessages(this.streamID)
      this.sparkline()
    } catch (error) {
      console.error('Error fetching stream messages:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    ...mapActions(['fetchStreamMessages']),
    sparkline () {
      const stream = this.getStream(this.streamID)
      const streamStartTime = moment(stream.started_at)
      let jokeTotal = 0

      const dataAndLabels = this.messages.map(message => {
        if (message.joke) {
          jokeTotal += 2
        } else {
          jokeTotal -= 2
        }

        const messageTime = moment(+message['tmi-sent-ts'])
        const time = messageTime.diff(streamStartTime, 'minutes')

        return {
          jokeTotal,
          time
        }
      })

      this.value = dataAndLabels.map(data => {
        return data.jokeTotal
      })

      this.labels = dataAndLabels.map(label => {
        return label.time
      })

      console.log(this.value)

      console.log(dataAndLabels)
    }
  }
}
</script>

<style>

</style>
