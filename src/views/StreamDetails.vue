<template>
  <v-container>
    <v-row>
      <v-col v-if="!loading">
        <StreamGraph />
      </v-col>
    </v-row>

    <v-row v-if="!loading">
      <v-col
        cols="12"
        lg="6"
      >
        <GamesList />
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
    GamesList: () => import('@/components/GamesList')
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
      return this.loading ? 'Stream details' : `Jerma plays ${this.stream.games[0].name}`
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
      title: `${this.metaTitle} | Jerma Joke Tracker`,
      meta: [
        { name: 'Description', content: this.metaDescription }
      ]
    }
  }
}
</script>

<style>

</style>
