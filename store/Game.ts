import { defineStore } from "pinia";

export enum Resource {
    Builds = "Builds",
    Wood = "Wood",
    Grain = "Grain"
}

export function getEmoji(resource: Resource): string {
    const table: Record<Resource, string> = {
        Builds: "🔨",
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

export interface ActionSpace {
    name: string,
    cost: ResourceCost[],
    gain: ResourceGain[]
} 

export interface GameState {
    inventory: Record<Resource, number>,
    actionsTaken: number,
    builtSpaces: ActionSpace[],
    blueprintSpaces: ActionSpace[]
}

export const useStore = defineStore("main", {
    state: (): GameState => {
        return {
            inventory: {
                Builds: 0,
                Wood: 0,
                Grain: 0
            },
            actionsTaken: 0,
            builtSpaces: [
                {
                    name: "Build", 
                    cost: [
                        {resource: Resource.Wood, cost: 2}, 
                        {resource: Resource.Grain, cost: 1}
                    ], 
                    gain: [
                        {resource: Resource.Builds, gain: 1}
                    ]
                },
                {name: "Woodcutting", cost: [], gain: [{resource: Resource.Wood, gain: 2}]},
                {name: "Planting", cost: [], gain: [{resource: Resource.Grain, gain: 1}]}
            ],
            blueprintSpaces: [
                {name: "Farming", cost: [{resource: Resource.Wood, cost: 1}], gain: [{resource: Resource.Grain, gain: 2}]}
            ]
        }
    },
    actions: {
        changeResource(resource: Resource, n: number) {
            this.inventory[resource] += n;
        },
        takeAction(as: ActionSpace): boolean {
            //make sure we can pay for it
            for (const c of as.cost) {
                if (this.inventory[c.resource] < c.cost) {
                    return false;
                }
            }
            //actually take the action now
            for (const c of as.cost) {
                this.changeResource(c.resource, -c.cost);
            }
            for (const g of as.gain) {
                this.changeResource(g.resource, g.gain);
            }
            this.actionsTaken++;
            return true
        },
        buildAction(as: ActionSpace) {
            this.blueprintSpaces = this.blueprintSpaces.filter(s => s !== as);
            this.builtSpaces.push(as);
        }
    }
})