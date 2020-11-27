<template>
    <div class="matchupList">
        <table>
            <thead>
                <tr>
                    <td class="roleCol">
                        Role
                    </td>
                    <td class="championCol">
                        Champion
                    </td>
                    <td class="runeCol">
                        Runes
                    </td>
                    <td>
                        Do's
                    </td>
                    <td>
                        Dont's
                    </td>
                    <td>
                        Notes
                    </td>
                    <td class="actionsCol">
                        Actions
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(matchup, index) in matchupsState" v-bind:key="`matchup${matchup.champion}${matchup.role}`">
                    <!-- Role Cell -->
                    <td class="roleCell" v-if="index !== indexToEdit">
                        <img src="../assets/position/Position_Grandmaster-Top.png" v-if="matchup.role === 'Top'" />
                        <img src="../assets/position/Position_Grandmaster-Jungle.png" v-if="matchup.role === 'Jungle'" />
                        <img src="../assets/position/Position_Grandmaster-Mid.png" v-if="matchup.role === 'Mid'" />
                        <img src="../assets/position/Position_Grandmaster-Bot.png" v-if="matchup.role === 'Bot'" />
                        <img src="../assets/position/Position_Grandmaster-Support.png" v-if="matchup.role === 'Support'" />
                    </td>
                    <td class="roleCell" v-if="index === indexToEdit">
                        <img src="../assets/position/Position_Grandmaster-Top.png" @click="toggleRole('Top')" v-if="dataToEdit.role === 'Top' || showRoleSelection" />
                        <img src="../assets/position/Position_Grandmaster-Jungle.png" @click="toggleRole('Jungle')" v-if="dataToEdit.role === 'Jungle' || showRoleSelection" />
                        <img src="../assets/position/Position_Grandmaster-Mid.png" @click="toggleRole('Mid')" v-if="dataToEdit.role === 'Mid' || showRoleSelection" />
                        <img src="../assets/position/Position_Grandmaster-Bot.png" @click="toggleRole('Bot')" v-if="dataToEdit.role === 'Bot' || showRoleSelection" />
                        <img src="../assets/position/Position_Grandmaster-Support.png" @click="toggleRole('Support')" v-if="dataToEdit.role === 'Support' || showRoleSelection" />
                    </td>

                    <!-- Champion Cell -->
                    <td class="championCell" v-if="index !== indexToEdit">
                        <img :src="`http://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/${matchup.champion}.png`" />
                    </td>
                    <td class="championCell" v-if="index === indexToEdit">
                        <b-autocomplete :data="filteredChampions" v-model="championToAdd" @select="selectChampion">
                            <template slot="empty">No results found.</template>
                        </b-autocomplete>
                    </td>

                    <!-- Rune Cell -->
                    <td class="runeCell" v-if="index !== indexToEdit">
                        <Runes v-if="matchup.runen >= 0" :runeSets="runeSets" :selectedRuneSet="matchup.runen" :isMatchupList="true" />
                        <p v-else>No Runes selected!</p>
                    </td>
                    <td class="runeCell" v-if="index === indexToEdit">
                        <b-select v-model="dataToEdit.runen">
                            <option v-for="(runeSet, index) in runeSets" v-bind:key="`matchupListRuneSet${index}`" :value="index">{{ runeSet.title }}</option>
                        </b-select>
                    </td>

                    <!-- Do Col -->
                    <td class="dosCell" v-if="index !== indexToEdit">
                        <ul>
                            <li v-for="(do_, index) in matchup.do_s" v-bind:key="`do${index}`">{{ do_ }}</li>                                                        
                        </ul>
                    </td>
                    <td class="dosCell" v-if="index === indexToEdit">
                        <ul>
                            <li class="tag" @dblclick="selectDo(do_, index)" v-for="(do_, index) in matchup.do_s" v-bind:key="`do${index}`">
                                <p>{{ do_ }}</p>
                                <button class="tagDelete" @click="removeDo(index)">
                                    <font-awesome-icon :icon="icon.cancel" size="1x" />
                                </button>
                            </li>
                            <input v-model="selectedDos.do_" @keyup.enter="addOrEditDos()">
                            <button class="primary" @click="addOrEditDos()">add</button>
                            <button @click="selectedDos = {do_: '', index: -1}">clear</button>
                        </ul>
                    </td>

                    <!-- Dont's Col -->
                    <td class="dontsCell" v-if="index !== indexToEdit">
                        <ul>
                            <li v-for="(dont_, index) in matchup.don_ts" v-bind:key="`dont${index}`">{{ dont_ }}</li>                                              
                        </ul>
                    </td>
                    <td class="dontsCell" v-if="index === indexToEdit">
                        <ul>
                            <li class="tag" @dblclick="selectDont(dont_, index)" v-for="(dont_, index) in matchup.don_ts" v-bind:key="`dont${index}`">
                                <p>{{ dont_ }}</p>
                                <button class="tagDelete" @click="removeDont(index)">
                                    <font-awesome-icon :icon="icon.cancel" size="1x" />
                                </button>
                            </li>
                            <input v-model="selectedDonts.dont" @keyup.enter="addOrEditDonts()"/>
                            <button class="primary" @click="addOrEditDonts()">add</button>
                            <button @click="selectedDonts = {dont: '', index: -1}">clear</button>
                        </ul>
                    </td>

                    <!-- Notes Col -->
                    <td class="notesCell" v-if="index !== indexToEdit">
                        <ul>
                            <li v-for="(notes, index) in matchup.notes" v-bind:key="`note${index}`">{{ notes }}</li>                                                                               
                        </ul>
                    </td>
                    <td class="notesCell" v-if="index === indexToEdit">
                        <div>
                            <div class="tag" @dblclick="selectNote(notes, index)" v-for="(notes, index) in matchup.notes" v-bind:key="`note${index}`">
                                <p>{{ notes }}</p>
                                <button class="tagDelete" @click="removeNote(index)">
                                    <font-awesome-icon :icon="icon.cancel" size="1x" />
                                </button>
                            </div>
                            <input v-model="selectedNote.note" @keyup.enter="addOrEditNotes()"/>
                            <button class="primary" @click="addOrEditNotes()">add</button>
                            <button @click="selectedNote = {note: '', index: -1}">clear</button>                    
                        </div>                                                   
                    </td>

                    <!-- Actions Col -->
                    <td v-if="index !== indexToEdit">
                        <button class="editButton" @click="edit(matchup, index)">
                            <font-awesome-icon :icon="icon.edit" size="1x" />
                        </button>
                        <button class="deleteButton" @click="delete_(index, matchup.champion)">
                            <font-awesome-icon :icon="icon.delete" size="1x" />
                        </button>
                    </td>
                    <td v-if="index === indexToEdit">
                        <button class="saveButton" @click="save(index)">
                            <font-awesome-icon :icon="icon.save" size="1x" />
                        </button>
                        <button class="cancelButton" @click="cancel(index)">
                            <font-awesome-icon :icon="icon.cancel" size="1x" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="add" @click="add()">add matchup</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
