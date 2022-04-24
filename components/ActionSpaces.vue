<script lang="ts">
import { useStore, ActionSquare, ResourceChange, Resource, getEmoji } from "@/store/Game"

export default {
  setup() {
    const store = useStore()

    const someActions: ActionSquare[] = [
        {name: "Woodcutting", changes: [{resource: Resource.Wood, change: 2}]},
        {name: "Planting", changes: [{resource: Resource.Grain, change: 1}]},
    ]

    function formatResourceChange(rc: ResourceChange): string {
        return `${rc.change>=0?"+":""}${rc.change}${getEmoji(rc.resource)}`
    }

    return { store, someActions, formatResourceChange }
  },
}
</script>

<template>
  <div class="flex gap-5 p-3">
    <div v-for="action in someActions" :key="action.name" @click="store.takeAction(action)" class="flex flex-col items-center border-2 border-yellow-500 bg-yellow-100 rounded-lg shadow-md p-1 hover:bg-yellow-50">
        <h2 class="text-4xl">{{ action.name }}</h2>
        <hr class="w-40 m-3 border-yellow-500" />
        <h3 v-for="change in action.changes" :key="change.resource" class="text-3xl">
            {{ formatResourceChange(change) }}
        </h3>
    </div>
  </div>
</template>