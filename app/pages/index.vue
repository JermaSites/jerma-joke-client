<script setup lang="ts">
const streamStore = useStreamStore()

await callOnce('streams', () => streamStore.fetchStreams())
</script>

<template>
  <UContainer>
    <UButton>Button</UButton>
    <StreamCard v-for="stream in streamStore.streams" :key="stream.id" />
  </UContainer>
</template>

<style scoped>

</style>
