<script setup lang="ts">
const streamStore = useStreamStore()

await callOnce('streams', () => streamStore.fetchStreams())
</script>

<template>
  <UContainer class="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 sm:py-6 lg:py-8">
    <NuxtLink
      v-for="stream in streamStore.streams"
      :key="stream.id"
      :to="{ name: 'streams-id', params: { id: stream.id } }"
    >
      <StreamCard
        :id="stream.id"
        :title="stream.title"
        :thumbnail-url="stream.video.thumbnailURL"
        :score="stream.jokeScoreTotal"
        :date="stream.startedAt"
      />
    </NuxtLink>
  </UContainer>
</template>

<style scoped>

</style>
