import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import { Image, Folder, ItemType } from '@/interfaces/index';
const path = require('path-browserify');

@Component({
	components: {}
})
export default class GalleryFolder extends Vue {

    @Prop() folder!: Folder;

    private getThumb(): string {
        let thumbPath: string = require('@/assets/icons/folder-icon.svg');
        if (this.folder.children.length > 0) {
            this.folder.children.some(item => {
                if(item.type === ItemType.FILE) {
                        const parsedFile = path.parse(item.path);
                        thumbPath = path.join('media', parsedFile.dir, '_thumbs', parsedFile.base);
                        console.log(thumbPath);
                        return true;
                }
            })
        }
        return thumbPath;
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
