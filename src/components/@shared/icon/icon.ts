import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Icon extends Vue {
  @Prop() public iconName!: string;
}
