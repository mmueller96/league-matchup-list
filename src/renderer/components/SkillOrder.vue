<template>
    <div class="skillOrder">
        <table class="skillOrderTable">
            <thead />
            <tbody>
                <tr>
                    <td class="firstCol">
                        <span class="skillType">Passive</span><br />
                        <span class="skillName">{{ championData.data[selectedMatchup].passive.name }}</span>
                    </td>
                    <td class="secondCol">
                        <img :src="`http://ddragon.leagueoflegends.com/cdn/10.23.1/img/passive/${championData.data[selectedMatchup].passive.image.full}`" class="skillImage"/>
                    </td>
                    <td class="level tableColBorderRight">1</td>
                    <td class="level tableColBorderRight">2</td>
                    <td class="level tableColBorderRight">3</td>
                    <td class="level tableColBorderRight">4</td>
                    <td class="level tableColBorderRight">5</td>
                    <td class="level tableColBorderRight">6</td>
                    <td class="level tableColBorderRight">7</td>
                    <td class="level tableColBorderRight">8</td>
                    <td class="level tableColBorderRight">9</td>
                    <td class="level tableColBorderRight">10</td>
                    <td class="level tableColBorderRight">11</td>
                    <td class="level tableColBorderRight">12</td>
                    <td class="level tableColBorderRight">13</td>
                    <td class="level tableColBorderRight">14</td>
                    <td class="level tableColBorderRight">15</td>
                    <td class="level tableColBorderRight">16</td>
                    <td class="level tableColBorderRight">17</td>
                    <td class="level tableColBorderRight">18</td>
                </tr>
                <tr>
                    <td class="firstCol">
                        <span class="skillType">Q</span><br />
                        <span class="skillName">{{ championData.data[selectedMatchup].spells[0].name }}</span>
                    </td>
                    <td class="secondCol">
                        <img :src="`http://ddragon.leagueoflegends.com/cdn/10.23.1/img/spell/${championData.data[selectedMatchup].spells[0].image.full}`" class="skillImage"/>
                    </td>
                    <td class="level tableColBorderRight" v-for="(spell, index) in skillOrderState" v-bind:key="`spellQ${index}`" ref="qSpellRow">
                        <div class="skilled" v-if="spell === 'Q' && !isEdit"/>
                        <div v-else-if="isEdit"><button :class="spell === 'Q' ? 'skilled' : ''" @click="setSkill('Q', index)"></button></div>
                    </td>
                </tr>
                <tr>
                    <td class="firstCol">
                        <span class="skillType">W</span><br />
                        <span class="skillName">{{ championData.data[selectedMatchup].spells[1].name }}</span>
                    </td>
                    <td class="secondCol">
                        <img :src="`http://ddragon.leagueoflegends.com/cdn/10.23.1/img/spell/${championData.data[selectedMatchup].spells[1].image.full}`" class="skillImage"/>
                    </td>
                    <td class="level tableColBorderRight" v-for="(spell, index) in skillOrderState" v-bind:key="`spellW${index}`" ref="wSpellRow">
                        <div class="skilled" v-if="spell === 'W' && !isEdit"/>
                        <div v-else-if="isEdit"><button :class="spell === 'W' ? 'skilled' : ''" @click="setSkill('W', index)"></button></div>
                    </td>
                </tr>
                <tr>
                    <td class="firstCol">
                        <span class="skillType">E</span><br />
                        <span class="skillName">{{ championData.data[selectedMatchup].spells[2].name }}</span>
                    </td>
                    <td class="secondCol">
                        <img :src="`http://ddragon.leagueoflegends.com/cdn/10.23.1/img/spell/${championData.data[selectedMatchup].spells[2].image.full}`" class="skillImage"/>
                    </td>
                    <td class="level tableColBorderRight" v-for="(spell, index) in skillOrderState" v-bind:key="`spellE${index}`" ref="eSpellRow">
                        <div class="skilled" v-if="spell === 'E' && !isEdit"/>
                        <div v-else-if="isEdit"><button :class="spell === 'E' ? 'skilled' : ''" @click="setSkill('E', index)"></button></div>
                    </td>
                </tr>
                <tr>
                    <td class="firstCol">
                        <span class="skillType">R</span><br />
                        <span class="skillName">{{ championData.data[selectedMatchup].spells[3].name }}</span>
                    </td>
                    <td class="secondCol">
                        <img :src="`http://ddragon.leagueoflegends.com/cdn/10.23.1/img/spell/${championData.data[selectedMatchup].spells[3].image.full}`" class="skillImage"/>
                    </td>
                    <td class="level tableColBorderRight" v-for="(spell, index) in skillOrderState" v-bind:key="`spellR${index}`" ref="rSpellRow">
                        <div class="skilled" v-if="spell === 'R' && !isEdit"/>
                        <div v-else-if="isEdit"><button :class="spell === 'R' ? 'skilled' : ''" @click="setSkill('R', index)"></button></div>
                    </td>
                </tr>
            </tbody>
        </table>
        <h3>Description</h3>
        <div>
            {{ description }}
        </div>
        <div>
            <!-- action button section -->
            <div v-if="!isEdit" class="noteActions">
                <button class="actionButton edit" @click="edit()">
                    <font-awesome-icon :icon="icon.edit" size="1x" />
                </button>
            </div>
            <div v-else class="noteActions">
                <button class="actionButton save" @click="save()">
                    <font-awesome-icon :icon="icon.save" size="1x" />
                </button>
                <button class="actionButton cancel" @click="cancel()">
                    <font-awesome-icon :icon="icon.cancel" size="1x" />
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Matchup } from "../store/types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    name: "skillOrder",
    components: { FontAwesomeIcon },
    props: ["skillOrder", "description"],
    data() {
        return {
            skillOrderState: [],
            isEdit: false,
            latestSpellSet: {},
            icon: { cancel: faTimes, save: faSave, edit: faPen },
        }
    },
    mounted() {
        this.skillOrderState = [...this.skillOrder];
    },
    watch: {
        skillOrder(newSkillOrder: string[]): void {
            (this.skillOrderState as string[]) = newSkillOrder;
        }
    },
    methods: {
        checkSkill(spell: string, index: number) {
            switch (spell) {
                case "Q":
                    (this.$refs.qSpellRow[index] as Element).children[0].children[0].classList.add('skilled');
                    this.skillOrderState[index] = "Q";
                    break;

                case "W":
                    (this.$refs.wSpellRow[index] as Element).children[0].children[0].classList.add('skilled');
                    this.skillOrderState[index] = "W";
                    break;

                case "E":
                    (this.$refs.eSpellRow[index] as Element).children[0].children[0].classList.add('skilled');
                    this.skillOrderState[index] = "E";
                    break;

                case "R":
                    (this.$refs.rSpellRow[index] as Element).children[0].children[0].classList.add('skilled');
                    this.skillOrderState[index] = "R";
                    break;

                default:
                    break;
            }
        },
        uncheckSkill(spell: string, index: number) {
            if (spell === "Q") (this.$refs.qSpellRow[index] as Element).children[0].children[0].classList.remove('skilled');
            else if (spell === "W") (this.$refs.wSpellRow[index] as Element).children[0].children[0].classList.remove('skilled');
            else if (spell === "E") (this.$refs.eSpellRow[index] as Element).children[0].children[0].classList.remove('skilled');
            else if (spell === "R") (this.$refs.rSpellRow[index] as Element).children[0].children[0].classList.remove('skilled');
            
        },
        setSkill(spell: string, index: number): void {
            //check and uncheck for the current selected level
            console.log(spell);
            
            if (spell === "Q") {
                this.checkSkill("Q", index);
                this.uncheckSkill("W", index);
                this.uncheckSkill("E", index);
                this.uncheckSkill("R", index);
            } else if (spell === "W") {
                this.checkSkill("W", index);
                this.uncheckSkill("Q", index);
                this.uncheckSkill("E", index);
                this.uncheckSkill("R", index);
            } else if (spell === "E") {
                this.checkSkill("E", index);
                this.uncheckSkill("Q", index);
                this.uncheckSkill("W", index);
                this.uncheckSkill("R", index);
            } else if (spell === "R") {
                this.checkSkill("R", index);
                this.uncheckSkill("Q", index);
                this.uncheckSkill("W", index);
                this.uncheckSkill("E", index);
            }            
        },
        save(): void {
            console.log(this.skillOrderState);
            
            this.$store.commit("setSkillOrderFromData", { skillOrder: this.skillOrderState });
            this.isEdit = false;
            //@ts-ignore
            this.$buefy.toast.open({
                message: `Yaay! Your skills set was successfully saved!`,
                type: "is-success",
                duration: 4000
            });
        },
        edit(): void {
            this.isEdit = true;
        },
        cancel(): void {
            this.skillOrderState = [...this.skillOrder];
            this.isEdit = false;
        },
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
.skillOrder {
    background: white;
    color: #393C40;

    .skillOrderTable {
        margin: 0;
        width: 100%;
        border-spacing: 0px;

        tbody {
            tr {
                height: 47px;
                
                td {
                    min-width: 20px;

                    &.firstCol {
                        max-width: 35px;
                    }

                    &.secondCol {
                        max-width: 0px;
                    }

                    .skillType {
                        font-family: 'Open Sans', sans-serif;
                        font-size: 10px;
                        font-weight: 600;
                        letter-spacing: 3px;
                    }

                    .skillName {
                        font-family: 'Open Sans', sans-serif;
                        font-size: 12px;
                        font-weight: 300;
                    }

                    .skillImage {
                        width: 32px;
                        height: 32px;
                    }

                    .skilled {
                        width: 12px;
                        height: 12px;
                        background-color: #1DE9B6;
                        border-radius: 100px;
                        margin: 0 auto;
                    }

                    &.level {
                        font-family: 'Open Sans', sans-serif;
                        font-size: 12px;
                        font-weight: 600;
                        text-align: center;
                        vertical-align: center;
                        width: 20px;

                        button:disabled {
                            background: black;
                        }
                    }

                    &.tableColBorderRight {
                        border-right: 1px solid #ECEDEF;

                        &:last-child {
                            border-right: none;
                        }
                    }
                }
            }
        }
    }

    .noteActions {
        margin-top: 5px;
    }

    .cardProfile{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>