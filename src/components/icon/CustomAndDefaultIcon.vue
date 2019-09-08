<!--CustomAndDefaultIcon组件同时支持iView内置图标类型和自定义图标类型，为了区别这两种类型，需要在自定义图标名称前加下划线"_"-->
<template>
  <component
    :is="iconType"
    :type="iconName"
    :color="iconColor"
    :size="iconSize"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import CustomIcon from '@/components/icon/CustomIcon.vue'

@Component({
  components: {
    CustomIcon
  }
})
export default class CustomAndDefaultIcon extends Vue {
  @Prop({ type: String, required: true }) readonly type!: string;
  @Prop(String) readonly color!: string | undefined;
  @Prop(Number) readonly size!: number | undefined;

  name = 'CustomAndDefaultIcon';

  get iconType () {
    return this.type.indexOf('_') === 0 ? 'CustomIcon' : 'Icon'
  }

  get iconName () {
    return this.iconType === 'CustomIcon'
      ? this.getCustomIconName(this.type)
      : this.type
  }

  get iconSize () {
    return this.size || (this.iconType === 'CustomIcon' ? 12 : undefined)
  }

  get iconColor () {
    return this.color || ''
  }

  public getCustomIconName (iconName) {
    return iconName.slice(1)
  }
}
</script>
