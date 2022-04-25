<script lang="ts">
import { useStore, ActionSpace } from "@/store/Game"
import { reactive } from "@vue/composition-api"

export default {
  setup() {
    const store = useStore()
    const state = reactive({isBuilding: false});

    function toggleIsBuilding() {
      state.isBuilding = !state.isBuilding
    }

    function buildingButtontext() {
      return state.isBuilding ? "Building..." : "Build🔨"
    }

    function handleBuild(as: ActionSpace) {
      if (state.isBuilding) {
        store.buildAction(as);
        state.isBuilding = false;
      }
    }

    return { store, buildingButtontext, toggleIsBuilding, handleBuild }
  }
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