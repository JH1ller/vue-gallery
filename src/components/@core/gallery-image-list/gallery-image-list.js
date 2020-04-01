import { __decorate } from "tslib";
import { Component, Vue, Prop } from 'vue-property-decorator';
let GalleryImageList = class GalleryImageList extends Vue {
    constructor() {
        super(...arguments);
        this.showLoader = false;
        this.loadedImages = 0;
    }
    randomCardSize() {
        return Math.random() >= 0.9;
    }
    mounted() {
        this.showLoader = true;
    }
    imageLoaded() {
        console.log(this.loadedImages);
        // ! maybe race condition
        this.loadedImages += 1;
        if (this.loadedImages === this.images.length) {
            this.showLoader = false;
        }
    }
};
__decorate([
    Prop()
], GalleryImageList.prototype, "images", void 0);
GalleryImageList = __decorate([
    Component({
        components: {}
    })
], GalleryImageList);
export default GalleryImageList;
//# sourceMappingURL=gallery-image-list.js.map