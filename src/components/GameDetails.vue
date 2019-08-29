<template>
  <v-card :loading="loading" max-width="400">
    <v-toolbar>
      <v-toolbar-title v-if="!loading">
        {{ game.name }}
      </v-toolbar-title>
    </v-toolbar>

    <v-img
      v-if="!loading"
      :src="sizedImgURL"
      :lazy-src="require('@/assets/fireman.png')"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          />
        </v-row>
      </template>
    </v-img>
  </v-card>
</template>

<script>
import api from '@/api'
export default {
  name: 'GameDetails',
  props: {
    gameID: {
      type: String,
      default: '16676'
    }
  },
  data () {
    return {
      loading: true,
      game: null
    }
  },
  computed: {
    sizedImgURL () {
      return this.game.box_art_url.replace(/{width}x{height}/, '600x800')
    }
  },
  created () {
    this.getGameData()
  },
  methods: {
    async getGameData () {
      try {
        this.loading = true
        const response = await api.get(`games?id=${this.gameID}`)
        this.game = response.data.data[0]
        this.loading = false
      } catch (error) {
        console.error('Failed to get game:', error)
      }
    }
  }
}
</script>

<style>

</style>
