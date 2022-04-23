import { defineStore } from "pinia";

export const useStore = defineStore("main", {
    state: () => {
        return {
            wood: 0,
            grain: 0,
        }
    },
    actions: {
        changeWood(n: number) {
            this.wood += n;
        },
        changeGrain(n: number) {
            this.grain += n;
        }
    }
})