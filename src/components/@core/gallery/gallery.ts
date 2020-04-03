import { Component, Vue, Watch } from 'vue-property-decorator';
import GalleryGrid from '@/components/@core/gallery-grid/gallery-grid.vue';
import Lightbox from '@/components/@core/lightbox/lightbox.vue';
import { Image, Folder, ItemType, Video, File } from '@/interfaces/index';
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

	private goPrev(currentImage: Image) {
		const currentIndex = this.currentFolder.children.findIndex((item) => item.path === currentImage.path);
		let prevItem = this.currentFolder.children[currentIndex - 1];
		if (prevItem) {
			if (prevItem.type === ItemType.FILE) {
				this.$router.replace({ name: 'image-detail', params: { image: prevItem.path } });
			} else {
				this.goPrev((prevItem as unknown) as Image);
			}
		} else {
			prevItem = this.currentFolder.children[this.currentFolder.children.length - 1];
			if (prevItem.type === ItemType.FILE) {
				this.$router.replace({ name: 'image-detail', params: { image: prevItem.path } });
			} else {
				this.goPrev((prevItem as unknown) as Image);
			}
		}
	}

	private goNext(currentImage: Image) {
		const currentIndex = this.currentFolder.children.findIndex((item) => item.path === currentImage.path);
		let nextItem = this.currentFolder.children[currentIndex + 1];
		if (nextItem) {
			if (nextItem.type === ItemType.FILE) {
				this.$router.replace({ name: 'image-detail', params: { image: nextItem.path } });
			} else {
				this.goNext((nextItem as unknown) as Image);
			}
		} else {
			nextItem = this.currentFolder.children[0];
			if (nextItem.type === ItemType.FILE) {
				this.$router.replace({ name: 'image-detail', params: { image: nextItem.path } });
			} else {
				this.goNext((nextItem as unknown) as Image);
			}
		}
	}

	// TODO: refactor
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
