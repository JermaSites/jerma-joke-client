<script setup lang="ts"></script>

<template>
  <div class="border">
    <div class="p-4 truncate">
      <slot name="title" />
    </div>

    <slot name="image" />

    <div class="p-4 flex justify-between">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped></style>
