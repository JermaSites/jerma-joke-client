<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card tile>
          <v-card-title> Joke Stats </v-card-title>

          <v-card-text>
            <v-data-table
              @click:row="rowClicked"
              :loading="loading"
              :headers="headers"
              :items-per-page="itemsPerPage"
              :items="streamStats"
              :options.sync="options"
              hide-default-footer
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
  name: 'StatsPage',
  data () {
    return {
      loading: false,
      options: {},
      itemsPerPage: 24,
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
  async mounted () {
    try {
      this.loading = true
      await this.getStreamStats()
      this.loading = false
    } catch (error) {
      console.error('Failed to fetch current and recent streams:', error)
    }
  },
  methods: {
    ...mapActions('streams', ['fetchStreamStats', 'fetchMoreStreamStats']),
    async getStreamStats () {
      try {
        this.loading = true
        await this.fetchStreamStats(this.options)
        this.loading = false
      } catch (error) {
        console.error('Failed to fetch current and recent streams:', error)
      }
    },
    rowClicked (payload) {
      const streamID = payload.id
      this.$router.push({ name: 'stream', params: { streamID } })
    }
  },
  watch: {
    options: {
      handler () {
        console.log('options changed')
        this.getStreamStats()
      }
    }
  }
}
</script>

<style></style>
