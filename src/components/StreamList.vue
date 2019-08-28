<template>
  <v-row>
    <v-col
      v-for="stream in streams"
      :key="stream.id"
    >
      <StreamListItem
        :streamID="stream.id"
        :imgURL="stream.thumbnailURL"
        :title="stream.title"
        :jokeScore="stream.jokeScoreTotal"
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
