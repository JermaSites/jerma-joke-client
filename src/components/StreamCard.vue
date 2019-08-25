<template>
  <v-card
    hover
    :to="{ name: 'stream', params: { streamID } }"
  >
    <v-img
      :src="sizedImgURL"
      :srcset="srcsetURLs"
      :lazy-src="require('@/assets/fireman.png')"
      aspect-ratio="1.7"
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

      <v-card-title
        class="justify-space-between fill-height white--text"
      >
        <div class="align-self-end">
          {{ title }}
        </div>

        <div class="d-flex align-center align-self-start">
          LIVE <PulseDot />
        </div>
      </v-card-title>
    </v-img>

    <v-card-text class="d-flex justify-space-between">
      <div>{{ 'Game Name' }}</div>
      <div>{{ 'Joke Score' }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'StreamCard',
  props: {
    streamID: {
      type: String,
      required: true
    },
    gameID: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    startedAt: {
      type: String,
      required: true
    },
    imgURL: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    jokeScore: {
      type: String,
      default: '0'
    }
  },
  components: {
    PulseDot: () => import('@/components/PulseDot')
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
