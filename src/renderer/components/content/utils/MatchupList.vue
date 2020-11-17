<template>
    <div class="matchupList">
        <table>
            <thead>
                <tr>
                    <td>
                        Role
                    </td>
                    <td>
                        Champion
                    </td>
                    <td>
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
                    <td>
                        Actions
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(matchup, index) in matchups" v-bind:key="`matchup${matchup.champion}${matchup.role}`">
                    <td class="roleCell"><img src="../../../assets/position/Position_Grandmaster-Top.png" /></td>
                    <td class="championCell"><img :src="`http://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/${matchup.champion}.png`" /></td>
                    <td class="runeCell">
                        <div class="runeCellWrapper">
                            <div class="runeCellKeystone">
                                <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png">               
                            </div>
                            <div class="runeCellRunes">
                                <div class="runeCellMain">
                                    <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png">               
                                    <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png">               
                                    <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png">               
                                </div>
                                <div class="runeCellSecondary">
                                    <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png">               
                                    <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png">               
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="dosCell">
                        <ul>
                            <li v-for="(do_, index) in matchup.do_s" v-bind:key="`do${index}`">{{ do_ }}</li>                                                        
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
                                <button>x</button>
                            </li>                                              
                            <input v-model="selectedDonts.dont" />
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
                        <ul>
                            <li class="tag" @dblclick="selectNote(notes, index)" v-for="(notes, index) in matchup.notes" v-bind:key="`note${index}`">{{ notes }}</li>
                            <input v-model="selectedNote.note"/>                                                                             
                        </ul>
                    </td>

                    <!-- Actions Col -->
                    <td v-if="index !== indexToEdit">
                        <button class="editButton" @click="edit(matchup, index)">edit</button>
                    </td>
                    <td v-if="index === indexToEdit">
                        <button class="saveButton" @click="save(index)">edit</button>
                        <button class="cancelButton" @click="cancel(index)">edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Matchup } from "../../../store/types";
import { IMatchupList } from "../../types";

export default Vue.extend({
	name: "card",
    props: ["matchups"],
    data() {
        return {
            indexToEdit: -1,
            dataToEdit: {},
            selectedNote: {note: "", index: -1},
            selectedDonts: {dont: "", index: -1},
        }
    },
    methods: {
        selectDont(dont: string, index: number): void {
            this.selectedDonts = {dont: dont, index: index};
        },
        selectNote(note: string, index: number): void {
            this.selectedNote = {note: note, index: index};
        },
        edit(matchup: IMatchupList, index: number): void {
            this.dataToEdit = matchup;
            this.indexToEdit = index;
        },
        save(index: number): void {
            
        },
        cancel(index: number): void {
            this.indexToEdit = -1;
            //TODO: reset to old data
        }
    },
    computed: {
        selectedMatchup(): string {
			return this.$store.state.Matchup.selectedMatchup;
        },
        championData(): Matchup.IChampionData {
            return this.$store.state.Matchup.championData;   
        }
    }
});
</script>

<style lang="scss" scoped>
.matchupList {
    table {
        width: 100%;
        border-spacing: 0;

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
                }
            }
        }

        tbody {
            tr {
                td {
                    border-bottom: 1px solid #ECEDEF;

                    &.roleCell {
                        background: #1DE9B6;
                        width: 58px;
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

                        >.runeCellWrapper {
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
                        
                    }

                    &.dosCell {
                        color: #707070;
                        font-size: 14px;
                        font-weight: 300;
                        padding: 8px 20px 8px 0px;
                        display: table-cell;
                        vertical-align: top;

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

                        >ul {   
                            list-style: none;

                            > li {
                                &.tag {
                                    background: black;
                                }

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

                        >ul {   
                            list-style: none;

                            > li {
                                &.tag {
                                    background: black;
                                }

                                &::before {
                                    content: "-";
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                }

                .editButton {
                    border-radius: 100%;
                    width: 39px;
                    height: 39px;
                    outline: none;
                    cursor: pointer;
                }

                .saveButton {
                    border-radius: 100%;
                    width: 39px;
                    height: 39px;
                    outline: none;
                    cursor: pointer;
                }

                .cancelButton {
                    border-radius: 100%;
                    width: 39px;
                    height: 39px;
                    outline: none;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>