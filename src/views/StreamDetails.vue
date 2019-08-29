<template>
  <v-container>
    <v-row>
      <v-col v-if="stream">
        <StreamGraph />
      </v-col>
    </v-row>

    <v-row>
      <v-col>

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
  components: {
    StreamGraph: () => import('@/components/StreamGraph')
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['stream'])
  },
  async created () {
    try {
      await this.fetchStream(this.streamID)
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
