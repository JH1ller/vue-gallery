import { Component, Vue, Watch, Emit } from 'vue-property-decorator';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

config.autoAddCss = false;
library.add(faBars);
Vue.component('font-awesome-icon', FontAwesomeIcon);

@Component({
	components: {}
})
export default class Navbar extends Vue {
	private menuOpen: boolean = false;

	private toggleMenu() {
		this.menuOpen = !this.menuOpen;
	}
}
