import { Component, Vue } from 'vue-property-decorator';
import Toast from '@/components/@shared/toast/toast.vue';
import Navbar from '@/components/@core/navbar/navbar.vue';

@Component({
	components: {
		Toast,
		Navbar
	}
})
export default class App extends Vue {}
