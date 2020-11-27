<template>
  <div class="runePrimarySelector" v-if="isOpen">
    <div
      v-for="(runeToSelectRow, rowIndex) in runesToSelect"
      v-bind:key="`selectorSecondaryType${rowIndex}`"
      class="runeRow"
    >
      <div
        v-for="(runeToSelect, index) in runeToSelectRow.runes"
        v-bind:key="runeToSelect.id"
      >
        <div v-if="rowIndex !== 0">
          <Rune
            :isKeystone="runeToSelectRow === 0"
            :tree="runeTree"
            :runeSlot="rowIndex"
            :rune="index"
            @click="selectRune(rowIndex, index)"
          />
        </div>
      </div>
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
  name: "runeSecondarySelector",
  props: ["isOpen", "runeTree", "runeSlot", "runes", "runeToAddIndex"],
  components: { FontAwesomeIcon, Rune },
  data() {
    return {
      icon: { cancel: faTimes, save: faSave, edit: faPen, delete: faTrashAlt }
    };
  },
  mounted(): void {
    console.log(this.runes[this.runeTree].slots);
  },
  methods: {
    selectRune(rowIndex: number, index: number): void {
      this.$emit("selectRune", false, rowIndex, index, this.runeToAddIndex);
      this.$emit("selectedRune", false);
    }
  },
  computed: {
    runesToSelect(): any {
      return this.runes[this.runeTree].slots;
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

  > .runeRow {
    display: flex;
    flex-direction: row;
  }
}
</style>