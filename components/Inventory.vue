<script lang="ts">
import { useStore } from "@/store/Game"

export default {
  setup() {
    const store = useStore()
    return { store }
  },
}
</script>

<template>
  <div class="bg-yellow-200 flex gap-5 p-3">
    <h1 class="text-6xl">🪵<span class="text-4xl">x</span>{{ store.wood }}</h1>
    <h1 class="text-6xl">🌾<span class="text-4xl">x</span>{{ store.grain }}</h1>
    <button @click="store.changeWood(2)" class="text-4xl border-2 border-yellow-500 bg-yellow-100 rounded-lg shadow-md p-1 hover:bg-yellow-50">+2🪵</button>
    <button @click="store.changeGrain(1)" class="text-4xl border-2 border-yellow-500 bg-yellow-100 rounded-lg shadow-md p-1 hover:bg-yellow-50">+1🌾</button>
  </div>
</template>