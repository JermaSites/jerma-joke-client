<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <StreamGraph  v-if="!loading" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <GameDetails :gameID="stream.gameID" v-if="!loading" />
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
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: true
    }
  },
  components: {
    StreamGraph: () => import('@/components/StreamGraph'),
    GameDetails: () => import('@/components/GameDetails')
  },
  computed: {
    ...mapState(['stream'])
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
    ...mapActions(['fetchStream'])
  }
}
</script>

<style>

</style>
