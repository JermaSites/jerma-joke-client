<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <StreamGraph
          v-if="!loading"
          :stream="stream"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <GameDetails
          v-if="!loading"
          :gameID="stream.gameID"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'StreamDetails',
  props: {
    streamID: {
      type: String,
      required: true
    }
  },
  components: {
    StreamGraph: () => import('@/components/StreamGraph'),
    GameDetails: () => import('@/components/GameDetails')
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapState('streams', ['stream'])
  },
  async created () {
    try {
      this.loading = true
      await this.fetchStream(this.streamID)
      this.loading = false
    } catch (error) {
      console.error('Failed to fetch stream:', error)
    }
  },
  methods: {
    ...mapActions('streams', ['fetchStream'])
  }
}
</script>

<style>

</style>
