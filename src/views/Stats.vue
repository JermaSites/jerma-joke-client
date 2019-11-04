<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Joke Stats
          </v-card-title>

          <v-card-text>
            <v-data-table
              @click:row="rowClicked"
              :loading="loading"
              :headers="headers"
              :items="streamStats"
              :items-per-page="10"
            ></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Stats',
  data () {
    return {
      loading: false,
      headers: [
        {
          text: 'Title',
          sortable: false,
          value: 'video.title',
          width: 300
        },
        { text: 'Total', value: 'jokeScoreTotal' },
        { text: 'Highest', value: 'jokeScoreHigh' },
        { text: 'Lowest', value: 'jokeScoreLow' },
        { text: 'Maximum', value: 'jokeScoreMax' },
        { text: 'Minimum', value: 'jokeScoreMin' }
      ]
    }
  },
  computed: {
    ...mapState('streams', ['streamStats'])
  },
  async created () {
    try {
      this.loading = true
      await this.fetchStreamStats()
      this.loading = false
    } catch (error) {
      console.error('Failed to fetch current and recent streams:', error)
    }
  },
  methods: {
    ...mapActions('streams', ['fetchStreamStats']),
    rowClicked (payload) {
      const streamID = payload.id
      this.$router.push({ name: 'stream', params: { streamID } })
    }
  }
}
</script>

<style>

</style>
