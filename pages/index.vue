<script setup lang="ts">
import { collection, limit, orderBy, query, where } from 'firebase/firestore'

const db = useFirestore()

const streamsRef = collection(db, 'streams')

const q = query(streamsRef, where('userID', '==', '23936415'), orderBy('startedAt', 'desc'), limit(12))

const { data: streams } = useCollection(q, { ssrKey: 'streams' })
</script>

<template>
  <div>
    <div v-for="stream in streams" :key="stream.id">
      <NuxtLink :to="{ name: 'streams-id', params: { id: stream.id } }">
        {{ stream.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>
