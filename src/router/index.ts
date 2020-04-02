import Vue from 'vue';
import VueRouter from 'vue-router';
import GalleryView from '@/views/GalleryView/GalleryView.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		redirect: '/gallery'
	},
	{
		path: '/gallery',
		name: 'gallery',
		component: GalleryView
	},
	{
		path: '/gallery/:folders',
		name: 'folder-detail',
		component: GalleryView
	},
	{
		path: '/gallery/:folders/:image',
		name: 'image-detail',
		component: GalleryView
	}
];

const router = new VueRouter({
	routes
});

export default router;
