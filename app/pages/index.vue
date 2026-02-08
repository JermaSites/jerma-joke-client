<script setup lang="ts">
const streamStore = useStreamStore()

try {
  await callOnce('streams', () => streamStore.fetchStreams())
  await callOnce('liveStream', () => streamStore.fetchLiveStream())
}
catch (error) {
  console.error('Error fetching streams')
  console.error(error)
}

const { result, search } = useAlgoliaSearch('streams')

onMounted(async () => {
  await search({ query: '' })
})
</script>

<template>
  <UContainer>
    {{ result.hits.length }}
    <section v-if="streamStore.liveStream" class="grid grid-cols-1 sm:grid-cols-6 grid- gap-4 py-4 sm:py-6 lg:py-8">
      <NuxtLink
        :to="{ name: 'streams-id', params: { id: streamStore.liveStream.id } }"
        class="sm:col-span-4 sm:col-start-2"
      >
        <StreamCard
          :id="streamStore.liveStream.id"
          :title="streamStore.liveStream.title"
          :thumbnail-url="streamStore.liveStream.thumbnailURL"
          :score="streamStore.liveStream.jokeScoreTotal"
          :date="streamStore.liveStream.startedAt"
          :live="true"
        />
      </NuxtLink>
    </section>
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
