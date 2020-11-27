<template>
    <div v-if="isMatchupList">
        <div class="runeCellWrapper">
            <div class="runeCellKeystone">
                <Rune :isKeystone="true" :tree="runeSets[selectedRuneSet].main" :runeSlot="runeSets[selectedRuneSet].keystone.slot" :rune="runeSets[selectedRuneSet].keystone.rune" />
            </div>
            <div class="runeCellRunes">
                <div class="runeCellMain">
                    <Rune :isKeystone="false" :tree="runeSets[selectedRuneSet].main" :runeSlot="runeSets[selectedRuneSet].rune1.slot" :rune="runeSets[selectedRuneSet].rune1.rune" />
                    <Rune :isKeystone="false" :tree="runeSets[selectedRuneSet].main" :runeSlot="runeSets[selectedRuneSet].rune2.slot" :rune="runeSets[selectedRuneSet].rune2.rune" />
                    <Rune :isKeystone="false" :tree="runeSets[selectedRuneSet].main" :runeSlot="runeSets[selectedRuneSet].rune3.slot" :rune="runeSets[selectedRuneSet].rune3.rune" />
                </div>
                <div class="runeCellSecondary">
                    <Rune :isKeystone="false" :tree="runeSets[selectedRuneSet].secondary" :runeSlot="runeSets[selectedRuneSet].rune4.slot" :rune="runeSets[selectedRuneSet].rune4.rune" />
                    <Rune :isKeystone="false" :tree="runeSets[selectedRuneSet].secondary" :runeSlot="runeSets[selectedRuneSet].rune5.slot" :rune="runeSets[selectedRuneSet].rune5.rune" />
                </div>
            </div>
        </div>
    </div>

    <div class="runes" v-else>
        <div v-for="(rune, index) in runeSetsState" v-bind:key="`rune${index}`" class="runeWrapper">
            <!-- Rune Head -->
            <div class="runeHead" v-if="index !== indexToEdit">
                <h5>{{ rune.title }}</h5>
                <button class="actionButton edit" @click="edit(rune, index)">
                    <font-awesome-icon :icon="icon.edit" size="1x" />
                </button>
                <button class="actionButton delete_" @click="delete_(index, rune.title)">
                    <font-awesome-icon :icon="icon.delete" size="1x" />
                </button>
            </div>

            <div class="runeHead" v-if="index === indexToEdit">
                <input class="h5" v-model="dataToEdit.title" />
                <button class="actionButton save" @click="save(index)">
                    <font-awesome-icon :icon="icon.save" size="1x" />
                </button>
                <button class="actionButton cancel" @click="cancel()">                     
                    <font-awesome-icon :icon="icon.cancel" size="1x" />
                </button>
            </div>
            
            <div class="runeBody">
                <Rune :isKeystone="true" :tree="rune.main" :runeSlot="rune.keystone.slot" :rune="rune.keystone.rune" />
                <Rune :isKeystone="false" :tree="rune.main" :runeSlot="rune.rune1.slot" :rune="rune.rune1.rune" />
                <Rune :isKeystone="false" :tree="rune.main" :runeSlot="rune.rune2.slot" :rune="rune.rune2.rune" />
                <Rune :isKeystone="false" :tree="rune.main" :runeSlot="rune.rune3.slot" :rune="rune.rune3.rune" />
                <Rune :isKeystone="false" :tree="rune.secondary" :runeSlot="rune.rune4.slot" :rune="rune.rune4.rune" />
                <Rune :isKeystone="false" :tree="rune.secondary" :runeSlot="rune.rune5.slot" :rune="rune.rune5.rune" />
            </div>

            <!-- Rune Footer -->
            <div class="runeFooter" v-if="index !== indexToEdit">
                <p>{{ rune.description }}</p>
            </div>
            <div class="runeFooter" v-if="index === indexToEdit">
                <input v-model="dataToEdit.description" />
            </div>
        </div>
        <button class="add" @click="add()">add rune part</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Matchup } from "../store/types";
