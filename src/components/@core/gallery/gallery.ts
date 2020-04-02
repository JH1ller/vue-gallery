import { Component, Vue, Watch } from 'vue-property-decorator';
import GalleryGrid from '@/components/@core/gallery-grid/gallery-grid.vue';
import Lightbox from '@/components/@core/lightbox/lightbox.vue';
import { Image, Folder } from '@/interfaces/index';
import * as DirDB from '@/assets/db.json';

@Component({
	components: {
		GalleryGrid,
		Lightbox
	}
})
export default class Gallery extends Vue {
	private showLightbox: boolean = false;
	private currentLightboxImage: Image | null = null;
	private dirTree: any = DirDB;
	private currentFolder: Folder = this.dirTree.default;

	private openImage(image: Image) {
		this.currentLightboxImage = image;
		this.showLightbox = true;
	}
	private openFolder(folder: Folder) {
		this.currentFolder = folder;
		this.showLightbox = false;
	}

	private mounted() {
		if (this.$route.name === 'folder-detail') {
			let targetFolder: Folder = this.dirTree.default;
			const folders = this.$route.params.folders.split('+');
			folders.forEach((folder) => {
				targetFolder = targetFolder.children.find((item) => item.name === folder) as Folder;
			});
			this.openFolder(targetFolder);
		} else if (this.$route.name === 'image-detail') {
			let targetFolder: Folder = this.dirTree.default;
			const folders = this.$route.params.folders.split('+');
			folders.forEach((folder) => {
				targetFolder = targetFolder.children.find((item) => item.name === folder) as Folder;
			});
			this.openFolder(targetFolder);
			const image = this.currentFolder.children.find((item) => item.path === this.$route.params.image) as Image;
			console.log(this.currentFolder);
			if (image) this.openImage(image);
		} else {
			this.showLightbox = false;
			this.currentFolder = this.dirTree.default;
		}
	}

	@Watch('$route')
	onRouteChanged(to: any, from: any) {
		if (to.name === 'folder-detail') {
			let targetFolder: Folder = this.dirTree.default;
			const folders = to.params.folders.split('+');
			folders.forEach((folder: string) => {
				targetFolder = targetFolder.children.find((item) => item.name === folder) as Folder;
			});
			this.openFolder(targetFolder);
		} else if (to.name === 'image-detail') {
			const image = this.currentFolder.children.find((item) => item.path === to.params.image) as Image;
			if (image) this.openImage(image);
		} else {
			this.showLightbox = false;
			this.currentFolder = this.dirTree.default;
		}
	}
}
