<template>
  <img
    v-if="rune === -1 && !isKeystone"
    :src="`./static/no-rune.png`"
    @click="$emit('click')"
  />
  <img
    v-else-if="rune === -1 && isKeystone"
    :src="`./static/no-keystone.png`"
    @click="$emit('click')"
  />
  <img
    v-else
    :class="isKeystone ? 'keystone' : 'rune'"
    :src="
      `https://ddragon.leagueoflegends.com/cdn/img/${runeData[tree].slots[runeSlot].runes[rune].icon}`
    "
    @click="$emit('click')"
  />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "rune",
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