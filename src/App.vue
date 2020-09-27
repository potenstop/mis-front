<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script lang="ts">
import '@/config/HttpApiConfiguration'
import { Component, Vue, Watch, Provide } from 'vue-property-decorator'
@Component
export default class App extends Vue {
  @Provide('reload') reload = this.reloadF
  private name = 'App'
  private isRouterAlive = true

  private reloadF () {
    this.isRouterAlive = false
    this.$nextTick(() => {
      this.isRouterAlive = true
    })
  }
  private async mounted () {
    let _this = this
    window.onbeforeunload = function (e) {
      if (_this.$route.name === 'CourseTopicEdit') {
        e = e || window.event
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '关闭提示1111'
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示222'
      } else {
        window.onbeforeunload = null
      }
    }
  }
}
</script>

<style lang="less">
  .size {
    width: 100%;
    height: 100%;
  }
  html,
  body {
    .size;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  #app {
    .size;
  }
</style>
