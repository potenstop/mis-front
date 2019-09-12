<template>
  <div class="header-bar">
    <side-trigger
      :collapsed="collapsed"
      icon="md-menu"
      @on-change="handleCollpasedChange"
    ></side-trigger>
    <custom-bread-crumb
      show-icon
      style="margin-left: 30px;"
      :list="breadCrumbList"
    ></custom-bread-crumb>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'

import SideTrigger from './SideTrigger.vue'
import CustomBreadCrumb from './CustomBreadCrumb.vue'
import { StoreConstant } from '@/common/constant/StoreConstant'
const appModule = namespace(StoreConstant.APP)

@Component({
  components: {
    SideTrigger,
    CustomBreadCrumb
  }
})
export default class HeaderBar extends Vue {
    @appModule.State breadCrumbList: any[];
    @Prop(Boolean) readonly collapsed!: boolean | undefined;

    name = 'HeaderBar';

    @Emit('on-coll-change')
    handleCollpasedChange (state) {
      return state
    }
}
</script>

<style lang="less">
  .header-bar{
    width: 100%;
    height: 100%;
    position: relative;
    .custom-content-con{
      float: right;
      height: auto;
      padding-right: 20px;
      line-height: 64px;
      & > *{
        float: right;
      }
    }
  }
</style>
