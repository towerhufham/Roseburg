import { defineStore } from "pinia";

export enum Resource {
    Wood = "Wood",
    Grain = "Grain"
}

export function getEmoji(resource: Resource): string {
    const table: Record<Resource, string> = {
        Wood: "🪵",
        Grain: "🌾"
    }
    return table[resource];
}

export interface ResourceChange {
    resource: Resource,
    change: number
}

export interface ActionSquare {
    name: string,
    changes: ResourceChange[]
} 

export const useStore = defineStore("main", {
    state: (): Record<Resource, number> => {
        return {
            Wood: 0,
            Grain: 0
        }
    },
    actions: {
        changeResource(resource: Resource, n: number) {
            this[resource] += n;
        },
        takeAction(as: ActionSquare) {
            for (const c of as.changes) {
                this.changeResource(c.resource, c.change);
            }
        }
    }
})