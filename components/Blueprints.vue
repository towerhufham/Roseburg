<script lang="ts">
import { useStore, ActionSpace } from "@/store/Game"

export default {
  setup() {
    const store = useStore()

    let isBuilding = false;

    function toggleIsBuilding() {
      isBuilding = !isBuilding
    }

    function buildingButtontext() {
      return isBuilding ? "Building..." : "Build🔨"
    }

    function handleBuild(as: ActionSpace) {
      if (isBuilding) {
        store.buildAction(as);
      }
    }

    return { store, buildingButtontext, toggleIsBuilding, handleBuild }
  },
}
</script>

<template>
  <div class="flex gap-5 p-3 bg-blue-300">
    <button @click="toggleIsBuilding" class="border-2 border-red-500 bg-red-100 rounded-lg shadow-md p-1 hover:bg-red-50 text-3xl">
      {{ buildingButtontext() }}
    </button>
    <ActionSpace v-for="action in store.blueprintSpaces" v-bind:action="action" :key="action.name" @click.native="handleBuild(action)" />
  </div>
</template>