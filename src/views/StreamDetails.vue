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
      loading: true
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
        const time = messageTime.diff(streamStartTime, 'seconds')

        return {
          jokeTotal,
          time
        }
      })

      console.log(dataAndLabels)
    }
  }
}
</script>

<style>

</style>
