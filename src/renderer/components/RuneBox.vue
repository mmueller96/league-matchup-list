<template>
  <div class="runeWrapper">
    <!-- Rune Head -->
    <div class="runeHead" v-if="!isEdit">
      <h5>{{ dataToEdit.title }}</h5>
      <button class="actionButton edit" @click="$emit('edit')">
        <font-awesome-icon :icon="icon.edit" size="1x" />
      </button>
      <button class="actionButton delete_" @click="$emit('delete_')">
        <font-awesome-icon :icon="icon.delete" size="1x" />
      </button>
    </div>

    <div class="runeHead" v-else>
      <input class="h5" v-model="dataToEdit.title" />
      <button
        class="actionButton save"
        @click="$emit('save', dataToEdit, index)"
      >
        <font-awesome-icon :icon="icon.save" size="1x" />
      </button>
      <button class="actionButton cancel" @click="cancel()">
        <font-awesome-icon :icon="icon.cancel" size="1x" />
      </button>
    </div>

    <div class="runeBody">
      <div class="runePrimaryWrapper" v-if="!isEdit">
        <div class="runePrimaryTree">
          <Rune
            :isKeystone="true"
            :tree="dataToEdit.main"
            :runeSlot="dataToEdit.keystone.slot"
            :rune="dataToEdit.keystone.rune"
          />
          <Rune
            :isKeystone="false"
            :tree="dataToEdit.main"
            :runeSlot="dataToEdit.rune1.slot"
            :rune="dataToEdit.rune1.rune"
          />
          <Rune
            :isKeystone="false"
            :tree="dataToEdit.main"
            :runeSlot="dataToEdit.rune2.slot"
            :rune="dataToEdit.rune2.rune"
          />
          <Rune
            :isKeystone="false"
            :tree="dataToEdit.main"
            :runeSlot="dataToEdit.rune3.slot"
            :rune="dataToEdit.rune3.rune"
          />
        </div>
        <div :class="`runeTree runePrimary${dataToEdit.main}`">
          {{ runeTreeType(dataToEdit.main) }}
        </div>
      </div>

      <div
        :class="isEdit ? 'runePrimaryWrapper edit' : 'runePrimaryWrapper'"
        v-else
      >
        <div class="runePrimaryTree">
          <div class="runeSelect">
            <RunePrimarySelector
              :isOpen="isKeystoneSelectionOpen"
              :runes="runeData"
              :runeTree="dataToEdit.main"
              :runeSlot="0"
              @selectRune="selectRune"
              @selectedRune="isKeystoneSelectionOpen = false"
            />
            <Rune
              :isKeystone="true"
              :tree="dataToEdit.main"
              :runeSlot="dataToEdit.keystone.slot"
              :rune="dataToEdit.keystone.rune"
              @click="isKeystoneSelectionOpen = !isKeystoneSelectionOpen"
            />
          </div>

          <div class="runeSelect">
            <RunePrimarySelector
              :isOpen="isRune1SelectionOpen"
              :runes="runeData"
              :runeTree="dataToEdit.main"
              :runeSlot="1"
              @selectRune="selectRune"
              @selectedRune="isRune1SelectionOpen = false"
            />
            <Rune
              :isKeystone="false"
              :tree="dataToEdit.main"
              :runeSlot="dataToEdit.rune1.slot"
              :rune="dataToEdit.rune1.rune"
              @click="isRune1SelectionOpen = !isRune1SelectionOpen"
            />
          </div>

          <div class="runeSelect">
            <RunePrimarySelector
              :isOpen="isRune2SelectionOpen"
              :runes="runeData"
              :runeTree="dataToEdit.main"
              :runeSlot="2"
              @selectRune="selectRune"
              @selectedRune="isRune2SelectionOpen = false"
            />
            <Rune
              :isKeystone="false"
              :tree="dataToEdit.main"
              :runeSlot="dataToEdit.rune2.slot"
              :rune="dataToEdit.rune2.rune"
              @click="isRune2SelectionOpen = !isRune2SelectionOpen"
            />
          </div>

          <div class="runeSelect">
            <RunePrimarySelector
              :isOpen="isRune3SelectionOpen"
              :runes="runeData"
              :runeTree="dataToEdit.main"
              :runeSlot="3"
              @selectRune="selectRune"
              @selectedRune="isRune3SelectionOpen = false"
            />
            <Rune
              :isKeystone="false"
              :tree="dataToEdit.main"
              :runeSlot="dataToEdit.rune3.slot"
              :rune="dataToEdit.rune3.rune"
              @click="isRune3SelectionOpen = !isRune3SelectionOpen"
            />
          </div>
        </div>

        <div class="runePrimaryTreeType">
          <div
            v-if="dataToEdit.main === -1"
            :class="`runeTree runePrimary-1`"
            @click="selectMainTree(-1)"
          >
            PRIMARY
          </div>
          <div
            v-if="isPrimaryTreeSelection || dataToEdit.main === 0"
            :class="'runeTree runePrimary0'"
            @click="selectMainTree(0)"
          >
            DOMINATION
          </div>
          <div
            v-if="isPrimaryTreeSelection || dataToEdit.main === 1"
            :class="'runeTree runePrimary1'"
            @click="selectMainTree(1)"
          >
            INSPIRATION
          </div>
          <div
            v-if="isPrimaryTreeSelection || dataToEdit.main === 2"
            :class="'runeTree runePrimary2'"
            @click="selectMainTree(2)"
          >
            PRECISION
          </div>
          <div
            v-if="isPrimaryTreeSelection || dataToEdit.main === 3"
            :class="'runeTree runePrimary3'"
            @click="selectMainTree(3)"
          >
            RESOLVE
          </div>
          <div
            v-if="isPrimaryTreeSelection || dataToEdit.main === 4"
            :class="'runeTree runePrimary4'"
            @click="selectMainTree(4)"
          >
            SORCERY
          </div>
        </div>
      </div>

      <div class="runeSecondaryWrapper" v-if="!isEdit">
        <div class="runeSecondaryTree">
          <Rune
            :isKeystone="false"
            :tree="dataToEdit.secondary"
            :runeSlot="dataToEdit.rune4.slot"
            :rune="dataToEdit.rune4.rune"
          />
          <Rune
            :isKeystone="false"
            :tree="dataToEdit.secondary"
            :runeSlot="dataToEdit.rune5.slot"
            :rune="dataToEdit.rune5.rune"
          />
        </div>
        <div :class="`runeTree runeSecondary${dataToEdit.secondary}`">
          {{ runeTreeType(dataToEdit.secondary) }}
        </div>
      </div>

      <div
        :class="isEdit ? 'runeSecondaryWrapper edit' : 'runeSecondaryWrapper'"
        v-else
      >
        <div class="runeSecondaryTree">
          <RuneSecondarySelector
            :isOpen="isRune4SelectionOpen"
            :runes="runeData"
            :runeTree="dataToEdit.secondary"
            :runeSlot="4"
            :runeToAddIndex="0"
            @selectRune="selectRune"
            @selectedRune="isRune4SelectionOpen = false"
          />
          <Rune
            :isKeystone="false"
            :tree="dataToEdit.secondary"
            :runeSlot="dataToEdit.rune4.slot"
            :rune="dataToEdit.rune4.rune"
            @click="isRune4SelectionOpen = !isRune4SelectionOpen"
          />
          <RuneSecondarySelector
            :isOpen="isRune5SelectionOpen"
            :runes="runeData"
            :runeTree="dataToEdit.secondary"
            :runeSlot="5"
            :runeToAddIndex="1"
            @selectRune="selectRune"
            @selectedRune="isRune5SelectionOpen = false"
          />
          <Rune
            :isKeystone="false"
            :tree="dataToEdit.secondary"
            :runeSlot="dataToEdit.rune5.slot"
            :rune="dataToEdit.rune5.rune"
            @click="isRune5SelectionOpen = !isRune5SelectionOpen"
          />
        </div>

        <div class="runeSecondaryTreeType">
          <div
            v-if="dataToEdit.secondary === -1"
            :class="`runeTree runeSecondary-1`"
            @click="selectSecondaryTree(-1)"
          >
            SECONDARY
          </div>
          <div
            v-if="
              (isSecondaryTreeSelection && dataToEdit.main !== 0) ||
                dataToEdit.secondary === 0
            "
            :class="`runeTree runeSecondary0 selectedTree`"
            @click="selectSecondaryTree(0)"
          >
            DOMINATION
          </div>
          <div
            v-if="
              (isSecondaryTreeSelection && dataToEdit.main !== 1) ||
                dataToEdit.secondary === 1
            "
            :class="`runeTree runeSecondary1 selectedTree`"
            @click="selectSecondaryTree(1)"
          >
            INSPIRATION
          </div>
          <div
            v-if="
              (isSecondaryTreeSelection && dataToEdit.main !== 2) ||
                dataToEdit.secondary === 2
            "
            :class="`runeTree runeSecondary2 selectedTree`"
            @click="selectSecondaryTree(2)"
          >
            PRECISION
          </div>
          <div
            v-if="
              (isSecondaryTreeSelection && dataToEdit.main !== 3) ||
                dataToEdit.secondary === 3
            "
            :class="`runeTree runeSecondary3 selectedTree`"
            @click="selectSecondaryTree(3)"
          >
            RESOLVE
          </div>
          <div
            v-if="
              (isSecondaryTreeSelection && dataToEdit.main !== 4) ||
                dataToEdit.secondary === 4
            "
            :class="`runeTree runeSecondary4 selectedTree`"
            @click="selectSecondaryTree(4)"
          >
            SORCERY
          </div>
        </div>
      </div>
    </div>

    <!-- Rune Footer -->
    <div class="runeFooter" v-if="!isEdit">
      <p>{{ dataToEdit.description }}</p>
    </div>
    <div class="runeFooter" v-else>
      <textarea v-model="dataToEdit.description" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Rune from "@/components/Rune.vue";
