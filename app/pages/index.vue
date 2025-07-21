<script setup lang="ts">
const streamStore = useStreamStore()

await callOnce('streams', () => streamStore.fetchStreams())

const colorMode = useColorMode()

function toggleDark() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <UButton @click="toggleDark">
    {{ colorMode.value }}
  </UButton>
  <UContainer class="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 sm:py-6 lg:py-8">
    <StreamCard
      v-for="stream in streamStore.streams"
      :id="stream.id"
      :key="stream.id"
      :title="stream.title"
      :thumbnail-url="stream.video.thumbnailURL"
      :score="stream.jokeScoreTotal"
      :date="stream.startedAt"
    />
  </UContainer>
</template>

<style scoped>

</style>
