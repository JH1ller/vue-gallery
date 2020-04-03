import { Component, Vue, Watch, Prop, Emit, Ref } from 'vue-property-decorator';
import { Video, Folder } from '@/interfaces/index';
const path = require('path-browserify');

@Component({
	components: {}
})
export default class GalleryVideo extends Vue {
	@Prop() video!: Video;
	@Ref('player') player!: HTMLVideoElement;

	// TODO
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

	private mounted(): void {
		//this.player.pause();
	}

	private getType(): string {
		return 'video/' + this.video.extension.slice(1);
	}

	private randomCardSize(): boolean {
        return Math.random() >= 0.9;
    }

    private imageLoaded() {
    }
}
