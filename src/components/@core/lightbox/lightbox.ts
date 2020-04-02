import { Component, Vue, Watch, Prop, Ref, Emit } from 'vue-property-decorator';
import Icon from '@/components/@shared/icon/icon.vue';
import { Image, Folder } from '@/interfaces/index';
const path = require('path');
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

config.autoAddCss = false;
library.add(faChevronLeft, faChevronRight);
Vue.component('font-awesome-icon', FontAwesomeIcon);


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
    
    @Emit('go-prev')
    private goPrev(image: Image): void {
    } 

    @Emit('go-next')
    private goNext(image: Image): void {
    }

    private close(event: MouseEvent) {
        if(event.target === this.wrapper) {
            this.$router.push({ name: 'folder-detail', params: { foldername: this.$route.params.foldername }});
        }
        
    }
}
