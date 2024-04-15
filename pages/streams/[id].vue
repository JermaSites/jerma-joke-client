<script setup>
import { doc } from "firebase/firestore";

const route = useRoute();
const db = useFirestore();

const stream = useDocument(doc(db, "streams", route.params.id));
</script>

<template>
  <main class="container mx-auto p-4">
    <div>{{ stream.title }}</div>
  </main>
</template>

<style scoped></style>
