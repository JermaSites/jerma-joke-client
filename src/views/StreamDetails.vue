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
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters('streams', ['loading', 'streamByID']),
    ...mapGetters('liveStream', ['liveStream']),
    stream () {
      return this.streamByID(this.streamID) ? this.streamByID(this.streamID) : this.liveStream
    }
  }
}
</script>

<style>

</style>
