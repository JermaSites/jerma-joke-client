<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <StreamList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Streams',
  components: {
    StreamList: () => import('@/components/StreamList')
  }
}
</script>

<style>

</style>
