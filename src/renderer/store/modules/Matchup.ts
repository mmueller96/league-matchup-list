import axios from 'axios';
import { IMatchupList, IRuneSet } from '../../components/types';
import { Content } from '../../types/editor';
import { FileUtil } from '../../utils/FileUtil';
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
		state.matchupList = state.matchupList.filter((element: Matchup.IMatchupListItem) => {
			return element.id !== payload.id;
		})
	},
	setMatchupList(state: Matchup.State, champions: string[]): void {
		state.matchupList = [];
		for (const [index, champion] of champions.entries()) {
			state.matchupList.push({id: index, name: champion});
		}
	},
	setMatchupData(state: Matchup.State, matchupData: Matchup.IMatchupData): void {
		state.selectedMatchupData = matchupData;
	},
	setMatchupListFromData(state: Matchup.State, matchupList: IMatchupList[]): void {
		//@ts-ignore
		state.selectedMatchupData.matchupList = matchupList;
		//@ts-ignore
		FileUtil.writeFile(state.selectedMatchupData);
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
	},
	setRuneSetsFromData(state: Matchup.State, runeSets: IRuneSet[]): void {
		//@ts-ignore
		state.selectedMatchupData.runeSets = runeSets;
		//@ts-ignore
		FileUtil.writeFile(state.selectedMatchupData);
	},
	setNotesFromData(state: Matchup.State, notes: Content): void {
		//@ts-ignore
		state.selectedMatchupData.notes = notes;
		//@ts-ignore
		FileUtil.writeFile(state.selectedMatchupData);
	},
};

const actions: Matchup.Actions = {
	async pickMatchup({ commit }, champion: Matchup.IMatchupListItem): Promise<void> {
		let responseData = await axios.get(`http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion/${champion.name}.json`)
		console.log(responseData.data);
		commit("selectMatchup", champion.name);
		commit("setChampionData", responseData.data);
	},
	async loadRuneData({ commit }): Promise<void> {
		let responseData = await axios.get(`https://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_GB/runesReforged.json`);
		commit("setRuneData", responseData.data);
	}
};

export default {
	state,
	mutations,
	actions
};
