<template>
  <v-list>
    <v-list-item
      v-for="stream in streams"
      :key="stream.id"
      :to="{ name: 'stream', params: { streamID: stream.id }}"
    >
      <v-list-item-content>
        <v-list-item-title>{{ stream.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StreamList',
  computed: {
    ...mapState(['streams'])
  }
}
</script>

<style>

</style>
