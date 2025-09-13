<script setup lang="ts">
const props = defineProps<{
  id: string
  title: string
  score: number
  date: string
  thumbnailUrl: string
  live?: boolean
}>()

const transformThumbnailUrl = computed(() => {
  if (props.live) {
    return props.thumbnailUrl.replace('{width}x{height}', '640x360')
  }

  return props.thumbnailUrl.replace('%{width}x%{height}', '320x180')
})
</script>

<template>
  <UCard :ui="{ body: 'p-0 sm:p-0' }" class=" dark:bg-stone-900 dark:ring-stone-800">
    <template #header>
      <div class="truncate">
        <h2 class="text-lg font-semibold">
          {{ props.title }}
        </h2>
      </div>
    </template>

    <div>
      <img :src="transformThumbnailUrl" alt="" srcset="" class="w-full">
    </div>

    <template #footer>
      <div class="flex justify-between">
        <div>
          <p>
            Score: {{ props.score }}
          </p>
        </div>
        <div>
          <p>
            {{ $dayjs(props.date).fromNow() }}
          </p>
        </div>
      </div>
    </template>
  </UCard>
</template>

<style scoped>

</style>
