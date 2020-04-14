import { Component, Vue, Watch, Prop, Ref, Emit } from 'vue-property-decorator';
import Icon from '@/components/@shared/icon/icon.vue';
import { Image, Folder, File } from '@/interfaces/index';
const path = require('path');
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

config.autoAddCss = false;
library.add(faChevronLeft, faChevronRight, faRedo);
Vue.component('font-awesome-icon', FontAwesomeIcon);


@Component({
    components: {
    }
})
export default class Lightbox extends Vue {

    @Prop() file!: File;
    @Ref('wrapper') wrapper!: HTMLDivElement;  
    @Ref('image_wrapper') imageWrapper!: HTMLImageElement; 
    private imageFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    private videoFileTypes = ['.mp4', '.ogg', '.webm'];
    private diaInterval: any = null;
    private isFullScreen: boolean = false;
    private diaDelay: number = 5000;
    private rotation: number = 0;
    private transitionEnabled: boolean = true;
    private loaded: boolean = false;

    private getPath(): string {
		return path.join('media', this.file.path);
    }

    // TODO: works but there should be a cleaner way.
    private rotateRight(): void {
        //this.rotation = this.rotation === 270 ? 0 : this.rotation + 90;
        this.rotation += 90;
    }

    private getMaxWidth() {
        if (this.isFullScreen) {
            return '100vw';
        } else {
            return this.isRotatedToPortrait() ? '80vh' : '80vw';
        }
    }

    private getMaxHeight() {
        if (this.isFullScreen) {
            return '100vw';
        } else {
            return !this.isRotatedToPortrait() ? '80vh' : '80vw';
        }
    }

    private isRotatedToPortrait() {
        return !((this.rotation / 90) % 2 === 0);
    }

    private imgLoaded() {
        this.loaded = true;
    }

    // TODO: refactor and put in utility or File class
    private isImage(item: File) {
        return this.imageFileTypes.includes(item.extension);
    }

    private isVideo(item: File) {
        return this.videoFileTypes.includes(item.extension);
    }

    private mounted() {
        document.addEventListener('fullscreenchange', (e) => {
            if(!document.fullscreenElement) {
                this.isFullScreen = false;
                clearInterval(this.diaInterval);
            }
        })
        window.addEventListener("keydown", (e) => {
           if(e.keyCode === 39) {
                this.goNext(this.file);
           } else if(e.keyCode === 37) {
               this.goPrev(this.file);
           } else if(e.keyCode === 32) {
               this.toggleDiashow();
           } else if(e.keyCode === 27) {
            this.$router.push({ name: 'folder-detail', params: { foldername: this.$route.params.foldername }});
           }
        });
    }

    private toggleDiashow() {
        if(this.isFullScreen) {
            document.exitFullscreen();
            this.isFullScreen = false;
            clearInterval(this.diaInterval);
            this.transitionEnabled = true;
        } else {
            if(document.fullscreenEnabled) {
                this.transitionEnabled = false;
                this.rotation = 0;
                document.body.requestFullscreen();
                this.isFullScreen = true;
                clearInterval(this.diaInterval);
                this.diaInterval = setInterval(() => {
                    this.goNext(this.file)
                }, this.diaDelay);
            }
        }
    }
    
    @Emit('go-prev')
    private goPrev(file: File): void {
    } 

    @Emit('go-next')
    private goNext(file: File): void {
    }

    private close(event: MouseEvent) {
        if(event.target === this.wrapper) {
            this.$router.push({ name: 'folder-detail', params: { foldername: this.$route.params.foldername }});
        }
    }

    @Watch('file')
    private fileChanged() {
        this.rotation = 0;
        this.loaded = false;
    }

}
