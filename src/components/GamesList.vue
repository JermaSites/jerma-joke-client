<template>
  <v-card>
    <v-toolbar
      flat
      dense
    >
      <v-toolbar-title>
        Games
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-slide-group>
        <v-slide-item
          v-for="game in stream.games"
          :key="game.gameID"
          v-slot:default="{ active, toggle }"
        >

          <v-card
            class="mx-2"
            width="300"
          >
            <v-toolbar
              color="primary"
              flat
              dense
            >
              <v-toolbar-title>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ game.name }}</span>
                  </template>
                  <span>{{ game.name }}</span>
                </v-tooltip>
              </v-toolbar-title>
            </v-toolbar>
            <v-img
              :src="game.boxArtURL | sizedImgURL"
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
        </v-slide-item>
      </v-slide-group>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GamesList',
  filters: {
    sizedImgURL (boxArtURL) {
      return boxArtURL.replace(/{width}x{height}/, '600x800')
    }
  },
  computed: {
    ...mapState('streams', ['stream'])
  }
}
</script>

<style>
@media screen and (max-width: 1264px) {
  .v-slide-group.v-item-group > .v-slide-group__prev {
    display: none
  }
}
</style>
