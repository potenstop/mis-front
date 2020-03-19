<template>
  <div id="app">
    <router-view v-on:footer="footer" v-if="isRouterAlive"></router-view>
    <app-footer v-if="footerShow"></app-footer>
  </div>
</template>

<script lang="ts">
import './config/HttpApiConfiguration'
import { Component, Vue, Watch, Provide } from 'vue-property-decorator'
import AppFooter from '@/components/app/AppFooter.vue'

@Component({
  components: {
    AppFooter
  }
})
export default class App extends Vue {
  @Provide('reload') reload = this.reloadF
  private name = 'App'
  private footerShow = true
  private isRouterAlive = true

  private reloadF () {
    this.isRouterAlive = false
    this.$nextTick(() => {
      this.isRouterAlive = true
    })
  }
  private footer (bool) {
    this.footerShow = bool
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
