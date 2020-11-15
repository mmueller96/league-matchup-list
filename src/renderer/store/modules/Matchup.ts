import axios from 'axios';
import { IMatchupList } from '../../components/types';
import { Matchup } from '../types';

const state: Matchup.State = {
	matchupList: [],
	championData: undefined,
	selectedMatchup: undefined,
	selectedMatchupData: undefined,
	runeData: undefined,
};

const mutations: Matchup.Mutations = {
	addMatchup(state: Matchup.State, payload: Matchup.IMatchupListItem): void {
		state.matchupList.push({id: payload.id, name: payload.name});
	},
	removeMatchup(state: Matchup.State, payload: Matchup.IMatchupListItem): void {
		state.matchupList.filter((element: Matchup.IMatchupListItem) => {
			return element.id !== payload.id;
		})
	},
	setMatchupList(state: Matchup.State, champions: string[]): void {
		for (const [index, champion] of champions.entries()) {
			state.matchupList.push({id: index, name: champion});
		}
	},
	setMatchupData(state: Matchup.State, matchupData: Matchup.IMatchupData): void {
		state.selectedMatchupData = matchupData;
	},
	selectMatchup(state: Matchup.State, champion: string): void {
		state.selectedMatchup = champion;
	},
	setChampionData(state:Matchup.State, payload: Matchup.IChampionData): void {
		state.championData = payload;
	},
	setRuneData(state: Matchup.State, runeData: any): void {
		state.runeData = runeData;
	},
	addMatchupListItemToMatchupData(state: Matchup.State, matchup: IMatchupList): void {
		//@ts-ignore
		state.selectedMatchupData.matchupList.push(matchup);
	}
};

const actions: Matchup.Actions = {
	async pickMatchup({ commit }, champion: Matchup.IMatchupListItem): Promise<void> {
		let responseData = await axios.get(`http://ddragon.leagueoflegends.com/cdn/10.23.1/data/en_US/champion/${champion.name}.json`)
		console.log(responseData.data);
		commit("selectMatchup", champion.name);
		commit("setChampionData", responseData.data);
	},
	async loadRuneData({ commit }): Promise<void> {
		let responseData = await axios.get(`https://ddragon.leagueoflegends.com/cdn/10.23.1/data/en_GB/runesReforged.json`);
		commit("setRuneData", responseData.data);
	}
};

export default {
	state,
	mutations,
	actions
};
