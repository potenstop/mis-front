<template>
  <a
    @click="handleChange"
    type="text"
    :class="['side-trigger-a', collapsed ? 'collapsed' : '']"
  >
    <Icon :type="icon" :size="size" />
  </a>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class SideTrigger extends Vue {
    @Prop({ default: 'navicon-round' }) readonly icon!: string;
    @Prop(Boolean) readonly collapsed!: boolean | undefined;
    @Prop({ default: 26 }) readonly size!: number;

    name = 'SideTrigger';

    @Emit('on-change')
    handleChange () {
      return !this.collapsed
    }
}
</script>

<style lang="less">
  .trans{
    transition: transform .2s ease;
  }
  @size: 40px;
  .side-trigger-a{
    padding: 6px;
    width: @size;
    height: @size;
    display: inline-block;
    text-align: center;
    color: #5c6b77;
    margin-top: 12px;
    i{
      .trans;
      vertical-align: top;
    }
    &.collapsed i{
      transform: rotateZ(90deg);
      .trans;
    }
  }
</style>
