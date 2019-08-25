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
          :jokeScore="stream.analyzedData[stream.analyzedData.length - 1].currentJokeValue"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    StreamCard: () => import('@/components/StreamCard')
  },
  computed: {
    ...mapState(['streams'])
  }
}
</script>
