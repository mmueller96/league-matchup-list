<template>
  <div v-if="isMatchupList">
    <div class="runeCellWrapper">
      <div class="runeCellKeystone">
        <Rune
          :isKeystone="true"
          :tree="runeSets[selectedRuneSet].main"
          :runeSlot="runeSets[selectedRuneSet].keystone.slot"
          :rune="runeSets[selectedRuneSet].keystone.rune"
        />
      </div>
      <div class="runeCellRunes">
        <div class="runeCellMain">
          <Rune
            :isKeystone="false"
            :tree="runeSets[selectedRuneSet].main"
            :runeSlot="runeSets[selectedRuneSet].rune1.slot"
            :rune="runeSets[selectedRuneSet].rune1.rune"
          />
          <Rune
            :isKeystone="false"
            :tree="runeSets[selectedRuneSet].main"
            :runeSlot="runeSets[selectedRuneSet].rune2.slot"
            :rune="runeSets[selectedRuneSet].rune2.rune"
          />
          <Rune
            :isKeystone="false"
            :tree="runeSets[selectedRuneSet].main"
            :runeSlot="runeSets[selectedRuneSet].rune3.slot"
            :rune="runeSets[selectedRuneSet].rune3.rune"
          />
        </div>
        <div class="runeCellSecondary">
          <Rune
            :isKeystone="false"
            :tree="runeSets[selectedRuneSet].secondary"
            :runeSlot="runeSets[selectedRuneSet].rune4.slot"
            :rune="runeSets[selectedRuneSet].rune4.rune"
          />
          <Rune
            :isKeystone="false"
            :tree="runeSets[selectedRuneSet].secondary"
            :runeSlot="runeSets[selectedRuneSet].rune5.slot"
            :rune="runeSets[selectedRuneSet].rune5.rune"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="runes" v-else>
    <div
      v-for="(rune, index) in runeSetsState"
      v-bind:key="`rune${index}`"
      class="runeWrapper"
    >
      <RuneBox
        :value="rune"
        :index="index"
        :isEdit="indexToEdit === index"
        @edit="edit(rune, index)"
        @delete_="delete_(index, rune.title)"
        @save="save"
        @cancel="cancel"
      />
    </div>
    <button class="add" @click="add()">add rune part</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Matchup } from "../store/types";
import Rune from "@/components/Rune.vue";
import { IRuneSet } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import RuneBox from "@/components/RuneBox.vue";

export default Vue.extend({
  name: "runeSets",
  props: ["runeSets", "selectedRuneSet", "isMatchupList"],
  components: { FontAwesomeIcon, Rune, RuneBox },
  data() {
    return {
      indexToEdit: -1,
      icon: { cancel: faTimes, save: faSave, edit: faPen, delete: faTrashAlt },
      runeSetsState: [],
      isPrimaryTreeSelection: false,
      isSecondaryTreeSelection: false
    };
  },
  mounted(): void {
    //@ts-ignore
    this.runeSetsState = [...this.runeSets];
  },
  methods: {
    edit(runeSet: IRuneSet, index: number): void {
      this.indexToEdit = index;
    },
    delete_(index: number, title: string): void {
      //@ts-ignore
      this.$buefy.dialog.confirm({
        type: "is-danger",
        message: `<div class="dialogTitle">Are you sure?</div><div class="dialogText">Do you really want to remove <b>${title}</b> from your runes? <br> This deletion cannot be undone!</div>`,
        hasIcon: true,
        icon: "exclamation",
        iconPack: "fa",
        onConfirm: () => {
          (this.runeSetsState as IRuneSet[]).splice(index, 1);
          this.$store.commit("setRuneSetsFromData", this.runeSetsState);
          //@ts-ignore
          this.$buefy.toast.open({
            message: `Poof! Your rune set has been deleted!`,
            type: "is-success",
            duration: 4000
          });
        }
      });
    },
    save(newRuneData: IRuneSet, index: number): void {
      (this.runeSetsState as IRuneSet[])[index] = newRuneData;
      this.$store.commit("setRuneSetsFromData", this.runeSetsState);
      this.indexToEdit = -1;
      //@ts-ignore
      this.$buefy.toast.open({
        message: `Yaay! Your rune set was successfully saved!`,
        type: "is-success",
        duration: 4000
      });
      this.isPrimaryTreeSelection = false;
      this.isSecondaryTreeSelection = false;
    },
    cancel(): void {
      this.indexToEdit = -1;
      //@ts-ignore
      this.runeSetsState = [...this.runeSets];
      this.isPrimaryTreeSelection = false;
      this.isSecondaryTreeSelection = false;
    },
    add(): void {
      let newData: IRuneSet = {
        title: "",
        description: "",
        main: -1,
        secondary: -1,
        keystone: { slot: -1, rune: -1 },
        rune1: { slot: -1, rune: -1 },
        rune2: { slot: -1, rune: -1 },
        rune3: { slot: -1, rune: -1 },
        rune4: { slot: -1, rune: -1 },
        rune5: { slot: -1, rune: -1 }
      };
      let newLength: number = (this.runeSetsState as IRuneSet[]).push(newData);
      this.indexToEdit = newLength - 1;
    }
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
  > .add {
    margin: 0;
  }
}

.runeCellWrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  > .runeCellKeystone {
    > img {
      width: 48px;
      height: 48px;
    }
  }

  > .runeCellRunes {
    > .runeCellMain {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    > .runeCellSecondary {
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