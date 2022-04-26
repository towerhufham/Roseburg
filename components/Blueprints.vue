<script lang="ts">
import { useStore, ActionSpace } from "@/store/Game"
import { reactive } from "@vue/composition-api"

export default {
  setup() {
    const store = useStore()
    const state = reactive({isBuilding: false});

    function tryStartBuilding() {
      if (!state.isBuilding) {
        if (store.inventory.Builds > 0) {
          state.isBuilding = true;
        } else {
          alert("You need a 🔨 to build.")
        }
      } else {
        state.isBuilding = false;
      }
    }

    function handleBuild(as: ActionSpace) {
      if (state.isBuilding) {
        store.buildAction(as);
        state.isBuilding = false;
        store.inventory.Builds--;
      }
    }

    return { store, state, tryStartBuilding, handleBuild }
  }
}
</script>

<template>
  <div class="items-start flex flex-wrap gap-5 p-3 bg-blue-300">
    <button @click="tryStartBuilding" class="border-2 border-red-500 bg-red-100 rounded-lg shadow-md p-1 hover:bg-red-50 text-3xl">
      {{ state.isBuilding ? "Building..." : "Build🔨" }}
    </button>
    <ActionSpace v-for="action in store.blueprintSpaces" v-bind:action="action" :key="action.name" @click.native="handleBuild(action)" />
  </div>
</template>