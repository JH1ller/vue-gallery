import { __decorate } from "tslib";
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
let Lightbox = class Lightbox extends Vue {
    close(event) {
        if (event.target === this.wrapper) {
            this.$router.push({ name: 'folder-detail', params: { foldername: this.$route.params.foldername } });
        }
    }
};
__decorate([
    Prop()
], Lightbox.prototype, "image", void 0);
__decorate([
    Ref('wrapper')
], Lightbox.prototype, "wrapper", void 0);
Lightbox = __decorate([
    Component({
        components: {}
    })
], Lightbox);
export default Lightbox;
//# sourceMappingURL=lightbox.js.map