<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-if="!loading">
        <StreamGraph
          :stream="stream"
        />
      </v-col>
    </v-row>

    <v-row v-if="!loading">
      <v-col
        cols="3"
        v-for="game in stream.games"
        :key="game.id"
      >
        <GameDetails
          :gameID="game.id"
          :name="game.name"
          :boxArtURL="game.boxArtURL"
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
    ...mapState('streams', ['stream']),
    metaTitle () {
      return this.loading ? 'Jerma Joke' : this.stream.title
    },
    metaDescription () {
      return this.loading ? 'Stream details' : `Jerma plays ${this.stream.games[0]}`
    }
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
  },
  metaInfo () {
    return {
      title: this.metaTitle,
      meta: [
        { name: 'Description', content: this.metaDescription }
      ]
    }
  }
}
</script>

<style>

</style>
