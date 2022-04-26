<script lang="ts">
import { useStore, Resource, getEmoji } from "@/store/Game"
import { computed } from "@vue/composition-api"

export default {
  setup() {
    const store = useStore()
    const visibleResources = computed(() => {
      return Object.values(Resource).filter(r => store.inventory[r] > 0 || r === "Time")
    })
    return { store, visibleResources, getEmoji }
  },
}
</script>

<template>
  <div class="bg-yellow-200 flex gap-5 p-3">
    <h1 v-for="r in visibleResources" :key="r" class="text-6xl">
      {{ getEmoji(r) }}<span class="text-4xl">x</span>{{ store.inventory[r] }}
    </h1>
  </div>
</template>