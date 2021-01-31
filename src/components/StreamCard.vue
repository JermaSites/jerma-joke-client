<template>
  <v-card
    tile
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
    </v-img>

    <v-card-text class="d-flex justify-space-between">
      <div>Score: {{ jokeScore }}</div>
      <div>{{ timeAgo }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'StreamCard',
  props: {
    streamID: {
      type: String,
      default: '985'
    },
    gameID: {
      type: String,
      default: '985'
    },
    title: {
      type: String,
      default: 'Stream Title'
    },
    startedAt: {
      type: String,
      default: '2019-08-27T22:18:24Z'
    },
    imgURL: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      required: 'offline'
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
    timeAgo () {
      return moment(this.startedAt).fromNow()
    },
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
