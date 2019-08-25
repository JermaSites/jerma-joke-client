<template>
  <v-container>
    <v-row>
      <v-col
        v-for="stream in streams"
        :key="stream.id"
        cols="4"
      >
        <StreamCard
          :streamID="stream.id"
          :gameID="stream.game_id"
          :title="stream.title"
          :startedAt="stream.started_at"
          :imgURL="stream.thumbnail_url"
          :type="stream.type"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
    StreamCard: () => import('@/components/StreamCard')
  },
  computed: {
    ...mapState(['streams'])
  },
  async created () {
    try {
      await this.fetchStreams()
    } catch (error) {
      console.error('Failed to fetch streams:', error)
    }
  },
  methods: {
    ...mapActions(['fetchStreams'])
  }
}
</script>
