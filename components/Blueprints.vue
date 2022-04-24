<script lang="ts">
import { useStore, ResourceCost, ResourceGain, getEmoji } from "@/store/Game"

export default {
  setup() {
    const store = useStore()

  function formatResourceCost(rc: ResourceCost): string {
        return `-${rc.cost}${getEmoji(rc.resource)}`
    }

    function formatResourceGain(rg: ResourceGain): string {
        return `+${rg.gain}${getEmoji(rg.resource)}`
    }

    return { store, formatResourceGain, formatResourceCost }
  },
}
</script>

<template>
  <div class="flex gap-5 p-3 bg-blue-300">
    <div v-for="action in store.blueprintSpaces" :key="action.name" @click="store.buildAction(action)" class="flex flex-col items-center border-2 border-yellow-500 bg-yellow-100 rounded-lg shadow-md p-1 hover:bg-yellow-50">
        <h2 class="text-4xl">{{ action.name }}</h2>
        <hr class="w-40 m-3 border-yellow-500" />
        <div>
          <span v-for="cost in action.cost" :key="cost.resource" class="text-3xl">
              {{ formatResourceCost(cost) }}
          </span>
          <span v-if="action.cost.length > 0" class="text-3xl text-yellow-400">
            🠊
          </span>
          <span v-for="gain in action.gain" :key="gain.resource" class="text-3xl">
              {{ formatResourceGain(gain) }}
          </span>
        </div>
    </div>
  </div>
</template>