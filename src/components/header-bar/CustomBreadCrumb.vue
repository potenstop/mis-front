<template>
  <div class="custom-bread-crumb">
    <Breadcrumb :style="{ fontSize: `${fontSize}px` }">
      <BreadcrumbItem
        v-for="item in list"
        :to="item.to"
        :key="`bread-crumb-${item.name}`"
      >
        <custom-and-default-icon style="margin-right: 4px;" :type="item.icon || ''" />
        {{ showTitle(item) }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import { RouterUtil } from '@/common/util/RouterUtil'
import CustomAndDefaultIcon from '@/components/icon/CustomAndDefaultIcon.vue'

@Component({
  components: {
    CustomAndDefaultIcon
  }
})
export default class CustomBreadCrumb extends Vue {
    @Prop({ default: () => [] }) readonly list!: any[];
    @Prop({ default: 14 }) readonly fontSize!: number;
    @Prop({ default: false }) readonly showIcon!: boolean;

    name = 'CustomBreadCrumb';

    showTitle (item) {
      return RouterUtil.showTitle(item, this)
    }
    isCustomIcon (iconName) {
      return iconName.indexOf('_') === 0
    }
    getCustomIconName (iconName) {
      return iconName.slice(1)
    }
}
</script>

<style lang="less">
  .custom-bread-crumb{
    display: inline-block;
    vertical-align: top;
  }
</style>
