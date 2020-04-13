import Vue from 'vue';
import VueRouter from 'vue-router';
import GalleryView from '@/views/GalleryView/GalleryView.vue';
import { dbResolver } from '@/resolver/index';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		redirect: '/gallery'
	},
	{
		path: '/gallery',
		name: 'gallery',
		component: GalleryView,
		beforeEnter: dbResolver
	},
	{
		path: '/gallery/:folders',
		name: 'folder-detail',
		component: GalleryView,
		beforeEnter: dbResolver
	},
	{
		path: '/gallery/:folders/:file',
		name: 'file-detail',
		component: GalleryView,
		beforeEnter: dbResolver
	}
];

const router = new VueRouter({
	routes
});

export default router;
