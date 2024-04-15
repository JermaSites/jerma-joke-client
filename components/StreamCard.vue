<script setup></script>

<template>
  <div class="border">
    <div class="p-4 truncate">
      <slot name="title"></slot>
    </div>

    <slot name="image"></slot>

    <div class="p-4 flex justify-between">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped></style>
