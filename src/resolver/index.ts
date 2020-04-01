import { Route } from 'vue-router';
import store from '@/store/index';

export const basicResolver = async (to: Route, from: Route, next: any) => {
    /* const res = await store.dispatch('loadZones');
    if (res) next(); */
    next();
}
    