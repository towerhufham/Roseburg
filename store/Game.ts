import { defineStore } from "pinia";

export enum Resource {
    Time = "Time",
    Builds = "Builds",
    Wood = "Wood",
    Grain = "Grain",
    Stone = "Stone"
}

export function getEmoji(resource: Resource): string {
    const table: Record<Resource, string> = {
        Time: "⌛",
        Builds: "🔨",
        Wood: "🪵",
        Grain: "🌾",
        Stone: "🪨"
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
    gain: ResourceGain[],
    randomGain?: ResourceGain[]
} 

export interface GameState {
    inventory: Record<Resource, number>,
    actionsTaken: number,
    builtSpaces: ActionSpace[],
    blueprintSpaces: ActionSpace[]
}

export const useStore = defineStore("main", {
    state: (): GameState => {
        //stochastic for now
        return {
            inventory: {
                Time: 24,
                Builds: 0,
                Wood: 0,
                Grain: 0,
                Stone: 0,
            },
            actionsTaken: 0,
            builtSpaces: [
                {
                    name: "Building", 
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
                {
                    name: "Farming", 
                    cost: [
                        {resource: Resource.Wood, cost: 1}
                    ], gain: [
                        {resource: Resource.Grain, gain: 2}
                    ]
                },
                {
                    name: "Digging", 
                    cost: [], 
                    gain: [
                        {resource: Resource.Stone, gain: 1}
                    ]
                },
                {
                    name: "Foraging", 
                    cost: [], 
                    gain: [],
                    randomGain: [
                        {resource: Resource.Grain, gain: 2},
                        {resource: Resource.Stone, gain: 1},
                    ]
                },
            ]
        }
    },
    actions: {
        randInt(min: number, max: number) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        changeResource(resource: Resource, n: number) {
            this.inventory[resource] += n;
        },
        takeAction(as: ActionSpace): boolean {
            //make sure we can pay for it & have time
            if (this.inventory["Time"] <= 0) {
                return false;
            }
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
            //if there are random gains, get one
            if (as.randomGain) {
                const index = this.randInt(0, as.randomGain.length-1);
                const rg = as.randomGain[index];
                this.changeResource(rg.resource, rg.gain);
            }
            //time tick
            this.inventory["Time"]--;
            this.actionsTaken++;
            return true
        },
        buildAction(as: ActionSpace) {
            this.blueprintSpaces = this.blueprintSpaces.filter(s => s !== as);
            this.builtSpaces.push(as);
        }
    }
})