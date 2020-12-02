<template>
  <img
    v-if="rune === -1 && !isKeystone"
    :src="`./static/no-rune.png`"
    @click="disabled ? null : $emit('click')"
  />
  <img
    v-else-if="rune === -1 && isKeystone"
    :src="`./static/no-keystone.png`"
    @click="disabled ? null : $emit('click')"
  />
  <img
    v-else
    :class="isKeystone ? 'keystone' : 'rune'"
    :src="
      `https://ddragon.leagueoflegends.com/cdn/img/${runeData[tree].slots[runeSlot].runes[rune].icon}`
    "
    @click="disabled ? null : $emit('click')"
  />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "rune",
  props: ["isKeystone", "tree", "runeSlot", "rune", "disabled"],
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