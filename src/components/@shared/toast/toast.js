import { __decorate } from "tslib";
import { Component, Vue, Watch } from 'vue-property-decorator';
import Icon from '@/components/@shared/icon/icon.vue';
import { mapState } from 'vuex';
let Toast = class Toast extends Vue {
    showChangedHandler(to, from) {
        if (to === true) {
            setTimeout(() => {
                this.$store.dispatch('hideToast');
            }, 2500);
        }
    }
};
__decorate([
    Watch('show')
], Toast.prototype, "showChangedHandler", null);
Toast = __decorate([
    Component({
        components: {
            Icon
        },
        computed: mapState({
            message: (state) => state.ui.toast.message,
            show: (state) => state.ui.toast.show
        })
    })
], Toast);
export default Toast;
//# sourceMappingURL=toast.js.map