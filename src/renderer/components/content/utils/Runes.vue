<template>
    <div class="runes">
        <div v-for="(rune, index) in runeSets" v-bind:key="`rune${index}`" class="runeWrapper">
            <h5>{{ rune.title }}</h5>
            <img class="keystone" :src="`https://ddragon.leagueoflegends.com/cdn/img/${runeData[rune.main].slots[rune.keystone.slot].runes[rune.keystone.rune].icon}`" />
            <img class="rune" :src="`https://ddragon.leagueoflegends.com/cdn/img/${runeData[rune.main].slots[rune.rune1.slot].runes[rune.rune1.rune].icon}`" />
            <img class="rune" :src="`https://ddragon.leagueoflegends.com/cdn/img/${runeData[rune.main].slots[rune.rune2.slot].runes[rune.rune2.rune].icon}`" />
            <img class="rune" :src="`https://ddragon.leagueoflegends.com/cdn/img/${runeData[rune.main].slots[rune.rune3.slot].runes[rune.rune3.rune].icon}`" />
            <img class="rune" :src="`https://ddragon.leagueoflegends.com/cdn/img/${runeData[rune.secondary].slots[rune.rune4.slot].runes[rune.rune4.rune].icon}`" />
            <img class="rune" :src="`https://ddragon.leagueoflegends.com/cdn/img/${runeData[rune.secondary].slots[rune.rune5.slot].runes[rune.rune5.rune].icon}`" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Matchup } from "../../../store/types";

export default Vue.extend({
	name: "card",
    props: ["runeSets"],
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

        .keystone {
            width: 48px;
            height: 48px;
            background: black;
            border-radius: 100px;
        }

        .rune {
            width: 32px;
            height: 32px;
        }
    }
}
</style>