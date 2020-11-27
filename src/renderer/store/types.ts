import { ActionContext } from 'vuex';
import { IMatchupList, IRuneSet, ISkillOrder } from '../components/types';

export namespace Matchup {
	export interface State {
		matchupList: IMatchupListItem[];
		selectedMatchup: string | undefined;
		selectedMatchupData: IMatchupData | undefined,
		championData: IChampionData | undefined;
		runeData: any;
	}

	export interface Mutations {
		addMatchup: (state: Matchup.State,  payload: IMatchupListItem) => void;
		removeMatchup: (state: Matchup.State, payload: IMatchupListItem) => void;
		setMatchupList: (state: Matchup.State, champions: string[]) => void;
		setMatchupData: (state: Matchup.State, matchupData: Matchup.IMatchupData) => void;
		setMatchupListFromData: (state: Matchup.State, matchupList: IMatchupList[]) => void;
		selectMatchup: (state: Matchup.State, champion: string) => void;
		setChampionData: (state: Matchup.State, payload: IChampionData) => void;
		setRuneData: (state: Matchup.State, runeData: any) => void;
		addMatchupListItemToMatchupData: (state: Matchup.State, matchup: IMatchupList) => void;
		setRuneSetsFromData: (state: Matchup.State, runeSets: IRuneSet[]) => void;
	}

	export interface Actions {
		pickMatchup: (context: ActionContext<Matchup.State, Matchup.State>, champion: IMatchupListItem) => void;
		loadRuneData: (context: ActionContext<Matchup.State, Matchup.State>) => void
	}

	export interface IMatchupListItem {
		id: number;
		name: string;
	}

	export interface IChampionData {
		type: string;
		format: string;
		version: string;
		data: any;
	}

	export interface IMatchupData {
		champion: string;
		role: string;
		notes: string;
		items: string;
		runeSets: IRuneSet[];
		skillOrder: ISkillOrder;
		matchupList: IMatchupList[];
	}
}

export interface ResponseContent {
	data?: string | string[];
	status?: number;
	message?: string;
	token?: string;
}

export interface RootState {
	Matchup: Matchup.State;
}
