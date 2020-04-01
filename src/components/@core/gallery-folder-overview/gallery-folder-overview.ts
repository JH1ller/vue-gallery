import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import Icon from '@/components/@shared/icon/icon.vue';
import { Image, Folder } from '@/interfaces/index';


@Component({
    components: {
        Icon
    }
})
export default class GalleryFolderOverview extends Vue {

    @Prop() folders!: Folder[];

    @Emit('open-folder')
    private openFolder(folder: Folder) {
        return folder;
    }
}
