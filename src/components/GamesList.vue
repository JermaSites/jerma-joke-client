<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        Games
      </v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="4"
          v-for="game in stream.games"
          :key="game.gameID"
        >
          <GameCard
            :gameID="game.gameID"
            :name="game.name"
            :boxArtURL="game.boxArtURL"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GamesList',
  components: {
    GameCard: () => import('@/components/GameCard')
  },
  computed: {
    ...mapState('streams', ['stream'])
  }
}
</script>

<style>

</style>
