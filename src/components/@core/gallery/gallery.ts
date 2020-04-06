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
	private currentLightboxFile: File | null = null;
	private dirTree: any = DirDB;
	private currentFolder: Folder = this.dirTree.default;

	private openFile(file: File) {
		this.currentLightboxFile = file;
		this.showLightbox = true;
	}
	private openFolder(folder: Folder) {
		this.currentFolder = folder;
		this.showLightbox = false;
	}

	private goPrev(currentFile: File) {
		const currentIndex = this.currentFolder.children.findIndex((item) => item.name === currentFile.name);
		let prevItem = this.currentFolder.children[currentIndex - 1];
		if (prevItem) {
			if (prevItem.type === ItemType.FILE) {
				this.$router.replace({ name: 'file-detail', params: { file: prevItem.name } });
			} else {
				this.goPrev((prevItem as unknown) as File);
			}
		} else {
			prevItem = this.currentFolder.children[this.currentFolder.children.length - 1];
			if (prevItem.type === ItemType.FILE) {
				this.$router.replace({ name: 'file-detail', params: { file: prevItem.name } });
			} else {
				this.goPrev((prevItem as unknown) as File);
			}
		}
	}

	private goNext(currentFile: File) {
		const currentIndex = this.currentFolder.children.findIndex((item) => item.name === currentFile.name);
		let nextItem = this.currentFolder.children[currentIndex + 1];
		if (nextItem) {
			if (nextItem.type === ItemType.FILE) {
				this.$router.replace({ name: 'file-detail', params: { file: nextItem.name } });
			} else {
				this.goNext((nextItem as unknown) as File);
			}
		} else {
			nextItem = this.currentFolder.children[0];
			if (nextItem.type === ItemType.FILE) {
				this.$router.replace({ name: 'file-detail', params: { file: nextItem.name } });
			} else {
				this.goNext((nextItem as unknown) as File);
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
		} else if (this.$route.name === 'file-detail') {
			let targetFolder: Folder = this.dirTree.default;
			const folders = this.$route.params.folders.split('+');
			folders.forEach((folder) => {
				targetFolder = targetFolder.children.find((item) => item.name === folder) as Folder;
			});
			this.openFolder(targetFolder);
			const file = this.currentFolder.children.find((item) => item.name === this.$route.params.file) as File;
			if (file) this.openFile(file);
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
		} else if (to.name === 'file-detail') {
			const file = this.currentFolder.children.find((item) => item.name === to.params.file) as File;
			if (file) this.openFile(file);
		} else {
			this.showLightbox = false;
			this.currentFolder = this.dirTree.default;
		}
	}
}
