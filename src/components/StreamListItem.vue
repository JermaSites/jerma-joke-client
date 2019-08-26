<template>
  <v-card
    hover
    :to="{ name: 'stream', params: { streamID } }"
  >
    <v-row no-gutters>
      <v-col cols="5">
        <v-img
          :src="sizedImgURL"
          :srcset="srcsetURLs"
          :lazy-src="require('@/assets/fireman.png')"
        />
      </v-col>
      <v-col class="pa-2">
        <div>
          {{ title }}
        </div>
        <div>
          {{ gameName }}
        </div>
        <div>
          Joke Score: {{ jokeScore }}
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'StreamListItem',
  props: {
    streamID: {
      type: String,
      required: true
    },
    imgURL: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Stream title'
    },
    gameName: {
      type: String,
      default: 'Game title'
    },
    jokeScore: {
      type: Number,
      default: 0
    }

  },
  computed: {
    sizedImgURL () {
      return this.imgURL.replace(/{width}x{height}/, '1920x1080')
    },
    srcsetURLs () {
      const srcsetURLs =
      `
        ${this.imgURL.replace(/{width}x{height}/, '1920x1080')} 1920w,
        ${this.imgURL.replace(/{width}x{height}/, '1280x720')} 1280w,
        ${this.imgURL.replace(/{width}x{height}/, '640x360')} 640w,
        ${this.imgURL.replace(/{width}x{height}/, '256x144')} 256w
      `
      return srcsetURLs
    }
  }
}
</script>

<style scoped>
</style>
