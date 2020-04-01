import { __decorate } from "tslib";
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import Icon from '@/components/@shared/icon/icon.vue';
let GalleryFolderOverview = class GalleryFolderOverview extends Vue {
    openFolder(folder) {
        return folder;
    }
};
__decorate([
    Prop()
], GalleryFolderOverview.prototype, "folders", void 0);
__decorate([
    Emit('open-folder')
], GalleryFolderOverview.prototype, "openFolder", null);
GalleryFolderOverview = __decorate([
    Component({
        components: {
            Icon
        }
    })
], GalleryFolderOverview);
export default GalleryFolderOverview;
//# sourceMappingURL=gallery-folder-overview.js.map