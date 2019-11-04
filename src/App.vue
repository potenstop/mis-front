<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script lang="ts">
import './config/HttpApiConfiguration'
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
