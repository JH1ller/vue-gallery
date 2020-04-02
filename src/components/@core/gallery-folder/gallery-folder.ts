import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import { Image, Folder, ItemType } from '@/interfaces/index';
const path = require('path-browserify');

@Component({
	components: {}
})
export default class GalleryFolder extends Vue {

    @Prop() folder!: Folder;
    private hasThumb: boolean = false;

    private getThumb(): string {
        let thumbPath: string = require('@/assets/icons/folder-icon.svg');
        if (this.folder.children.length > 0) {
            this.folder.children.some(item => {
                if(item.type === ItemType.FILE) {
                        const parsedFile = path.parse(item.path);
                        thumbPath = path.join('media', parsedFile.dir, '_thumbs', parsedFile.base);
                        this.hasThumb = true;
                        return true;
                }
            })
        }
        return thumbPath;
    }

    private mounted() {
        this.hasThumb = false;
    }

    @Watch('$route')
    private onRouteChanged(from: any, to: any) {
        this.hasThumb = false;
    }
    
    private getCount(): number {
        return this.folder.children.length;
    }

    private getFolderString(): string {
        return this.$route.params.folders 
        ? this.$route.params.folders + '+' + this.folder.name
        : this.folder.name;
    }
}
