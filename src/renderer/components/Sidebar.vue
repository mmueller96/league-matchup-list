<template>
	<div class="sidebar">
		<div class="sidebar-items">
			<div>
				<router-link :to="{name: 'home'}">
					<div class="addMatchupButton">
      					<font-awesome-icon :icon="icon.plus" size="1x" />
					</div>
				</router-link>
			</div>

			<div v-for="champion in matchupList" v-bind:key="`champion${champion.id}`" @contextmenu.prevent='openContextMenu($event, champion.name, champion.id)'>
				<img :src="`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${champion.name}.png`" class="championIcon"  @click="changeMatchup(champion)"/>
			</div>
			
			<ContextMenu :display="showContextMenu" ref="menu">
				{{ championForContextMenu }}
				<div class="contextMenuItem" @click="deleteData()">Delete</div>
			</ContextMenu>

			<div class="bottom">
				<router-link :to="{name: 'settings'}">
					<div class="addMatchupButton">
						<font-awesome-icon :icon="icon.settings" size="1x" />
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Matchup } from "../store/types";
import { FileUtil } from "../utils/FileUtil";
import ContextMenu from '@/components/ContextMenu.vue';

export default Vue.extend({
	name: "sidebar",
	data() {
		return {
			showContextMenu: false,
			championForContextMenu: { id: -1, name: "" },
			icon: { plus: faPlus, settings:  faCog }
		};
	},
	components: { FontAwesomeIcon, ContextMenu },
	mounted() {},
	methods: {
		async changeMatchup(champion: Matchup.IMatchupListItem) {
			await this.$store.dispatch("pickMatchup", champion);
			let data: Matchup.IMatchupData = JSON.parse(FileUtil.getSettingsFromMatchupFile(champion.name).toString()) as Matchup.IMatchupData;
			this.$store.commit("setMatchupData", data);
			this.$router.push({name: 'matchup', params: {champion: champion.name}});
		},
		openContextMenu(e: MouseEvent, champion: string, id: number) {
			this.championForContextMenu = { id: id, name: champion };
			//@ts-ignore
        	this.$refs.menu.open(e);
		},
		deleteData() {
			//@ts-ignore
            this.$buefy.dialog.confirm({
                type: "is-danger",
                message: `<div class="dialogTitle">Are you sure?</div><div class="dialogText">Do you really want to remove ${this.championForContextMenu.name} from the matchups? <br> This deletion cannot be undone!</div>`,
                hasIcon: true,
                icon: 'exclamation',
                iconPack: 'fa',
                onConfirm: () => {
                    FileUtil.deleteFile(this.championForContextMenu.name);
					//@ts-ignore
					this.$refs.menu.close();
					this.$store.commit("removeMatchup", this.championForContextMenu);
					this.championForContextMenu = { id: -1, name: "" };
					this.$router.push({ name: 'home' });
                }
            });
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
	position: fixed;
    height: 100vh;

	.sidebar-items {
		height: inherit;
		display: flex;
    	flex-direction: column;

		> div {
			margin-top: 15px;
			width: 39px;
			height: 39px;
		}
		  
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

		.bottom {
			margin-top: auto;
			margin-bottom: 15px;
		}
	}
}

.contextMenuItem{
	&:hover {
        background: #04A9F5;
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
