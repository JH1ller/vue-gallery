import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import Icon from '@/components/@shared/icon/icon.vue';
import { Image, Folder } from '@/interfaces/index';


@Component({
    components: {
    }
})
export default class GalleryImageList extends Vue {

    @Prop() images!: Image[];
    private showLoader: boolean = false;
    private loadedImages: number = 0;

    private randomCardSize(): boolean {
        return Math.random() >= 0.9;
    }

    private mounted() {
        this.showLoader = true;
    }

    private imageLoaded() {
        console.log(this.loadedImages);

        // ! maybe race condition
        this.loadedImages += 1;

        if(this.loadedImages === this.images.length) {
            this.showLoader = false;
        }
    }
    
}
