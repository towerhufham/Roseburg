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
  <div class="flex-grow items-start flex flex-wrap gap-5 p-3">
    <ActionSpace v-for="action in store.builtSpaces" v-bind:action="action" :key="action.name" @click.native="store.takeAction(action)" />
  </div>
</template>