<template>
  <v-container>
    <v-row v-if="currentStream">
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
        offset-sm="1"
        offset-md="2"
        offset-lg="3"
      >
        <StreamCard
          :streamID="currentStream.id"
          :gameID="currentStream.gameID"
          :title="currentStream.title"
          :startedAt="currentStream.startedAt"
          :imgURL="currentStream.thumbnailURL"
          :type="currentStream.type"
          :jokeScore="currentStream.jokeScoreTotal"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="stream in recentStreams"
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
          :imgURL="stream.thumbnailURL"
          :type="stream.type"
          :jokeScore="stream.jokeScoreTotal"
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
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['recentStreams', 'currentStream'])
  }
}
</script>
