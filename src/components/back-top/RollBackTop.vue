<template>
  <div :class="classes" :style="styles" @click="back">
    <slot>
      <div :class="innerClasses">
        <i class="ivu-icon ivu-icon-ios-arrow-up"></i>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ScrollUtil } from '@/common/util/ScrollUtil'
import { EventUtil } from '@/common/util/EventUtil'

const prefixCls = 'ivu-back-top'

@Component
export default class ABackTop extends Vue {
    @Prop({ default: 400 }) readonly height!: number; // 距离container元素的距离, 用于触发显示条件
    @Prop({ default: 30 }) readonly bottom!: number; // 距离container底部的距离, 定位
    @Prop({ default: 30 }) readonly right!: number; // 距离container 右侧的距离, 定位
    @Prop({ default: 1000 }) readonly duration!: number; // 动画时长
    @Prop({ default: '' }) readonly container!: string; // 滚动元素

    @Emit('on-click')
    onClickHandler () {}
    // 是否显示
    backTop = false;

    mounted () {
      EventUtil.on(this.containerEle, 'scroll', this.handleScroll)
      EventUtil.on(this.containerEle, 'resize', this.handleScroll)
    }

    beforeDestroy () {
      EventUtil.off(this.containerEle, 'scroll', this.handleScroll)
      EventUtil.off(this.containerEle, 'resize', this.handleScroll)
    }

    handleScroll () {
      this.backTop = (this.containerEle as HTMLElement)!.scrollTop >= this.height
    }

    back () {
      let target = document.documentElement || document.body
      if (this.containerEle && typeof this.container === 'string') {
        target = this.containerEle as HTMLElement
      }
      const sTop = (target as HTMLElement).scrollTop
      ScrollUtil.scrollTop(this.containerEle, sTop, 0, this.duration)
      this.onClickHandler()
    }

    get classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-show`]: this.backTop
        }
      ]
    }
    get styles (): { bottom: string; right: string } {
      return {
        bottom: `${this.bottom}px`,
        right: `${this.right}px`
      }
    }
    get innerClasses (): string {
      return `${prefixCls}-inner`
    }

    get containerEle (): Element | null | Window {
      return document.querySelector(this.container as string)
    }
}
</script>
