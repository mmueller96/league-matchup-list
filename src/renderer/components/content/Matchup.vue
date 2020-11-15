<template>		
	<div class="matchupWrapper">
		<button @click="exportData()">Export</button>

		<div class="matchup">
			<div class="gridContainerItemProfile">
				<Card :headline="selectedMatchup" :isProfile="true"/>
			</div>
			<div class="gridContainerItemNotes">
				<Card headline="Notes" :isProfile="false"/>
			</div>
			<div class="gridContainerItemRunes">
				<Card headline="Runen" :isProfile="false">
					<!-- https://ddragon.leagueoflegends.com/cdn/10.23.1/data/en_GB/runesReforged.json -->
					<Runes :runeSets="selectedRuneSet" />
					<button class="addItemButton">add rune part</button>
				</Card>
			</div>
			<div class="gridContainerItemSkillOrder">
				<Card headline="Skill Order" :isProfile="false">
					<SkillOrder :skillOrder="selectedSkillOrder.skillOrder" :description="selectedSkillOrder.description" />
				</Card>
			</div>
			<div class="gridContainerItemItems">
				<Card headline="Items" :isProfile="false"/>
			</div>
			<div class="gridContainerItemMatchupList">
				<Card headline="Matchup List" :isProfile="false">
					<MatchupList :matchups="selectedMatchupList" />
					<button class="addItemButton">add matchup</button>
				</Card>
			</div>
			<div class="gridItemLastGames">
				<Card headline="Last Games" :isProfile="false"/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "@/components/content/utils/Card.vue";
import SkillOrder from "@/components/content/utils/SkillOrder.vue";
import MatchupList from "@/components/content/utils/MatchupList.vue";
import Runes from "@/components/content/utils/Runes.vue";
const path = require('path'); 
import { EKeyStones, EPrecisionRunes, EDominationRunes, ERuneTypes, IRuneSet, ISkillOrder, IMatchupList } from "../types";
import { Matchup } from "../../store/types";
const { dialog } = require('electron').remote;
const fs = require('fs');

export default Vue.extend({
	name: "matchup",
	components: { Card, SkillOrder, Runes, MatchupList },
	data() {
		return {};
	},
	mounted() {
		if (!this.selectedMatchup) {
			this.$router.push({name: 'home'});
		}
	},
	methods: {
		exportData(): void {
			dialog.showSaveDialog({
				title: 'Select the File Path to save',
				defaultPath: path.join(__dirname, `../${this.selectedMatchup}.matchup`), 
				buttonLabel: 'Save',
				filters: [ 
            		{ 
                		name: 'Matchup', 
                		extensions: ['matchup'] 
					}, 
				], 
			}, (filename) => {
				fs.writeFileSync(filename, JSON.stringify({}) ,'utf-8');
			})
		}
	},
	computed: {	
		selectedMatchup(): string {
			return this.$store.state.Matchup.selectedMatchup;
		},
		selectedSkillOrder():ISkillOrder {
			return (this.$store.state.Matchup.selectedMatchupData as Matchup.IMatchupData).skillOrder;
		},
		selectedRuneSet(): IRuneSet[] {			
			return (this.$store.state.Matchup.selectedMatchupData as Matchup.IMatchupData).runeSets;
		},
		selectedMatchupList(): IMatchupList[] {			
			return (this.$store.state.Matchup.selectedMatchupData as Matchup.IMatchupData).matchupList;
		},
		runeSet(): IRuneSet[] {
			return [{
				title: "Standard",
				main: ERuneTypes.PRECISION,
				secondary: ERuneTypes.DOMINATION,
				keystone: {slot: 0, rune: EKeyStones.Conqueror} , 
				rune1: {slot: EPrecisionRunes.TriumphSlot, rune: EPrecisionRunes.Triumph}, 
				rune2: {slot: EPrecisionRunes.LegendTenacitySlot, rune: EPrecisionRunes.LegendTenacity}, 
				rune3: {slot: EPrecisionRunes.CoupDeGraceSlot, rune: EPrecisionRunes.CoupDeGrace}, 
				rune4: {slot: EDominationRunes.TasteOfBloodSlot, rune: EDominationRunes.TasteOfBlood}, 
				rune5: {slot: EDominationRunes.RavenousHunterSlot, rune: EDominationRunes.RelentlessHunter}, 
			}]	
		}
	}
});
</script>

<style lang="scss">
.matchupWrapper {
	width: calc(100% - 130px);

	.matchup {
		width: 100%;
		grid-template-columns: auto auto auto;
		grid-template-areas:
		'profile notes notes'
		'runes skillOrder skillOrder'
		'runes items items'
		'matchupList matchupList matchupList'
		'lastGames lastGames lastGames';
		display: inline-grid;
		grid-column-gap: 30px;
		grid-row-gap: 30px;
		padding: 60px 30px 30px 30px;
		overflow: scroll;

		.addItemButton {
			outline: none;
			border: 1px dashed #C6C9CF;
			width: 100%;
			background: none;
			padding: 18px 0;
			cursor: pointer;
			color: #C6C9CF;
			text-transform: uppercase;
			font-family: 'Open Sans', sans-serif;
			font-weight: 600;
			letter-spacing: 2px;
			font-size: 10px;
			margin-top: 20px;
		}
			
		.gridContainerItemProfile {
			grid-area: profile;
		}

		.gridContainerItemNotes{
			grid-area: notes;
		}

		.gridContainerItemRunes {
			grid-area: runes;
		}

		.gridContainerItemSkillOrder {
			grid-area: skillOrder;
		}

		.gridContainerItemItems {
			grid-area: items;
		}

		.gridContainerItemMatchupList {
			grid-area: matchupList;
		}

		.gridItemLastGames {
			grid-area: lastGames;
		}
	}
}
</style>
