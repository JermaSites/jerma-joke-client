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
              :footer-props="{
                itemsPerPageOptions: [10, 25, 50, 100, 985, -1]
              }"
            ></v-data-table>
          </v-card-text>

          <v-card-actions class="d-flex justify-space-around">
            <v-btn color="secondary" @click="getPrevStreamStats" :disabled="prevDisabled">Prev</v-btn>
            <v-btn color="secondary" @click="getNextStreamStats" :disabled="nextDisabled">Next</v-btn>
          </v-card-actions>
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
      page: 0,
      loading: false,
      options: {},
      itemsPerPage: 15,
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
    ...mapState('streams', ['streamStats', 'statsCursor']),
    prevDisabled () {
      return this.options.itemsPerPage === -1 || this.page === 0
    },
    nextDisabled () {
      return !this.statsCursor || this.options.itemsPerPage === -1
    }
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
    ...mapActions('streams', ['fetchStreamStats', 'fetchNextStreamStats', 'fetchPrevStreamStats']),
    async getStreamStats () {
      try {
        this.loading = true
        await this.fetchStreamStats(this.options)
        this.loading = false
      } catch (error) {
        console.error('Failed to fetch current and recent streams:', error)
      }
    },
    async getNextStreamStats () {
      try {
        this.loading = true
        await this.fetchNextStreamStats(this.options)
        this.page++
        this.loading = false
      } catch (error) {
        console.error('Failed to fetch More streams:', error)
      }
    },
    async getPrevStreamStats () {
      try {
        this.loading = true
        await this.fetchPrevStreamStats(this.options)
        this.page--
        this.loading = false
      } catch (error) {
        console.error('Failed to fetch More streams:', error)
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
