<template>
  <v-card
    hover
    :to="{ name: 'stream', params: { streamID } }"
  >
    <v-toolbar
      dense
      flat
    >
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="d-flex align-center" v-if="type === 'live'">
        <span class="mr-1">LIVE</span> <PulseDot />
      </div>
    </v-toolbar>

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
        <div class="align-self-end stream-title text-no-wrap">

        </div>
      </v-card-title>
    </v-img>

    <v-card-text class="d-flex justify-space-between">
      <div>{{ 'Game Name' }}</div>
      <div>Score: {{ jokeScore }}</div>
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
      default: ''
    },
    type: {
      type: String,
      required: true
    },
    jokeScore: {
      type: Number,
      default: 0
    }
  },
  components: {
    PulseDot: () => import('@/components/PulseDot')
  },
  computed: {
    sizedImgURL () {
      if (!this.imgURL) return require('@/assets/fireman.png')

      if (this.type === 'live') return this.imgURL.replace(/{width}x{height}/, '1920x1080')

      return this.imgURL.replace(/%{width}x%{height}/, '1920x1080')
    },
    srcsetURLs () {
      if (!this.imgURL) return ''
      let srcsetURLs = ''

      if (this.type === 'live') {
        srcsetURLs =
          `
            ${this.imgURL.replace(/{width}x{height}/, '1920x1080')} 1920w,
            ${this.imgURL.replace(/{width}x{height}/, '1280x720')} 1280w,
            ${this.imgURL.replace(/{width}x{height}/, '640x360')} 640w,
            ${this.imgURL.replace(/{width}x{height}/, '256x144')} 256w
          `
      } else {
        srcsetURLs =
          `
            ${this.imgURL.replace(/%{width}x%{height}/, '1920x1080')} 1920w,
            ${this.imgURL.replace(/%{width}x%{height}/, '1280x720')} 1280w,
            ${this.imgURL.replace(/%{width}x%{height}/, '640x360')} 640w,
            ${this.imgURL.replace(/%{width}x%{height}/, '256x144')} 256w
          `
      }

      return srcsetURLs
    }
  }
}
</script>

<style scoped>
</style>
