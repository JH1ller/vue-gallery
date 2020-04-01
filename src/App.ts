import { Component, Vue } from "vue-property-decorator";
import Toast from '@/components/@shared/toast/toast.vue';


@Component({
  components: {
    Toast
  }
})
export default class App extends Vue {

}