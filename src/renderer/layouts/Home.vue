<template>
	<div class="home">
		<div class="wrapper">
			<div class="addChampion">
      			<font-awesome-icon class="icon addChampionIcon" :icon="icon.plus" size="1x" />
				<p>Add Champion</p>
				<b-autocomplete :data="filteredChampions" v-model="championToAdd" @select="selectChampion">
					<template slot="empty">No results found.</template>
				</b-autocomplete>
				<button @click="addData()">Add Champion</button>
			</div>
			<div class="importChampion">
				<font-awesome-icon class="icon importChampionIcon" :icon="icon.import" size="1x" />
				<p>Import Champion</p>
				<button @click="importData()">Import Champion</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import champions from "../assets/champions.json";
import { Matchup } from "../store/types";
import { FileUtil } from "../utils/FileUtil";
const { dialog } = require('electron').remote;
const path = require('path'); 
import * as fs from "fs";

export default Vue.extend({
	name: "home",
	components: { FontAwesomeIcon },
	data() {
		return { 
			champions: [],
            championToAdd: "",
			icon: { plus: faPlus, import: faFileDownload }
		};
	},
	async mounted() {
		(this.champions as string[]) = Object.keys(champions.data);
	},
	methods: {
		selectChampion(option: string): void {},
		async addData(): Promise<void> {
			let emptyData: Matchup.IMatchupData = {
				champion: this.championToAdd,
  				notes: {type: "doc", content: [{type: "paragraph"}]},
  				items: "",
				runeSets: [],
  				skillOrder: {
    				description: "",
    				skillOrder: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
				},
				matchupList: []
			};
			
			if (this.championToAdd) {
				let checkEntry: boolean = false;
				console.log(this.getMatchups);
				
				for (const matchup of this.getMatchups) {
					if (this.championToAdd === matchup.name) {
						checkEntry = true;
					}
				}

				if (!checkEntry) {
					FileUtil.writeFile(emptyData);
					let newMatchupListEntry: Matchup.IMatchupListItem = {id: this.getMatchups.length, name: this.championToAdd};
					
					this.$store.commit("addMatchup", newMatchupListEntry);
					await this.$store.dispatch("pickMatchup", newMatchupListEntry);
					let data: Matchup.IMatchupData = JSON.parse(FileUtil.getSettingsFromMatchupFile(newMatchupListEntry.name).toString()) as Matchup.IMatchupData;
					this.$store.commit("setMatchupData", data);
					//@ts-ignore
					this.$buefy.toast.open({
                		message: `You successfully created a matchup page for <b>${this.championToAdd}</b>!`,
                		type: 'is-success',
                		duration: 4000,
					});
					this.championToAdd = "";
					this.$router.push({name: 'matchup', params: {champion: newMatchupListEntry.name}});
				} else {
		            //@ts-ignore
					this.$buefy.toast.open({
                		message: `You already created a matchup page for <b>${this.championToAdd}</b>!`,
                		type: 'is-danger',
                		duration: 4000,
            		});
				}
			}
		},
		async importData(): Promise<void> {
			dialog.showOpenDialog({
				title: 'Select the File Path to open',
				defaultPath: path.join(__dirname, `../`), 
				buttonLabel: 'Open',
				properties: ['openFile'],
				filters: [ 
            		{ 
                		name: 'Matchup', 
                		extensions: ['matchup'] 
					}, 
				], 
			}, async (filepath) => {
				let data: Matchup.IMatchupData = JSON.parse(fs.readFileSync(filepath[0]).toString()) as Matchup.IMatchupData;
				FileUtil.writeFile(data);
				this.$store.commit("addMatchup", { id: this.getMatchups.length, name: data.champion });
				await this.$store.dispatch("pickMatchup", data.champion);
				this.$store.commit("setMatchupData", data);
				this.$router.push({name: 'matchup', params: { champion: data.champion }});
			})
		}
	},
	computed: {        
		filteredChampions() {
            //@ts-ignore
            return this.champions.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(this.championToAdd.toLowerCase()) >= 0
            });
		},
		getMatchups(): Matchup.IMatchupListItem[] {
			return this.$store.state.Matchup.matchupList;
		}
	}
});
</script>

<style lang="scss">
	.home {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;

		>.wrapper {
			position: relative;

			.icon {
				color: white;

				path {
					stroke: white;
					stroke-width: 20px;
					fill: transparent;
				}
			}

			p {
				color: white;
				font-weight: 600;
				letter-spacing: 3px;
				margin: 30px 0;
			}

			>.addChampion {
				position: absolute;
				left: -350px;
				top: -200px;
				z-index: 2;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 400px;
				height: 400px;
				border-radius: 100%;
				background: linear-gradient(90deg, rgba(29,196,233,1) 0%, rgba(29,233,182,1) 100%);

				>p {
					font-size: 18px;
				}

				button {
					width: calc(100% - 212px);
					height: calc(50px);
					background: none;
					border: 2px solid white;
					color: white;
					text-transform: uppercase;
					font-weight: 600;
					letter-spacing: 3px;
					font-size: 10px;
				}

				.addChampionIcon {
					font-size: 80px;
				}

				.autocomplete {
					position: relative;
					padding: 0 44px;
					width: calc(100% - 88px);
					height: 50px;
					margin-bottom: 15px;

					&.control {}

					>.control{
						&.is-clearfix {}

						>input.input{
							height: calc(50px - 20px);
							border: 2px solid white;
							background: none;
							text-transform: uppercase;
							text-align: center;
							color: white;
							font-weight: 600;
							letter-spacing: 3px;
							font-size: 10px;
						}
					}

					>.dropdown-menu {
						position: absolute;
						width: calc(100% - 108px);
						margin: 0 10px;

						>.dropdown-content {
							display: flex;
							flex-direction: column;
							background: white;
							width: 100%;
							font-weight: 600;
							letter-spacing: 3px;
							text-transform: uppercase;
							font-size: 12px;

							>.dropdown-item {
								width: 100%;
								display: flex;
								justify-content: center;
								cursor: pointer;

								&.is-hovered {
									background: #04A9F5;
								}

								&:hover {
									background: #04A9F5;
								}
							}
						}
					}
				}
			}

			>.importChampion {
				position: absolute;
				left: -10px;
				top: -10px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 250px;
				height: 250px;
				border-radius: 100%;
				background: linear-gradient(90deg, #A389D4 0%, #899ED4 100%);

				>.importChampionIcon {
					font-size: 27px;
				}

				>p {
					font-size: 11px;
				}

				>button {
					width: calc(100% - 80px);
					height: calc(50px);
					background: none;
					border: 2px dashed white;
					color: white;
					text-transform: uppercase;
					font-weight: 600;
					letter-spacing: 3px;
					font-size: 10px;
				}
			}
		}
	}
</style>