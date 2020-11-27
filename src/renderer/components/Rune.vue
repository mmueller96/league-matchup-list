<template>
    <div v-if="rune === -1">No Rune.</div>
    <img v-else :class="isKeystone ? 'keystone' : 'rune'" :src="`https://ddragon.leagueoflegends.com/cdn/img/${runeData[tree].slots[runeSlot].runes[rune].icon}`" />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "card",
    props: ["isKeystone", "tree", "runeSlot", "rune"],
    computed: {
        runeData(): any {
            return this.$store.state.Matchup.runeData;
        }
    }
});
</script>

<style lang="scss" scoped>
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
</style>