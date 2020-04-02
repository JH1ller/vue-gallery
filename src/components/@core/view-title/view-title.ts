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
	private title: string = 'Übersicht';
	private showBackBtn: boolean = false;

	private mounted() {
		if (this.$route.name === 'folder-detail') {
			const folderName = this.$route.params.folders.split('+').pop();
			if (folderName) {
				this.title = folderName;
			}
			this.showBackBtn = true;
		} else {
			this.title = 'Übersicht';
			this.showBackBtn = false;
		}
	}

	@Watch('$route')
	onRouteChanged(to: any, from: any) {
		if (to.name === 'folder-detail') {
			const folderName = this.$route.params.folders.split('+').pop();
			if (folderName) {
				this.title = folderName;
			}
			this.showBackBtn = true;
		} else if (to.name === 'gallery') {
			this.title = 'Übersicht';
			this.showBackBtn = false;
		}
	}
}
