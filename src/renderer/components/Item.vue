<template>
  <img
    class="item"
    :src="`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/item/${image}`"
  />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "item",
  props: ["image"],
  computed: {}
});
</script>

<style lang="scss" scoped>
.item {
  width: 48px;
  height: 48px;
}
</style>