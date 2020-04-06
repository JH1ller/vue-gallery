import { Component, Vue, Watch, Prop, Emit, Ref } from 'vue-property-decorator';
import { Video, Folder } from '@/interfaces/index';
const path = require('path-browserify');
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

config.autoAddCss = false;
library.add(faPlay);
Vue.component('font-awesome-icon', FontAwesomeIcon);

@Component({
	components: {}
})
export default class GalleryVideo extends Vue {
	@Prop() video!: Video;
	@Ref('player') player!: HTMLVideoElement;

	private getPath(): string {
		const parsedFile = path.parse(this.video.path);
		return path.join('media', parsedFile.dir, parsedFile.base);
	}

	private onMouseOver() {
		this.player.play();
	}
	private onMouseLeave() {
		this.player.pause();
		this.player.currentTime = 0;
	}

	private getType(): string {
		return 'video/' + this.video.extension.slice(1);
	}

	private randomCardSize(): boolean {
        return Math.random() >= 0.9;
    }

}
