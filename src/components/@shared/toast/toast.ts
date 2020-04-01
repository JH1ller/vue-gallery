import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import Icon from '@/components/@shared/icon/icon.vue';
import { mapState } from 'vuex';
import { AppState } from '@/store';
@Component({
    components: {
        Icon
    },
    computed: mapState({
        message: (state: any) => state.ui.toast.message,
        show: (state: any) => state.ui.toast.show
    })
})
export default class Toast extends Vue {

    private message!: string;
    private show!: boolean;

    @Watch('show')
    showChangedHandler(to: boolean, from: boolean) {
        if (to === true) {
            setTimeout(() => {
                this.$store.dispatch('hideToast');
            }, 2500);
        }
    }

}
