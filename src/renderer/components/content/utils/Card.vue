<template>
    <div class="card">
        <div v-if="isProfile">
            <div class="cardProfile">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${selectedMatchup}.png`" class="profileIcon"/>
                <h3 class="cardProfileHeadline">{{ headline }}</h3>
                <p>{{ championData.data[selectedMatchup].title }}</p>
            </div>
        </div>
        <div v-else>
            <h3>{{ headline }}</h3>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Matchup } from "../../../store/types";

export default Vue.extend({
	name: "card",
    props: ["headline", "isProfile"],
    computed: {
        selectedMatchup(): string {
			return this.$store.state.Matchup.selectedMatchup;
        },
        championData(): Matchup.IChampionData {
            return this.$store.state.Matchup.championData;   
        }
    }
});
</script>

<style lang="scss" scoped>
.card {
    background: white;
    color: #393C40;
    padding: 30px;

    .profileIcon {
        border-radius: 100px;
    }

    .cardProfile{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h3 {
        margin-bottom: 20px;

        &.cardProfileHeadline {
            margin: 20px 0px 10px 0px;
        }
    }
}
</style>