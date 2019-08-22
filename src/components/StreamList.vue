<template>
  <v-card
    class="mx-auto"
    max-width="400"
    tile
  >
    <v-list>
      <v-list-item
        v-for="stream in streams"
        :key="stream.id"
        link
        :to="{ name: 'stream', params: { streamID: stream.id }}"
      >
        <v-list-item-content>
          <v-list-item-title>{{ stream.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'StreamList',
  computed: {
    ...mapState(['streams'])
  },
  created () {
    this.fetchStreams()
  },
  methods: {
    ...mapActions(['fetchStreams'])
  }
}
</script>

<style>

</style>
