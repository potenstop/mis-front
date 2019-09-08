import CustomAndDefaultIcon from '@/components/icon/CustomAndDefaultIcon.vue';
import { Vue, Component } from 'vue-property-decorator';
import {RouterUtil} from "@/common/util/RouterUtil";

@Component({
  components: {
    CustomAndDefaultIcon
  }
})
export default class Mixin extends Vue {
  public showTitle(item) {
    return RouterUtil.showTitle(item, this);
  }
  public showChildren(item) {
    return (
      item.children &&
      (item.children.length > 1 || (item.meta && item.meta.showAlways))
    );
  }
  public getNameOrHref(item, children0) {
    return item.href
      ? `isTurnByHref_${item.href}`
      : children0
      ? item.children[0].name
      : item.name;
  }
}
