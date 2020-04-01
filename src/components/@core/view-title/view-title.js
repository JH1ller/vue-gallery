import { __decorate } from "tslib";
import { Component, Vue, Watch } from 'vue-property-decorator';
import Icon from '@/components/@shared/icon/icon.vue';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
config.autoAddCss = false;
library.add(faArrowLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);
let ViewTitle = class ViewTitle extends Vue {
    constructor() {
        super(...arguments);
        this.title = 'Übersicht';
        this.showBackBtn = false;
    }
    mounted() {
        if (this.$route.name === 'folder-detail') {
            this.title = this.$route.params.foldername;
            this.showBackBtn = true;
        }
        else {
            this.title = 'Übersicht';
            this.showBackBtn = false;
        }
    }
    onRouteChanged(to, from) {
        if (to.name === 'folder-detail') {
            this.title = to.params.foldername;
            this.showBackBtn = true;
        }
        else {
            this.title = 'Übersicht';
            this.showBackBtn = false;
        }
    }
};
__decorate([
    Watch('$route')
], ViewTitle.prototype, "onRouteChanged", null);
ViewTitle = __decorate([
    Component({
        components: {
            Icon
        }
    })
], ViewTitle);
export default ViewTitle;
//# sourceMappingURL=view-title.js.map