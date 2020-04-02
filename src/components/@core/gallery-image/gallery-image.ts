import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import { Image, Folder } from '@/interfaces/index';
const path = require('path-browserify');

@Component({
	components: {}
})
export default class GalleryImage extends Vue {
	@Prop() image!: Image;

	private getPath(): string {
		const parsedFile = path.parse(this.image.path);
		return path.join('media', parsedFile.dir, '_thumbs', parsedFile.base);
	}

	private randomCardSize(): boolean {
        return Math.random() >= 0.9;
    }

    private imageLoaded() {
    }
}
