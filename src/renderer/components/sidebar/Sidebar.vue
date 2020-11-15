<template>
	<div class="sidebar">
		<div class="sidebar-items">
			<div>
				<router-link :to="{name: 'home'}">
					<div class="addMatchupButton">
      					<font-awesome-icon :icon="plus" size="1x" />
					</div>
				</router-link>
			</div>

			<div v-for="champion in matchupList" v-bind:key="`champion${champion.id}`">
				<router-link :to="{name: 'matchup', params: { champion: champion.name } }">
					<img :src="`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${champion.name}.png`" class="championIcon"  @click="changeMatchup(champion)"/>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Matchup } from "../../store/types";
import { FileUtil } from "../../utils/FileUtil";

export default Vue.extend({
	name: "sidebar",
	data() {
		return {
			plus: faPlus,
		};
	},
	components: { FontAwesomeIcon },
	mounted() {},
	methods: {
		async changeMatchup(champion: Matchup.IMatchupListItem) {
			await this.$store.dispatch("pickMatchup", champion);
			let data: Matchup.IMatchupData = JSON.parse(FileUtil.getSettingsFromMatchupFile(champion.name).toString()) as Matchup.IMatchupData;
			this.$store.commit("setMatchupData", data);
		}
	},
	computed: {
		matchupList(): string {
			return this.$store.state.Matchup.matchupList;
		},
	}
});
</script>

<style lang="scss">
$textColor: #828290;
$inputColor: #201f24;
$primaryColor: #f51d45;

.sidebar {
	width: 70px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;

	.sidebar-items {
    	width: 39px;
    	height: 39px;
    	border-radius: 100px;
   		outline: none;
    	border: none;
    	cursor: pointer;
		background: #ecedef;
  		border-radius: 100px;
  		outline: none;
 		border: none;
		cursor: pointer;
		  
		.addMatchupButton {
		    width: 39px;
    		height: 39px;
    		border-radius: 100px;
    		outline: none;
    		border: none;
   			cursor: pointer;
			background: #ecedef;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.championIcon {
  			width: 39px;
  			height: 39px;
  			border-radius: 100px;
  			outline: none;
  			border: none;
 			cursor: pointer;
		}
	}
}

a.router-link-exact-active.router-link-active li {
	background: $primaryColor !important;
	color: white;

	div {
		color: white;
	}

	.fas {
		color: white;
	}

	.fab {
		color: white;
	}
}

a {
	text-decoration: none;
}
</style>
