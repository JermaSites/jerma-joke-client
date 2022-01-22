<template>
  <v-container>

    <AnnouncementAlert />

    <v-row v-if="!loading">
      <v-col cols="12">
        <StreamGraph />
      </v-col>
    </v-row>

    <v-row v-if="!loading">
      <v-col lg="6" cols="12">
        <GamesList />
      </v-col>

      <v-col lg="6" cols="12">
        <iframe
          class="twitch-embed"
          :src="`https://player.twitch.tv/?video=${stream.video.id}&parent=${baseURL2}&parent=${baseURL}&autoplay=false`"
          height="100%"
          width="100%"
          frameborder="0"
          scrolling="no"
          allowfullscreen="true">
        </iframe>
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
    AnnouncementAlert: () => import('@/components/AnnouncementAlert'),
    StreamGraph: () => import('@/components/StreamGraph'),
    GamesList: () => import('@/components/GamesList')
  },
  data () {
    return {
      loading: true,
      baseURL: process.env.VUE_APP_BASE_URL,
      baseURL2: process.env.VUE_APP_BASE_URL_2
    }
  },
  computed: {
    ...mapState('streams', ['stream']),
    metaTitle () {
      return this.loading ? 'Jerma Joke' : this.stream.video.title
    },
    metaDescription () {
      return this.loading ? 'Stream details' : `Jerma plays ${this.stream.games[0]?.name}`
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
.twitch-embed {
  min-height: 300px;
}
</style>
