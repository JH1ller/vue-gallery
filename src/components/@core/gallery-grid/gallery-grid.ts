import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import { Image, Folder, ItemType } from '@/interfaces/index';
import GalleryImage from '@/components/@core/gallery-image/gallery-image.vue';
import GalleryFolder from '@/components/@core/gallery-folder/gallery-folder.vue';


@Component({
    components: {
        GalleryImage,
        GalleryFolder
    }
})
export default class GalleryGrid extends Vue {

    @Prop() items!: Array<Folder | Image>;

    private isDirectory(item: Folder | Image) {
        return item.type === ItemType.DIRECTORY;
    }

    private mounted() {
        console.log(this.items);
    }

}
