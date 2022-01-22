<template>
  <div>
    <div v-for="a in announcements" :key="a.id">
      <v-alert
        :type="a.type"
        dismissible
        color="secondary"
        @input="hideAnnouncement(a.id)"
      >
        {{ a.message }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'AnnouncementAlert',
  computed: {
    ...mapGetters('announcements', ['announcements'])
  },
  methods: {
    ...mapActions('announcements', ['fetchAnnouncements']),
    ...mapMutations('announcements', ['hideAnnouncement'])
  },
  mounted () {
    this.fetchAnnouncements()
  }
}
</script>

<style>
</style>
