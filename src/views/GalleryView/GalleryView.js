import { __decorate } from "tslib";
import { Component, Vue, Ref } from 'vue-property-decorator';
import Gallery from '@/components/@core/gallery/gallery.vue';
import ViewTitle from '@/components/@core/view-title/view-title.vue';
let GalleryView = class GalleryView extends Vue {
};
__decorate([
    Ref('gallery')
], GalleryView.prototype, "gallery", void 0);
GalleryView = __decorate([
    Component({
        name: 'GalleryView',
        components: {
            Gallery,
            ViewTitle
        }
    })
], GalleryView);
export default GalleryView;
//# sourceMappingURL=GalleryView.js.map