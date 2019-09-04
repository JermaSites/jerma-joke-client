<template>
  <v-sheet
    class="mx-auto"
    elevation="8"
  >
    <v-slide-group
      class="pa-4"
      show-arrows
      center-active
    >
      <v-slide-item
        v-for="game in games"
        :key="game.gameID"
      >
      {{ game.gameID }}
        <GameCard
          :name="game.name"
          :boxArtURL="game.boxArtURL"
        />
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  name: 'GamesSlide',
  components: {
    GameCard: () => import('@/components/GameCard')
  },
  props: {
    games: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
