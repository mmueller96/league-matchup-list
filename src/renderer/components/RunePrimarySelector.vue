<template>
  <div class="runePrimarySelector" v-if="isOpen">
    <div
      v-for="(runeToSelect, index) in runesToSelect"
      v-bind:key="`selector${runeToSelect.id}`"
    >
      <Rune
        :isKeystone="runeSlot === 0"
        :tree="runeTree"
        :runeSlot="runeSlot"
        :rune="index"
        @click="selectRune(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Rune from "@/components/Rune.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
  name: "runePrimarySelector",
  props: ["isOpen", "runeTree", "runeSlot", "runes"],
  components: { FontAwesomeIcon, Rune },
  data() {
    return {
      icon: { cancel: faTimes, save: faSave, edit: faPen, delete: faTrashAlt }
    };
  },
  methods: {
    selectRune(index: number): void {
      this.$emit("selectRune", true, this.runeSlot, index);
      this.$emit("selectedRune", false);
    }
  },
  computed: {
    runesToSelect(): any {
      return this.runes[this.runeTree].slots[this.runeSlot].runes;
    }
  }
});
</script>

<style lang="scss" scoped>
.runePrimarySelector {
  position: absolute;
  z-index: 2;
  background: #ecedef;
  padding: 10px;
  margin-left: -10px;
  margin-top: -10px;
}
</style>