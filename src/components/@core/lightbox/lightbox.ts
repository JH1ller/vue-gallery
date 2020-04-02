import { Component, Vue, Watch, Prop, Ref } from 'vue-property-decorator';
import Icon from '@/components/@shared/icon/icon.vue';
import { Image, Folder } from '@/interfaces/index';
const path = require('path');


@Component({
    components: {
    }
})
export default class Lightbox extends Vue {

    @Prop() image!: Image;
    @Ref('wrapper') wrapper!: HTMLDivElement;  

    private getPath(): string {
		return path.join('media', this.image.path);
	}

    private close(event: MouseEvent) {
        if(event.target === this.wrapper) {
            this.$router.push({ name: 'folder-detail', params: { foldername: this.$route.params.foldername }});
        }
        
    }
}
