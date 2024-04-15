<script setup>
import { collection, query, where, orderBy, limit } from "firebase/firestore";

const dayjs = useDayjs();

const db = useFirestore();
const streams = useCollection(
  query(
    collection(db, "streams"),
    where("userID", "==", "23936415"),
    orderBy("startedAt", "desc"),
    limit(12),
  ),
  {
    ssrKey: "joke",
  },
);

function streamThumbnailUrl(urlTemplate) {
  // TODO: srcset
  return urlTemplate.replace("%{width}x%{height}", "1920x1080");
}

function formatDate(date) {
  return dayjs(date).fromNow();
}
</script>

<template>
  <main class="container mx-auto p-4">
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="stream in streams"
        :key="stream.id"
        :to="{ name: 'streams-id', params: { id: stream.id } }"
      >
        <StreamCard>
          <template #title>
            {{ stream.title }}
          </template>
          <template #image>
            <img
              :src="streamThumbnailUrl(stream.video.thumbnailURL)"
              alt=""
              width="1920"
              height="1080"
              class="bg-cover border-0"
            />
          </template>
          <template #footer>
            <div>Score: {{ stream.jokeScoreTotal }}</div>
            <div>{{ formatDate(stream.startedAt) }}</div>
          </template>
        </StreamCard>
      </NuxtLink>
    </section>
  </main>
</template>

<style scoped></style>