//@ts-ignore
import champions from "../assets/champions.json";
import { Matchup } from "../store/types";
import { IMatchupList } from "./types";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Runes from "@/components/RuneSets.vue";

export default Vue.extend({
    name: "matchupList",
    components: { FontAwesomeIcon, Runes },
    props: ["matchups", "runeSets"],
    data() {
        return {
            matchupsState: [],
            indexToEdit: -1,
            dataToEdit: {},
            championToAdd: "",
            selectedDos: {do_: "", index: -1},
            selectedDonts: {dont: "", index: -1},
            selectedNote: {note: "", index: -1},
            showRoleSelection: false,
            champions: [],
            selected: null,
            icon: { cancel: faTimes, save: faSave, edit: faPen, delete: faTrashAlt },
        }
    },
    mounted() {
        //@ts-ignore
        this.matchupsState = [...this.matchups];
        (this.champions as string[]) = Object.keys(champions.data);
    },
    watch: {
        matchups() {
            //@ts-ignore
            this.matchupsState = [...this.matchups];
            (this.champions as string[]) = Object.keys(champions.data);
        }
    },
    methods: {
        toggleRole(role: string): void {
            this.showRoleSelection = !this.showRoleSelection;
            if (!this.showRoleSelection) {
                (this.dataToEdit as Matchup.IMatchupData).role = role;
            }

        },
        selectChampion(option: string): void {
            console.log(option);
            (this.dataToEdit as Matchup.IMatchupData).champion = option;
            this.championToAdd = option;
// option => dataToEdit.champion = option
        },
        selectDo(do_: string, index: number): void {
            this.selectedDos = {do_: do_, index: index};
        },
        selectDont(dont: string, index: number): void {
            this.selectedDonts = {dont: dont, index: index};
        },
        selectNote(note: string, index: number): void {
            this.selectedNote = {note: note, index: index};
        },
        addOrEditDos(index: number): void {
            if (this.selectedDos.index < 0) {
                (this.dataToEdit as IMatchupList).do_s.push(this.selectedDos.do_);
                this.selectedDos = {do_: "", index: -1};
            } else {
                (this.dataToEdit as IMatchupList).do_s[this.selectedDos.index] = this.selectedDos.do_;
                this.selectedDos = {do_: "", index: -1};
            }
        },
        addOrEditDonts(index: number): void {
            if (this.selectedDonts.index < 0) {
                (this.dataToEdit as IMatchupList).don_ts.push(this.selectedDonts.dont);
                this.selectedDonts = {dont: "", index: -1};
            } else {
                (this.dataToEdit as IMatchupList).don_ts[this.selectedDonts.index] = this.selectedDonts.dont;
                this.selectedDonts = {dont: "", index: -1};
            }
        },
        addOrEditNotes(index: number): void {
            if (this.selectedNote.index < 0) {
                (this.dataToEdit as IMatchupList).notes.push(this.selectedNote.note);
                this.selectedNote = {note: "", index: -1};
            } else {
                (this.dataToEdit as IMatchupList).notes[this.selectedNote.index] = this.selectedNote.note;
                this.selectedNote = {note: "", index: -1};
            }
        },
        removeDo(index: number): void {
            (this.dataToEdit as IMatchupList).do_s.splice(index, 1);
        },
        removeDont(index: number): void {
            (this.dataToEdit as IMatchupList).don_ts.splice(index, 1);
        },
        removeNote(index: number): void {
            (this.dataToEdit as IMatchupList).notes.splice(index, 1);
        },
        edit(matchup: IMatchupList, index: number): void {
            this.dataToEdit = Object.assign({}, matchup);
            this.indexToEdit = index;
            this.championToAdd = matchup.champion;
        },
        delete_(index: number, champion: string): void {            
            //@ts-ignore
            this.$buefy.dialog.confirm({
                type: "is-danger",
                message: `<div class="dialogTitle">Are you sure?</div><div class="dialogText">Do you really want to remove ${champion} from the matchup list? <br> This deletion cannot be undone!</div>`,
                hasIcon: true,
                icon: 'exclamation',
                iconPack: 'fa',
                onConfirm: () => {
                    (this.matchupsState as IMatchupList[]).splice(index, 1);
                    this.$store.commit("setMatchupListFromData", this.matchupsState);
                    //@ts-ignore
                    this.$buefy.toast.open({
                        message: `Poof! Your matchup entry has been deleted!`,
                        type: 'is-success',
                        duration: 4000,
                    });
                }
            });
        },
        save(index: number): void {
            (this.matchupsState as IMatchupList[])[index] = this.dataToEdit as IMatchupList;
            this.$store.commit("setMatchupListFromData", this.matchupsState);
            this.indexToEdit = -1;
            this.dataToEdit = '';
            this.championToAdd = '';
            this.selectedDos = {do_: '', index: -1};
            this.selectedDonts = {dont: '', index: -1};
            this.selectedNote = {note: '', index: -1};
            //@ts-ignore
            this.$buefy.toast.open({
                message: `Yaay! Your matchup was successfully saved!`,
                type: 'is-success',
                duration: 4000,
            });
        },
        cancel(index: number): void {
            this.indexToEdit = -1;
            (this.matchupsState as IMatchupList[]) = this.$store.state.Matchup.selectedMatchupData.matchupList;
            this.dataToEdit = '';
            this.championToAdd = '';
            this.selectedDos = {do_: '', index: -1};
            this.selectedDonts = {dont: '', index: -1};
            this.selectedNote = {note: '', index: -1};
        },
        add(): void {
            let newData: IMatchupList = {role: "Top", do_s: [], don_ts: [], notes: [], champion: "", difficulty: "", runen: -1}
            let newLength: number = (this.matchupsState as IMatchupList[]).push(newData);
            this.indexToEdit = newLength - 1;
            this.dataToEdit = newData;
        }
    },
    computed: {
        selectedMatchup(): string {
			return this.$store.state.Matchup.selectedMatchup;
        },
        selectedMatchupData(): Matchup.IMatchupData {
			return this.$store.state.Matchup.selectedMatchupData;
        },
        championData(): Matchup.IChampionData {
            return this.$store.state.Matchup.championData;   
        },
        filteredChampions() {
            //@ts-ignore
            return this.champions.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(this.championToAdd.toLowerCase()) >= 0
            });
        }
    }
});
</script>

