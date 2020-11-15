import Vue from 'vue';
import * as Vuex from 'vuex';
import Matchup from './modules/Matchup';
import { RootState } from './types';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
	getters: {
		getMatchup: state => {
			return state.Matchup.selectedMatchup;
		},
	},
	modules: {
		//@ts-ignore
		Matchup,
	},
	strict: process.env.NODE_ENV !== 'production'
});
