<template>
  <v-container>
    <v-layout>
      <v-card
        class="mx-auto"
        max-width="400"
        tile
      >
        <v-list>
          <v-list-item
            v-for="message in messages"
            :key="message.id"
          >
            <v-list-item-content>
              <v-list-item-title>{{ message }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'StreamDetails',
  props: {
    streamID: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['messages'])
  },
  created () {
    this.fetchStreamMessages(this.streamID)
  },
  methods: {
    ...mapActions(['fetchStreamMessages'])
  }
}
</script>

<style>

</style>
