import { Component, Vue, Watch, Emit } from 'vue-property-decorator';
import Icon from '@/components/@shared/icon/icon.vue';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

config.autoAddCss = false;
library.add(faArrowLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);

@Component({
	components: {
		Icon
	}
})
export default class ViewTitle extends Vue {
	private folderList: string[] = [];
	private showBackBtn: boolean = false;

	private mounted() {
		if (this.$route.name === 'folder-detail' || this.$route.name === 'file-detail') {
			this.folderList = this.$route.params.folders.split('+');
			this.showBackBtn = true;
		} else {
			this.folderList = [ 'Übersicht' ];
			this.showBackBtn = false;
		}
	}

	private getPrevRoute() {
		if (this.folderList.length > 1) {
			return '/gallery/' + this.$route.params.folders.slice(0, this.$route.params.folders.lastIndexOf('+'));
		} else {
			return '/gallery/';
		}
	}

	private showLink(index: number) {
		return index + 1 !== this.folderList.length;
	}

	private getRoute(index: number) {
		if (this.folderList.length > 1) {
			const folderRoute = this.folderList.slice(0, index + 1);
			let routeString = '/gallery/';
			folderRoute.forEach((folder, index) => {
				if (index > 0) {
					routeString = routeString + '+' + folder;
				} else {
					routeString = routeString + folder;
				}
			});
			return routeString;
		} else {
			return this.$route.path;
		}
	}

	@Watch('$route')
	onRouteChanged(to: any, from: any) {
		if (to.name === 'folder-detail' || this.$route.name === 'file-detail') {
			this.folderList = to.params.folders.split('+');
			this.showBackBtn = true;
		} else if (to.name === 'gallery') {
			this.folderList = [ 'Übersicht' ];
			this.showBackBtn = false;
		}
	}
}
