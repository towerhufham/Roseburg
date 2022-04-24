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

export interface ResourceCost {
    resource: Resource,
    cost: number
}

export interface ResourceGain {
    resource: Resource,
    gain: number
}

export interface ActionSquare {
    name: string,
    cost: ResourceCost[],
    gain: ResourceGain[]
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
            //todo: handle if it cant be afforded
            for (const c of as.cost) {
                this.changeResource(c.resource, -c.cost);
            }
            for (const g of as.gain) {
                this.changeResource(g.resource, g.gain);
            }
        }
    }
})