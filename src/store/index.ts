import Vue from 'vue';
import Vuex from 'vuex';
import { RESET_STATE, SHOW_TOAST, HIDE_TOAST } from './mutation-types';

export interface AppState {
    ui: {
        toast: {
            show: boolean,
            message: string
        }
    }
}

const getInitialState = (): AppState => {
    return {
        ui: {
            toast: {
                show: false,
                message: ''
            }
        }
    }
}

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
        }
    },
    actions: {
        resetState({ commit }) {
            commit(RESET_STATE);
        },
        hideToast({ commit }) {
            commit(HIDE_TOAST);
        }
    },
    getters: {
    },
    modules: {
    },
});
