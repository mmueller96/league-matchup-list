<template>
  <div class="items">
    <div
      v-for="(itemset, index) in itemSetsState"
      v-bind:key="`item${index}`"
      class="itemWrapper"
    >
      <ItemBox
        :value="itemset"
        :index="index"
        :isEdit="indexToEdit === index"
        @edit="edit(rune, index)"
        @delete_="delete_(index, itemset.title)"
        @save="save"
        @cancel="cancel"
      />
    </div>
    <button class="add" @click="add()">add item part</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Item from "@/components/Item.vue";
import { IItemSet } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ItemBox from "@/components/ItemBox.vue";

export default Vue.extend({
  name: "itemSets",
  props: ["itemSets", "selectedItemSet"],
  components: { FontAwesomeIcon, Item, ItemBox },
  data() {
    return {
      indexToEdit: -1,
      icon: { cancel: faTimes, save: faSave, edit: faPen, delete: faTrashAlt },
      itemSetsState: [],
    };
  },
  mounted(): void {
    //@ts-ignore
    this.itemSetsState = [...this.itemSets];    
  },
  watch: {
    runeSets(newItemSet: any): void {
      this.itemSetsState = [];
      //@ts-ignore
      this.itemSetsState = [...newItemSet];
    }
  },
  methods: {
    edit(itemSet: IItemSet, index: number): void {
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
          (this.itemSetsState as IItemSet[]).splice(index, 1);
          this.$store.commit("setRuneSetsFromData", this.itemSetsState);
          //@ts-ignore
          this.$buefy.toast.open({
            message: `Poof! Your rune set has been deleted!`,
            type: "is-success",
            duration: 4000
          });
        }
      });
    },
    save(newItemData: IItemSet, index: number): void {
      (this.itemSetsState as IItemSet[])[index] = newItemData;
      this.$store.commit("setItemSetsFromData", this.itemSetsState);
      this.indexToEdit = -1;
      //@ts-ignore
      this.$buefy.toast.open({
        message: `Yaay! Your rune set was successfully saved!`,
        type: "is-success",
        duration: 4000
      });
    },
    cancel(): void {
      this.indexToEdit = -1;
      //@ts-ignore
      this.itemSetsState = [...this.itemSets];
    },
    add(): void {
      let newData: IItemSet = {
        title: "",
        description: "",
        items: [],
      };
      let newLength: number = (this.itemSetsState as IItemSet[]).push(newData);
      this.indexToEdit = newLength - 1;
    }
  },
  computed: {
    itemData(): any {
      return this.$store.state.Matchup.itemData;
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