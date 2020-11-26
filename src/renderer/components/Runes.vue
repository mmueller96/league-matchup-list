<template>
    <div v-if="isMatchupList">
        <div class="runeCellWrapper">
            <div class="runeCellKeystone">
                <Rune :isKeystone="true" :tree="runeSets[selectedRuneSet].main" :runeSlot="runeSets[selectedRuneSet].keystone.slot" :rune="runeSets[selectedRuneSet].keystone.rune" />
            </div>
            <div class="runeCellRunes">
                <div class="runeCellMain">
                    <Rune :isKeystone="false" :tree="runeSets[selectedRuneSet].main" :runeSlot="runeSets[selectedRuneSet].rune1.slot" :rune="runeSets[selectedRuneSet].rune1.rune" />
                    <Rune :isKeystone="false" :tree="runeSets[selectedRuneSet].main" :runeSlot="runeSets[selectedRuneSet].rune2.slot" :rune="runeSets[selectedRuneSet].rune2.rune" />
                    <Rune :isKeystone="false" :tree="runeSets[selectedRuneSet].main" :runeSlot="runeSets[selectedRuneSet].rune3.slot" :rune="runeSets[selectedRuneSet].rune3.rune" />
                </div>
                <div class="runeCellSecondary">
                    <Rune :isKeystone="false" :tree="runeSets[selectedRuneSet].secondary" :runeSlot="runeSets[selectedRuneSet].rune4.slot" :rune="runeSets[selectedRuneSet].rune4.rune" />
                    <Rune :isKeystone="false" :tree="runeSets[selectedRuneSet].secondary" :runeSlot="runeSets[selectedRuneSet].rune5.slot" :rune="runeSets[selectedRuneSet].rune5.rune" />
                </div>
            </div>
        </div>
    </div>

    <div class="runes" v-else>
        <div v-for="(rune, index) in runeSets" v-bind:key="`rune${index}`" class="runeWrapper">
            <h5>{{ rune.title }}</h5>
            
            <Rune :isKeystone="true" :tree="rune.main" :runeSlot="rune.keystone.slot" :rune="rune.keystone.rune" />
            <Rune :isKeystone="false" :tree="rune.main" :runeSlot="rune.rune1.slot" :rune="rune.rune1.rune" />
            <Rune :isKeystone="false" :tree="rune.main" :runeSlot="rune.rune2.slot" :rune="rune.rune2.rune" />
            <Rune :isKeystone="false" :tree="rune.main" :runeSlot="rune.rune3.slot" :rune="rune.rune3.rune" />
            <Rune :isKeystone="false" :tree="rune.secondary" :runeSlot="rune.rune4.slot" :rune="rune.rune4.rune" />
            <Rune :isKeystone="false" :tree="rune.secondary" :runeSlot="rune.rune5.slot" :rune="rune.rune5.rune" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Matchup } from "../store/types";
import Rune from "@/components/Rune.vue";

export default Vue.extend({
	name: "runes",
    props: ["runeSets", "selectedRuneSet", "isMatchupList"],
    components: { Rune },
    mounted(): void {
        console.log("runeSets", this.runeSets);
        
        console.log(this.runeData[this.runeSets[0].main].slots[0].runes[3].icon);
    },
    computed: {
        selectedMatchup(): string {
			return this.$store.state.Matchup.selectedMatchup;
        },
        championData(): Matchup.IChampionData {
            return this.$store.state.Matchup.championData;   
        },
        runeData(): any {
            return this.$store.state.Matchup.runeData;
        }
    }
});
</script>

<style lang="scss" scoped>
.runes {
    .runeWrapper {
        min-width: 180px;
        background: #ECEDEF;
        padding: 10px 10px 20px 10px;

        h5 {
            margin-bottom: 12px;
        }
    }
}

.runeCellWrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    >.runeCellKeystone {
        >img {
            width: 48px;
            height: 48px;
        }
    }

    >.runeCellRunes{
        >.runeCellMain {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        >.runeCellSecondary {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        img {
            width: 32px;
            height: 32px;
        }
    }
}
</style>