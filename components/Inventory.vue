<script lang="ts">
import { useStore, Resource, getEmoji } from "@/store/Game"

export default {
  setup() {
    const store = useStore()
    return { store, Resource, getEmoji }
  },
}
</script>

<template>
  <div class="bg-yellow-200 flex gap-5 p-3">
    <h1 v-for="r in Resource" :key="r" class="text-6xl">
      {{ getEmoji(r) }}<span class="text-4xl">x</span>{{ store.inventory[r] }}
    </h1>
  </div>
</template>