<script setup>
import { collection, query, limit } from 'firebase/firestore';

const db = useFirestore()
const streams = useCollection(query(collection(db, 'streams'), limit(1)), { ssrKey: 'my-quiz' })
</script>

<template>
  <div>{{ streams.at(0).title }}</div>
</template>

<style scoped></style>