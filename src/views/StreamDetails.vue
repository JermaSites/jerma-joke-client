<template>
  <v-container>
    <AnnouncementAlert />

    <v-row v-if="!loading">
      <v-col cols="12">
        <StreamGraph @markerClick="openVodToTimestamp" />
      </v-col>
    </v-row>

    <v-row v-if="!loading">
      <v-col lg="6" cols="12">
        <GamesList />
      </v-col>

      <v-col lg="6" cols="12">
        <v-responsive :aspect-ratio="16 / 9" min-height="100%">
          <iframe
            class="twitch-embed"
            :src="vodURL"
            height="100%"
            width="100%"
            frameborder="0"
            scrolling="no"
            allowfullscreen="true"
          >
          </iframe>
        </v-responsive>
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
    vodURL () {
      return `https://player.twitch.tv/?video=${this.stream.video.id}&parent=${this.baseURL2}&parent=${this.baseURL}&autoplay=false`
    },
    metaTitle () {
      return this.loading ? 'Jerma Joke' : this.stream.video.title
    },
    metaDescription () {
      return this.loading
        ? 'Stream details'
        : `Jerma plays ${this.stream.games[0]?.name}`
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
    ...mapActions('streams', ['fetchStream']),
    openVodToTimestamp (point) {
      const url = `https://www.twitch.tv/videos/${this.stream.video.id}?t=${point.x}m`
      window.open(url, '_blank', 'noreferrer')
    }
  },
  metaInfo () {
    return {
      title: `${this.metaTitle} | Jerma Joke Tracker`,
      meta: [{ name: 'Description', content: this.metaDescription }]
    }
  }
}
</script>

<style>
.twitch-embed {
  min-height: 300px;
}
</style>
