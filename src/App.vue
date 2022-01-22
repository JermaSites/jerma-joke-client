<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      disable-resize-watcher
      clipped
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Jerma Joke Tracker</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item :to="{ name: 'home' }" exact-path>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'stats' }" exact-path>
          <v-list-item-content>
            <v-list-item-title>Stats</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-right>
      <v-toolbar-title class="headline text-uppercase green--text">
        <span>Jerma </span>
        <span class="font-weight-light">Joke Tracker</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mobile"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-items v-if="!$vuetify.breakpoint.mobile">
        <v-btn :to="{ name: 'home' }" exact text>Home</v-btn>
        <v-btn :to="{ name: 'stats' }" exact text>Stats</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  },
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
