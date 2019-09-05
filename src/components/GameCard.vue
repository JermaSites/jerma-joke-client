<template>
  <v-card>
    <v-toolbar color="primary" flat>
      <v-toolbar-title>
        {{ name }}
      </v-toolbar-title>
    </v-toolbar>
    <v-img
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
export default {
  name: 'GameDetails',
  props: {
    gameID: {
      type: String,
      default: '16676'
    },
    name: {
      type: String,
      default: '16676'
    },
    boxArtURL: {
      type: String,
      default: '16676'
    }
  },
  computed: {
    sizedImgURL () {
      return this.boxArtURL.replace(/{width}x{height}/, '600x800')
    }
  }
}
</script>

<style>

</style>
