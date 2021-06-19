<template>
  <div class="itemWrapper">
    <!-- Rune Head -->
    <div class="itemHead" v-if="!isEdit">
      <h5>{{ dataToEdit.title }}</h5>
      <button class="actionButton edit is-small" @click="$emit('edit')">
        <font-awesome-icon :icon="icon.edit" size="1x" />
      </button>
      <button class="actionButton delete_ is-small" @click="$emit('delete_')">
        <font-awesome-icon :icon="icon.delete" size="1x" />
      </button>
    </div>

    <div class="itemHead" v-else>
      <input class="h5" v-model="dataToEdit.title" />
      <button
        class="actionButton save is-small"
        @click="$emit('save', dataToEdit, index)"
      >
        <font-awesome-icon :icon="icon.save" size="1x" />
      </button>
      <button class="actionButton cancel is-small" @click="cancel()">
        <font-awesome-icon :icon="icon.cancel" size="1x" />
      </button>
    </div>

    <div class="itemBody">
      <div class="itemsWrapper" v-if="!isEdit">
        <div class="items">
          <Item v-for="item in dataToEdit.items" v-bind:key="`itemImage${item.id}`" :image="item.image"/>
        </div>
      </div>

      <div v-else>
        <div class="items">
          <Item v-for="item in dataToEdit.items" v-bind:key="`itemImage${item.id}`" :image="item.image"/>
        </div>
        <b-autocomplete :data="filteredItems" field="name" v-model="selecteditemToAdd" @select="selectItem">
					<template slot="empty">No results found.</template>
				</b-autocomplete>
        <button @click="addItem">add item</button>
      </div>
    </div>

    <!-- Rune Footer -->
    <div class="itemFooter" v-if="!isEdit">
      <p>{{ dataToEdit.description }}</p>
    </div>
    <div class="itemFooter" v-else>
      <textarea v-model="dataToEdit.description" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Item from "@/components/Item.vue";
// import { IItemSet } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
  name: "itemBox",
  props: ["value", "index", "isEdit"],
  components: {
    FontAwesomeIcon,
    Item,
  },
  data() {
    return {
      dataToEdit: Object.assign({}, this.value),
      icon: { cancel: faTimes, save: faSave, edit: faPen, delete: faTrashAlt },
      selecteditemToAdd: "",
      itemToAdd: {},
      items: [],
    };
  },
	async mounted() {
    this.items = Object.values(this.itemData.data);
  },
  watch: {
    value(newValue: any) {
      this.dataToEdit = Object.assign({}, newValue);
    },
    isEdit(isEdit: boolean) {
    }
  },
  methods: {
    selectItem(option: any): void {
      this.itemToAdd = {id: Number((option.image.full as string).substr(0, 4)), name: option.name, image: option.image.full}
    },
    addItem(): void {
      this.dataToEdit.items.push(this.itemToAdd);
      this.selecteditemToAdd = "";
    },
    cancel(): void {
      this.dataToEdit = Object.assign({}, this.value);
      this.$emit("cancel");
    }
  },
  computed: {
    filteredItems() {
      //@ts-ignore
      return this.items.filter((option) => {
        return option.name
          .toString()
          .toLowerCase()
          .indexOf(this.selecteditemToAdd.toLowerCase()) >= 0;
      });
		},
    itemData(): any {
      return this.$store.state.Matchup.itemData;
    }
  }
});
</script>

<style lang="scss" scoped>
.itemWrapper {
  min-width: 180px;
  background: #ecedef;
  padding: 10px 10px 20px 10px;
  margin-bottom: 20px;

  > .itemHead {
    display: flex;

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

  > .itemBody {
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

  > .itemFooter {
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