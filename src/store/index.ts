import Vue from 'vue';
import Vuex from 'vuex';
import { RESET_STATE, SHOW_TOAST, HIDE_TOAST, SET_DB } from './mutation-types';
import axios from 'axios';

export interface AppState {
	ui: {
		toast: {
			show: boolean;
			message: string;
		};
	};
	db: any;
}

const getInitialState = (): AppState => {
	return {
		ui: {
			toast: {
				show: false,
				message: ''
			}
		},
		db: null
	};
};

Vue.use(Vuex);

export default new Vuex.Store({
	state: getInitialState(),
	mutations: {
		[RESET_STATE](state) {
			Object.assign(state, getInitialState());
		},
		[SHOW_TOAST](state, message: string) {
			state.ui.toast.message = message;
			state.ui.toast.show = true;
		},
		[HIDE_TOAST](state) {
			state.ui.toast.show = false;
		},
		[SET_DB](state, payload) {
			state.db = payload;
		}
	},
	actions: {
		resetState({ commit }) {
			commit(RESET_STATE);
		},
		hideToast({ commit }) {
			commit(HIDE_TOAST);
		},
		async loadDB({ commit }) {
			const data = await axios.get('/media/db.json');
			commit(SET_DB, data.data);
			return true;
		}
	},
	getters: {},
	modules: {}
});
