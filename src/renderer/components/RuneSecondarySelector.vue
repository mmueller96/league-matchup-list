<template>
  <div class="runeSecondarySelector" v-if="isOpen" ref="runeSecondarySelector">
    <div
      v-for="(runeToSelectRow, rowIndex) in runesToSelect"
      v-bind:key="`selectorSecondaryType${rowIndex}`"
      class="runeRow"
    >
      <div
        v-for="(runeToSelect, index) in runeToSelectRow.runes"
        v-bind:key="runeToSelect.id"
        :class="disableRune(rowIndex, index) ? 'runeCell isSelected' : 'runeCell'"
      >
        <div v-if="rowIndex !== 0" :class="disableSelection(rowIndex, index) ? 'cantSelect' : 'canSelect'">
          <Rune
            :isKeystone="runeToSelectRow === 0"
            :tree="runeTree"
            :runeSlot="rowIndex"
            :rune="index"
            :disabled="disableSelection(rowIndex, index)"
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
  props: ["isOpen", "runeTree", "runes", "runeToAddIndex", "firstSelectedRune", "secondSelectedRune"],
  components: { FontAwesomeIcon, Rune },
  data() {
    return {
      icon: { cancel: faTimes, save: faSave, edit: faPen, delete: faTrashAlt },
    };
  },
  watch: {
    isOpen(newOpen: boolean): void {
      if (newOpen) {
        //@ts-ignore
        document.getElementById('app').addEventListener('click', this.toggle, false);
      } else {
        //@ts-ignore
        document.getElementById('app').removeEventListener('click', this.toggle, false);
      }      
    }
  },
  methods: {
    selectRune(rowIndex: number, index: number): void {
      this.$emit("selectRune", false, rowIndex, index, this.runeToAddIndex);
      this.$emit("selectedRune", false);
    },
    disableRune(rowIndex: number, index: number) {
      if (this.firstSelectedRune.slot === -1 && this.secondSelectedRune.slot === -1)
        return false;
      else if (this.firstSelectedRune.slot !== -1 && this.secondSelectedRune.slot !== -1) {        
        let rows: number[] = [1, 2, 3];
        let nonSelectedRow: number[] = rows.filter((element) => {
          return this.firstSelectedRune.slot !== element && this.secondSelectedRune.slot !== element;
        });
        return  ((this.firstSelectedRune.slot === rowIndex && !(this.firstSelectedRune.rune === index)) ||
                (this.secondSelectedRune.slot === rowIndex && !(this.secondSelectedRune.rune === index)) ||
                (nonSelectedRow[0] === rowIndex)
                );
      } else if (this.firstSelectedRune.slot !== -1) 
        return this.firstSelectedRune.slot === rowIndex && !(this.firstSelectedRune.rune === index);
      else if (this.secondSelectedRune.slot !== -1) 
        return this.secondSelectedRune.slot === rowIndex && !(this.secondSelectedRune.rune === index);
      else
        return ((this.firstSelectedRune.slot === rowIndex)
          || (this.secondSelectedRune.slot === rowIndex))
    },
    disableSelection(rowIndex: number, index: number) {
      if (this.firstSelectedRune.slot === -1 && this.secondSelectedRune.slot === -1)
        return false;
      else if (this.firstSelectedRune.slot !== -1 && this.secondSelectedRune.slot !== -1) {        
        let rows: number[] = [1, 2, 3];
        let nonSelectedRow: number[] = rows.filter((element) => {
          return this.firstSelectedRune.slot !== element && this.secondSelectedRune.slot !== element;
        });
        if (this.runeToAddIndex === 0) 
          return (this.firstSelectedRune.slot === rowIndex && this.firstSelectedRune.rune === index) || (this.secondSelectedRune.slot === rowIndex);
        else if (this.runeToAddIndex === 1) 
          return (this.secondSelectedRune.slot === rowIndex && this.secondSelectedRune.rune === index) || (this.firstSelectedRune.slot === rowIndex);
         else 
          return !(nonSelectedRow[0] === rowIndex)
      } else if (this.firstSelectedRune.slot !== -1) 
        return (this.firstSelectedRune.slot === rowIndex && !(this.firstSelectedRune.rune === index));
      else if (this.secondSelectedRune.slot !== -1) 
        return (this.secondSelectedRune.slot === rowIndex && !(this.secondSelectedRune.rune === index));
      else
        return ((this.firstSelectedRune.slot === rowIndex)
          || (this.secondSelectedRune.slot === rowIndex))
    },
    toggle(event: MouseEvent): void {
      //@ts-ignore
      if (event.target.classList[0] !== "rune") {
        //@ts-ignore
        if (event.target.classList[0] !== this.$refs.runeSecondarySelector.classList[0] ) {
          this.$emit("selectedRune");
        }
      }
    },
  },
  computed: {
    runesToSelect(): any {
      return this.runes[this.runeTree].slots;
    }
  }
});
</script>

<style lang="scss" scoped>
.runeSecondarySelector {
  position: absolute;
  z-index: 2;
  background: #ecedef;
  padding: 10px;
  margin-left: -10px;
  margin-top: -10px;

  > .runeRow {
    display: flex;
    flex-direction: row;

    >.runeCell{
      &:not(:last-child) {
        margin-right: 10px;
      }

      &.isSelected {
        filter: grayscale(100%);
      }

      >.cantSelect {
        padding: 4px;
        cursor: not-allowed;
      }

      >.canSelect {
        cursor: pointer;
        border: 2px solid red;
        border-radius: 100%;
        height: 32px;
        padding: 2px;
      }
    }
  }
}
</style>