import RunePrimarySelector from "@/components/RunePrimarySelector.vue";
import RuneSecondarySelector from "@/components/RuneSecondarySelector.vue";
import { IRuneSet, ERuneTypes } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
  name: "runeBox",
  props: ["value", "index", "isEdit"],
  components: {
    FontAwesomeIcon,
    Rune,
    RunePrimarySelector,
    RuneSecondarySelector
  },
  data() {
    return {
      dataToEdit: Object.assign({}, this.value),
      icon: { cancel: faTimes, save: faSave, edit: faPen, delete: faTrashAlt },
      isPrimaryTreeSelection: false,
      isSecondaryTreeSelection: false,
      isKeystoneSelectionOpen: false,
      isRune1SelectionOpen: false,
      isRune2SelectionOpen: false,
      isRune3SelectionOpen: false,
      isRune4SelectionOpen: false,
      isRune5SelectionOpen: false
    };
  },
  watch: {
    isEdit(isEdit: boolean) {
      if (!isEdit) {
        this.isPrimaryTreeSelection = false;
        this.isPrimaryTreeSelection = false;
      }
    }
  },
  methods: {
    selectRune(
      isPrimary: boolean,
      runeSlot: number,
      rune: number,
      runeToAddIndex: number
    ): void {
      if (isPrimary) {
        if (runeSlot === 0)
          (this.dataToEdit as IRuneSet).keystone = {
            slot: runeSlot,
            rune: rune
          };
        else if (runeSlot === 1)
          (this.dataToEdit as IRuneSet).rune1 = { slot: runeSlot, rune: rune };
        else if (runeSlot === 2)
          (this.dataToEdit as IRuneSet).rune2 = { slot: runeSlot, rune: rune };
        else if (runeSlot === 3)
          (this.dataToEdit as IRuneSet).rune3 = { slot: runeSlot, rune: rune };
      } else {
        if (runeToAddIndex === 0)
          (this.dataToEdit as IRuneSet).rune4 = { slot: runeSlot, rune: rune };
        if (runeToAddIndex === 1)
          (this.dataToEdit as IRuneSet).rune5 = { slot: runeSlot, rune: rune };
      }
    },
    selectMainTree(tree: number): void {
      //close the selecion
      if (this.isPrimaryTreeSelection === true) {
        this.isPrimaryTreeSelection = false;

        if (tree !== -1) {
          (this.dataToEdit as IRuneSet).main = tree;
          (this.dataToEdit as IRuneSet).secondary = -1;
        }
        //open the selecion
      } else {
        this.isPrimaryTreeSelection = true;
        this.isSecondaryTreeSelection = false;
        this.isKeystoneSelectionOpen = false;
        this.isRune1SelectionOpen = false;
        this.isRune2SelectionOpen = false;
        this.isRune3SelectionOpen = false;
        this.isRune4SelectionOpen = false;
        this.isRune5SelectionOpen = false;
        (this.dataToEdit as IRuneSet).keystone = { slot: -1, rune: -1 };
        (this.dataToEdit as IRuneSet).rune1 = { slot: -1, rune: -1 };
        (this.dataToEdit as IRuneSet).rune2 = { slot: -1, rune: -1 };
        (this.dataToEdit as IRuneSet).rune3 = { slot: -1, rune: -1 };
      }
    },
    selectSecondaryTree(tree: number): void {
      //close the selecion
      if (this.isSecondaryTreeSelection === true) {
        this.isSecondaryTreeSelection = false;

        if (tree !== -1) {
          (this.dataToEdit as IRuneSet).secondary = tree;
        }
        //open the selecion
      } else {
        this.isSecondaryTreeSelection = true;
        this.isPrimaryTreeSelection = false;
      }
    },
    runeTreeType(tree: number): string {
      switch (tree) {
        case ERuneTypes.DOMINATION:
          return "DOMINATION";

        case ERuneTypes.INSPIRATION:
          return "INSPIRATION";

        case ERuneTypes.PRECISION:
          return "PRECISION";

        case ERuneTypes.RESOLVE:
          return "RESOLVE";

        case ERuneTypes.SORCERY:
          return "SORCERY";

        default:
          return "";
      }
    },
    cancel(): void {
      this.isPrimaryTreeSelection = false;
      this.isSecondaryTreeSelection = false;
      this.isKeystoneSelectionOpen = false;
      this.isRune1SelectionOpen = false;
      this.isRune2SelectionOpen = false;
      this.isRune3SelectionOpen = false;
      this.isRune4SelectionOpen = false;
      this.isRune5SelectionOpen = false;
      this.dataToEdit = Object.assign({}, this.value);
      this.$emit("cancel");
    }
  },
  computed: {
    runeData(): any {
      return this.$store.state.Matchup.runeData;
    }
  }
});
</script>

