<template>
  <v-container>
    <v-row>
      <v-col
        v-if="liveStream"
        cols="12"
        sm="10"
        md="8"
        lg="6"
        offset-sm="1"
        offset-md="2"
        offset-lg="3"
      >
        <StreamCard
          :streamID="liveStream.id"
          :gameID="liveStream.gameID"
          :title="liveStream.title"
          :startedAt="liveStream.startedAt"
          :imgURL="liveStream.thumbnailURL"
          :type="liveStream.type"
          :jokeScore="liveStream.jokeScoreTotal"
        />
      </v-col>

      <v-col
        v-for="stream in streams"
        :key="stream.id"
        cols="12"
        sm="6"
        md="4"
      >
        <StreamCard
          :streamID="stream.id"
          :gameID="stream.gameID"
          :title="stream.title"
          :startedAt="stream.startedAt"
          :imgURL="stream.video.thumbnailURL"
          :type="stream.type"
          :jokeScore="stream.jokeScoreTotal"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn
        color="primary"
        v-if="cursor"
        @click="loadMoreStreams"
        :loading="loading"
        fab
      >
        <v-icon dark>mdi-chevron-down</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-col>
        <div class="text-center mt-5">
          Message me on Discord for any issues (<a href="https://discordapp.com/users/Modus%20Pwnens#9109">Modus Pwnens#9109</a>)
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'HomePage',
  components: {
    StreamCard: () => import('@/components/StreamCard')
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState('streams', ['streams', 'cursor']),
    ...mapState('liveStream', ['liveStream'])
  },
  methods: {
    ...mapActions('streams', ['fetchMoreStreams']),
    async loadMoreStreams () {
      if (this.loading) return
      try {
        this.loading = true
        await this.fetchMoreStreams()
        this.loading = false
      } catch (error) {
        console.error('Failed to load more streams:', error)
      }
    }
  },
  metaInfo () {
    return {
      title: 'Jerma Joke Tracker',
      meta: [
        { name: 'Description', content: 'Jerma Joke Tracker. Tracks the +2 / -2 in chat for each stream.' }
      ]
    }
  }
}
</script>
