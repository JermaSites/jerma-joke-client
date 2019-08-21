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
        min-width="850"
        tile
      >
        <v-sparkline
          :fill="fill"
          :gradient="gradient"
          :line-width="width"
          :padding="padding"
          :smooth="radius || false"
          :value="value"
          auto-draw
        ></v-sparkline>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
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
    ...mapState(['messages', 'streams']),
    ...mapGetters(['getStream'])
  },
  async created () {
    try {
      this.loading = true
      await this.sparkline()
    } catch (error) {
      console.error('Error fetching stream messages:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    ...mapActions(['fetchStream']),
    async sparkline () {
      await this.fetchStream(`${this.streamID}`)
      const stream = this.getStream(`${this.streamID}`)

      this.value = stream.analyzedData.map(data => {
        return data.currentJokeValue
      })

      this.labels = stream.analyzedData.map(data => {
        return data.interval
      })
    }
  }
}
</script>

<style>

</style>
