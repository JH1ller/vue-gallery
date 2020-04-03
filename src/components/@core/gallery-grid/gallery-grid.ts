import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import { Image, Folder, ItemType, Video, File } from '@/interfaces/index';
import GalleryImage from '@/components/@core/gallery-image/gallery-image.vue';
import GalleryVideo from '@/components/@core/gallery-video/gallery-video.vue';
import GalleryFolder from '@/components/@core/gallery-folder/gallery-folder.vue';


@Component({
    components: {
        GalleryImage,
        GalleryFolder,
        GalleryVideo
    }
})
export default class GalleryGrid extends Vue {

    @Prop() items!: Array<Folder | File>;
    private imageFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    private videoFileTypes = ['.mp4', '.ogg', '.webm'];

    private isDirectory(item: Folder | File) {
        return item.type === ItemType.DIRECTORY;
    }

    private isImage(item: Folder | File) {
        return this.imageFileTypes.includes((item as File).extension);
    }

    private isVideo(item: Folder | File) {
        return this.videoFileTypes.includes((item as File).extension);
    }

}
