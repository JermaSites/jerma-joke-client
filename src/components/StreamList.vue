<template>
  <v-row>
    <v-col
      v-for="stream in streams"
      :key="stream.id"
    >
      <StreamListItem
        :streamID="stream.id"
        :imgURL="stream.thumbnail_url"
        :title="stream.title"
        :jokeScore="stream.analyzedData[stream.analyzedData.length - 1].currentJokeValue"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StreamList',
  components: {
    StreamListItem: () => import('@/components/StreamListItem')
  },
  computed: {
    ...mapState(['streams'])
  }
}
</script>

<style>

</style>
