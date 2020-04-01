import { Component, Vue, Watch } from 'vue-property-decorator';
import GalleryFolderOverview from '@/components/@core/gallery-folder-overview/gallery-folder-overview.vue';
import GalleryImageList from '@/components/@core/gallery-image-list/gallery-image-list.vue';
import Lightbox from '@/components/@core/lightbox/lightbox.vue';
import { Image, Folder } from '@/interfaces/index';

@Component({
	components: {
		GalleryFolderOverview,
		GalleryImageList,
		Lightbox
	}
})
export default class Gallery extends Vue {
	private images: Image[] = [];
	private folders: Folder[] = [];
	private showFolders: boolean = true;
	private showLightbox: boolean = false;
	private currentLightboxImage: Image | null = null;
	private currentFolderImages: Image[] = [];

	private getFolders() {
		this.images.forEach((image) => {
			const existingFolder = this.folders.find((folder) => folder.name === image.folder);
			if (!existingFolder) {
				this.folders.push({
					name: image.folder,
					count: 1,
					thumb: image.pathResolved
				});
			} else {
				existingFolder.count += 1;
			}
		});
	}

	private openImage(image: Image) {
		this.currentLightboxImage = image;
		this.showLightbox = true;
	}

	private openFolder(folder: Folder) {
		this.currentFolderImages = this.images.filter((image) => {
			return image.folder === folder.name;
		});
		this.showFolders = false;
	}

	private mounted() {
		this.importAll(require.context('../../../../public/media/', true, /\.jpg$/));
		this.getFolders();
		if (this.$route.name === 'folder-detail') {
			const folder = this.folders.find((folder) => folder.name === this.$route.params.foldername);
			if (folder) this.openFolder(folder);
		} else if (this.$route.name === 'image-detail') {
			const image = this.images.find((image) => image.pathOriginal === this.$route.params.image);
			if (image) this.openImage(image);
		} else {
			this.showFolders = true;
		}
	}

	private importAll(context: __WebpackModuleApi.RequireContext) {
		context.keys().forEach((key) =>
			this.images.push({
				pathResolved: context(key),
				pathOriginal: key,
				folder: key.slice(2, key.indexOf('/', 2))
			})
		);
	}

	@Watch('$route')
	onRouteChanged(to: any, from: any) {
		if (to.name === 'folder-detail') {
			this.showLightbox = false;
			if (from.name !== 'image-detail') {
				const folder = this.folders.find((folder) => folder.name === to.params.foldername);
				if (folder) this.openFolder(folder);
			}
		} else if (to.name === 'image-detail') {
			const image = this.images.find((image) => image.pathOriginal === to.params.image);
			if (image) this.openImage(image);
		} else {
			this.showFolders = true;
			this.showLightbox = false;
		}
	}
}
