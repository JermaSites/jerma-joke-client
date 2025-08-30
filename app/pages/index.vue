<script setup lang="ts">
const streamStore = useStreamStore()

await callOnce('streams', () => streamStore.fetchStreams())
// await callOnce('liveStream', () => streamStore.fetchLiveStream())
</script>

<template>
  <UContainer>
    <!-- <section v-if="streamStore.liveStream" class="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 sm:py-6 lg:py-8">
      <NuxtLink
        :to="{ name: 'streams-id', params: { id: streamStore.liveStream.id } }"
      >
        <StreamCard
          :id="streamStore.liveStream.id"
          :title="streamStore.liveStream.title"
          :thumbnail-url="streamStore.liveStream.video.thumbnailURL"
          :score="streamStore.liveStream.jokeScoreTotal"
          :date="streamStore.liveStream.startedAt"
        />
      </NuxtLink>
    </section> -->
    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 sm:py-6 lg:py-8">
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
    </section>
  </UContainer>
</template>

<style scoped>

</style>