<style lang="scss" scoped>
.matchupList {
    table {
        width: 100%;
        border-spacing: 0;
        table-layout: fixed;

        thead {
            height: 52px;
            background: #FCFCFC;
            
            tr {
                height: 52px;

                td {
                    height: 52px;
                    border-top: 1px solid #979797;
                    border-bottom: 1px solid #979797;
                    color: #AAAEB3;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    text-align: center;

                    &.roleCol {
                        width: 58px;
                    }

                    &.championCol {
                        width: 84px;
                    }

                    &.runeCol {
                        width: 197px;
                    }

                    &.actionsCol {
                        width: 88px;
                    }
                }
            }
        }

        tbody {
            tr {
                td {
                    border-bottom: 1px solid #ECEDEF;

                    &.roleCell {
                        background: #1DE9B6;
                        display: table-cell;
                        text-align: center;

                        >img {
                            width: 29px;
                            height: 29px;
                        }
                    }

                    &.championCell {
                        display: table-cell;
                        text-align: center;

                        > img {
                            border-radius: 100px;
                            width: 64px;
                            height: 64px;
                        }
                    }

                    &.runeCell {
                        display: table-cell;
                        text-align: center;
                        padding-right: 20px;
                    }

                    &.dosCell {
                        color: #707070;
                        font-size: 14px;
                        font-weight: 300;
                        padding: 8px 20px 8px 0px;
                        display: table-cell;
                        vertical-align: top;
                        width: 20vw;

                        >ul {   
                            list-style: none;

                            > li {
                                &::before {
                                    content: "-";
                                    margin-right: 10px;
                                }
                            }
                        }
                    }

                    &.dontsCell {
                        color: #707070;
                        font-size: 14px;
                        font-weight: 300;
                        padding: 8px 20px 8px 0px;
                        display: table-cell;
                        vertical-align: top;
                        width: 20vw;

                        >ul {   
                            list-style: none;

                            > li {
                                &::before {
                                    content: "-";
                                    margin-right: 10px;
                                }
                            }
                        }
                    }

                    &.notesCell {
                        color: #707070;
                        font-size: 14px;
                        font-weight: 300;
                        padding: 8px 0px;
                        display: table-cell;
                        vertical-align: top;
                        width: 20vw;

                        >ul {   
                            list-style: none;

                            > li {
                                &::before {
                                    content: "-";
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                }

                .tag {
                    background: #EAEAEA;
                    border-radius: 5px;
                    padding: 3px 0px 3px 20px;
                    cursor: pointer;
                    user-select: none;
                    display: flex;
                    flex-direction: row;
                    height: fit-content;
                    margin-bottom: 5px;

                    &::before {
                        content: none !important;
                    }

                    > .tagDelete {
                        border-radius: 100%;
                        min-width: 16px;
                        max-width: 16px;
                        height: 16px;
                        margin: 0 10px;
                        border: none;
                        outline: none;
                        background: #04A9F5;
                        cursor: pointer;
                        padding: 0 !important;
                        color: white;
                        font-size: 10px;
    
                        &:hover {
                            background: #02557B;
                        }
                    }

                    >p {
                        word-break: break-word;
                        white-space: normal;
                        width: 100%;
                    }
                }

                .editButton {
                    border-radius: 100%;
                    border: none;
                    width: 39px;
                    height: 39px;
                    outline: none;
                    cursor: pointer;
                    background: linear-gradient(90deg, rgba(29,196,233,1) 0%, rgba(29,233,182,1) 100%);
                    color: white;
                }

                .deleteButton {
                    border-radius: 100%;
                    border: none;
                    width: 39px;
                    height: 39px;
                    outline: none;
                    cursor: pointer;
                    background: linear-gradient(90deg, rgba(141,10,2,1) 0%, rgba(244,66,54,1) 100%);
                    color: white;                    
                }

                .saveButton {
                    border-radius: 100%;
                    border: none;
                    width: 39px;
                    height: 39px;
                    outline: none;
                    cursor: pointer;
                    background: linear-gradient(90deg, rgba(29,196,233,1) 0%, rgba(29,233,182,1) 100%);
                    color: white;                    
                }

                .cancelButton {
                    border-radius: 100%;
                    border: none;
                    width: 39px;
                    height: 39px;
                    outline: none;
                    cursor: pointer;
                    background: linear-gradient(90deg, rgba(141,10,2,1) 0%, rgba(244,66,54,1) 100%);
                    color: white;                    
                }
            }
        }
    }
}
</style>