<template>
  <v-container>
    <v-row justify="center">
      <v-card>
        <StreamList />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    StreamList: () => import('@/components/StreamList')
  }
}
</script>

<style>

</style>
