<script setup lang="ts">
const route = useRoute()
const streamStore = useStreamStore()

const streamId = computed(() => {
  const id = route.params.id

  if (Array.isArray(id)) {
    return id[0] || ''
  }

  if (!id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User ID is required',
    })
  }

  return id
})

await callOnce('stream', () => streamStore.fetchStream(streamId.value))

const stream = streamStore.getStreamById(streamId.value)
</script>

<template>
  <div>
    <pre>
      {{ stream }}
    </pre>
  </div>
</template>

<style scoped>

</style>
