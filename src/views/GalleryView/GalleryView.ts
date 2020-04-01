import { Component, Vue, Ref } from 'vue-property-decorator';
import Gallery from '@/components/@core/gallery/gallery.vue';
import ViewTitle from '@/components/@core/view-title/view-title.vue';
@Component({
    name: 'GalleryView',
    components: {
        Gallery,
        ViewTitle
    }
})
export default class GalleryView extends Vue {
    @Ref('gallery') gallery!: any;

}