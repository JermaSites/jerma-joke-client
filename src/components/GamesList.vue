<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        Games
      </v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-row justify="space-around">
        <v-col
          cols="6"
          sm="4"
          v-for="game in games"
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
export default {
  name: 'GamesList',
  components: {
    GameCard: () => import('@/components/GameCard')
  },
  props: {
    games: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      model: null
    }
  }
}
</script>

<style>

</style>
