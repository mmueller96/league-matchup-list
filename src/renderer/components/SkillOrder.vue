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
                    <td class="level tableColBorderRight" v-for="(spell, index) in skillOrder" v-bind:key="`spellQ${index}`">
                        <div class="skilled" v-if="spell === 'Q'"/>
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
                    <td class="level tableColBorderRight" v-for="(spell, index) in skillOrder" v-bind:key="`spellW${index}`">
                        <div class="skilled" v-if="spell === 'W'"/>
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
                    <td class="level tableColBorderRight" v-for="(spell, index) in skillOrder" v-bind:key="`spellE${index}`">
                        <div class="skilled" v-if="spell === 'E'"/>
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
                    <td class="level tableColBorderRight" v-for="(spell, index) in skillOrder" v-bind:key="`spellR${index}`">
                        <div class="skilled" v-if="spell === 'R'"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <h3>Description</h3>
        <div>
            {{ description }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Matchup } from "../store/types";

export default Vue.extend({
	name: "skillOrder",
    props: ["skillOrder", "description"],
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
                    }

                    &.tableColBorderRight {
                        border-right: 1px solid #ECEDEF;
                    }
                }
            }
        }
    }

    .cardProfile{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>