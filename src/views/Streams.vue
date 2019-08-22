<template>
  <v-container>
    <v-layout>
      <StreamList />
    </v-layout>
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
