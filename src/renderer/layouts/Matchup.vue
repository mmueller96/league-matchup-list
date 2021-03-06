<template>		
	<div class="matchupWrapper">
		<button @click="exportData()">Export</button>

		<div class="matchup">
			<div class="gridContainerItemProfile">
				<Card :headline="selectedMatchup" :isProfile="true"/>
			</div>
			<div class="gridContainerItemNotes">
				<Card headline="Notes" :isProfile="false" :isNote="true">
					<Note :note="selectedMatchupNote" />
				</Card>
			</div>
			<div class="gridContainerItemRunes">
				<Card headline="Runen" :isProfile="false">
					<!-- https://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_GB/runesReforged.json -->
					<Runes :runeSets="selectedRuneSet" />
				</Card>
			</div>
			<div class="gridContainerItemSkillOrder">
				<Card headline="Skill Order" :isProfile="false">
					<SkillOrder :skillOrder="selectedSkillOrder.skillOrder" :description="selectedSkillOrder.description" />
				</Card>
			</div>
			<div class="gridContainerItemItems">
				<Card headline="Items" :isProfile="false">
					<Items :itemSets="selectedItemSet" />
				</Card>
			</div>
			<div class="gridContainerItemMatchupList">
				<Card headline="Matchup List" :isProfile="false">
					<MatchupList :matchups="selectedMatchupList" :runeSets="selectedRuneSet" />
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
import Card from "@/components/Card.vue";
import SkillOrder from "@/components/SkillOrder.vue";
import MatchupList from "@/components/MatchupList.vue";
import Runes from "@/components/RuneSets.vue";
import Items from "@/components/ItemSets.vue";
import Note from "@/components/Note.vue";
const path = require('path'); 
import { IRuneSet, ISkillOrder, IMatchupList, IItemSet } from "../components/types";
import { Matchup } from "../store/types";
import { Content } from "../types/editor";
const { dialog } = require('electron').remote;
const fs = require('fs');

export default Vue.extend({
	name: "matchup",
	components: { Card, SkillOrder, Runes, MatchupList, Note, Items },
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
				fs.writeFileSync(filename, JSON.stringify(this.$store.state.Matchup.selectedMatchupData) ,'utf-8');
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
		selectedMatchupNote(): Content {
			return (this.$store.state.Matchup.selectedMatchupData as Matchup.IMatchupData).notes;
		},
		selectedItemSet(): IItemSet[] {
			return (this.$store.state.Matchup.selectedMatchupData as Matchup.IMatchupData).items;
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
		'matchupList matchupList matchupList'
		'runes skillOrder skillOrder'
		'runes items items'
		'lastGames lastGames lastGames';
		display: inline-grid;
		grid-column-gap: 30px;
		grid-row-gap: 30px;
		padding: 60px 30px 30px 30px;
		overflow: scroll;
			
		.gridContainerItemProfile {
			grid-area: profile;
		}

		.gridContainerItemNotes{
			grid-area: notes;
		}

		.gridContainerItemRunes {
			grid-area: runes;
			min-width: 411.219px;
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
