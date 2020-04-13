import { Route } from 'vue-router';
import store from '@/store/index';

export const dbResolver = async (to: Route, from: Route, next: any) => {
	const res = await store.dispatch('loadDB');
	if (res) next();
};