<style lang="scss" scoped>
.runeWrapper {
  min-width: 180px;
  background: #ecedef;
  padding: 10px 10px 20px 10px;
  margin-bottom: 20px;

  > .runeHead {
    display: flex;

    > .actionButton {
      width: 18px;
      height: 18px;
      color: white;
      cursor: pointer;
      outline: none;
      border: none;
      padding: 0;
      font-size: 8px;
      border-radius: 100%;

      &.edit {
        background: linear-gradient(
          90deg,
          rgba(29, 196, 233, 1) 0%,
          rgba(29, 233, 182, 1) 100%
        );
        margin-right: 5px;
      }

      &.save {
        background: linear-gradient(
          90deg,
          rgba(29, 196, 233, 1) 0%,
          rgba(29, 233, 182, 1) 100%
        );
        margin-right: 5px;
      }

      &.delete_ {
        background: linear-gradient(
          90deg,
          rgba(141, 10, 2, 1) 0%,
          rgba(244, 66, 54, 1) 100%
        );
      }

      &.cancel {
        background: linear-gradient(
          90deg,
          rgba(141, 10, 2, 1) 0%,
          rgba(244, 66, 54, 1) 100%
        );
      }
    }

    > h5 {
      margin-bottom: 12px;
      margin-right: auto;
    }

    > input {
      margin-right: auto;
      border: none;
      padding: 0;
      margin-bottom: 12px;
      border-radius: 0;
      width: calc(100% - 18px - 18px - 5px - 5px);

      &.h5 {
        font-family: "Open Sans", sans-serif;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 3px;
      }
    }
  }

  > .runeBody {
    display: flex;
    flex-direction: row;

    > .runePrimaryWrapper {
      display: flex;
      flex-direction: column;
      margin-right: 20px;

      &.edit {
        position: relative;
        padding-bottom: 17px;
      }

      > .runePrimaryTreeType {
        position: absolute;
        width: 100%;
        bottom: 0;
      }

      > .runePrimaryTree {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        margin-bottom: 5px;

        > .runeSelect {
          display: flex;
          flex-direction: row;
        }
      }
    }

    > .runeSecondaryWrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      &.edit {
        position: relative;
        padding-bottom: 17px;
      }

      > .runeSecondaryTreeType {
        position: absolute;
        width: 100%;
        bottom: 0;
      }
    }

    .runeTree {
      height: 17px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 8px;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-weight: 600;
      user-select: none;

      &.runePrimary-1 {
        border: 1px solid #c6c9cf;
        color: #c6c9cf;
        background: none;
        cursor: pointer;
        width: calc(100% - 2px);
      }

      &.runePrimary0 {
        background: #f44236;
      }
      &.runePrimary1 {
        background: #04a9f5;
      }

      &.runePrimary2 {
        background: #f4c22b;
      }
      &.runePrimary3 {
        background: #1de9b6;
      }

      &.runePrimary4 {
        background: #a389d4;
      }

      &.runeSecondary0 {
        background: #f44236;
        padding: 0 5px;
      }

      &.runeSecondary1 {
        background: #04a9f5;
        padding: 0 5px;
      }

      &.runeSecondary2 {
        background: #f4c22b;
        padding: 0 5px;
      }

      &.runeSecondary3 {
        background: #1de9b6;
      }

      &.runeSecondary4 {
        background: #a389d4;
      }
    }
  }

  > .runeFooter {
    margin-top: 10px;

    > p {
      white-space: pre-line;
    }

    > textarea {
      border: none;
      padding: 0;
      border-radius: 0;
      width: 100%;
      font-size: 12px;
      font-family: "Open Sans", sans-serif;
      font-weight: 300;
      outline: none;
      resize: vertical;
    }
  }
}

.blur {
  position: fixed;
  width: 100vw;
  height: 100vh;
}
</style>