import Rune from "@/components/Rune.vue";
import { IRuneSet } from "./types";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default Vue.extend({
	name: "runes",
    props: ["runeSets", "selectedRuneSet", "isMatchupList"],
    components: { FontAwesomeIcon, Rune },
    data() {
        return {
            indexToEdit: -1,
            dataToEdit: {},
            icon: { cancel: faTimes, save: faSave, edit: faPen, delete: faTrashAlt },
            runeSetsState: [],
        }
    },
    mounted(): void {
        //@ts-ignore
        this.runeSetsState = [...this.runeSets];

        console.log("runeSets", this.runeSets);
        
        console.log(this.runeData[this.runeSets[0].main].slots[0].runes[3].icon);
    },
    methods: {
        edit(runeSet: IRuneSet, index: number): void {
            this.dataToEdit = Object.assign({}, runeSet);
            this.indexToEdit = index;
        },
        delete_(index: number, title: string): void {
            //@ts-ignore
            this.$buefy.dialog.confirm({
                type: "is-danger",
                message: `<div class="dialogTitle">Are you sure?</div><div class="dialogText">Do you really want to remove <b>${title}</b> from your runes? <br> This deletion cannot be undone!</div>`,
                hasIcon: true,
                icon: 'exclamation',
                iconPack: 'fa',
                onConfirm: () => {
                    (this.runeSetsState as IRuneSet[]).splice(index, 1);
                    this.$store.commit("setRuneSetsFromData", this.runeSetsState);
                    //@ts-ignore
                    this.$buefy.toast.open({
                        message: `Poof! Your rune set has been deleted!`,
                        type: 'is-success',
                        duration: 4000,
                    });
                }
            });
        },
        save(index: number): void {
            (this.runeSetsState as IRuneSet[])[index] = this.dataToEdit as IRuneSet;
            this.$store.commit("setRuneSetsFromData", this.runeSetsState);
            this.indexToEdit = -1;
            this.dataToEdit = {};
            //@ts-ignore
            this.$buefy.toast.open({
                message: `Yaay! Your rune set was successfully saved!`,
                type: 'is-success',
                duration: 4000,
            });
        },
        cancel(): void {
            this.dataToEdit = {};
            this.indexToEdit = -1;
            //@ts-ignore
            this.runeSetsState = [...this.runeSets];
        },
        add(): void {
            let newData: IRuneSet = {
				title: "",
				description: "",
				main: -1,
				secondary: -1,
				keystone: {slot: -1, rune: -1} , 
				rune1: {slot: -1, rune: -1}, 
				rune2: {slot: -1, rune: -1}, 
				rune3: {slot: -1, rune: -1}, 
				rune4: {slot: -1, rune: -1}, 
				rune5: {slot: -1, rune: -1}, 
			};
            let newLength: number = (this.runeSetsState as IRuneSet[]).push(newData);
            this.indexToEdit = newLength - 1;
            this.dataToEdit = newData;
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
    >.runeWrapper {
        min-width: 180px;
        background: #ECEDEF;
        padding: 10px 10px 20px 10px;

        >.runeHead {
            display: flex;

            >.actionButton {
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
                    background: linear-gradient(90deg, rgba(29,196,233,1) 0%, rgba(29,233,182,1) 100%);
                    margin-right: 5px;
                }
                
                &.save {
                    background: linear-gradient(90deg, rgba(29,196,233,1) 0%, rgba(29,233,182,1) 100%);
                    margin-right: 5px;
                }

                &.delete_ {
                    background: linear-gradient(90deg, rgba(141,10,2,1) 0%, rgba(244,66,54,1) 100%);
                }

                &.cancel {
                    background: linear-gradient(90deg, rgba(141,10,2,1) 0%, rgba(244,66,54,1) 100%);
                }
            }

            >h5 {
                margin-bottom: 12px;
                margin-right: auto;
            }

            >input {
                margin-right: auto;
            }
        }
    }
}

.runeCellWrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    >.runeCellKeystone {
        >img {
            width: 48px;
            height: 48px;
        }
    }

    >.runeCellRunes{
        >.runeCellMain {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        >.runeCellSecondary {
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