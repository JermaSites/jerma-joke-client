<script setup lang="ts">
import { doc } from 'firebase/firestore'

const route = useRoute()
const streamId = route.params.id as string

const db = useFirestore()

const stream = useDocument(doc(db, 'streams', streamId), { ssrKey: 'stream' })
</script>

<template>
  <main class="container mx-auto p-4">
    <div>{{ stream.title }}</div>
  </main>
</template>

<style scoped></style>
