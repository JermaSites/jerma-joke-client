<template>
  <v-app>
    <v-app-bar app color="primary" style="z-index: 15">
      <v-toolbar-title class="headline text-uppercase">
        <span>Jerma</span>
        <span class="font-weight-light">Joke</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn :to="{ name: 'home' }" exact text>Home</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  async created () {
    try {
      this.fetchLiveStream()
      this.fetchStreams()
    } catch (error) {
      console.error('Failed to fetch current and recent streams:', error)
    }
  },
  methods: {
    ...mapActions('streams', ['fetchStreams']),
    ...mapActions('liveStream', ['fetchLiveStream'])
  }
}
</script>
