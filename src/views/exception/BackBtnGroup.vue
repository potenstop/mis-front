<template>
  <div>
    <Button size="large" type="text" @click="backHome">返回首页</Button>
    <Button size="large" type="text" @click="backPrev"
      >返回上一页({{ second }}s)</Button
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BackBtnGroup extends Vue {
  private name = 'BackBtnGroup'
  private second: number = 5
  private timer: number = 0
  private backHome () {
    this.$router.replace({
      name: this.$config.homeName
    })
  }

  private backPrev () {
    this.$router.go(-1)
  }
  private mounted () {
    this.timer = setInterval(() => {
      if (this.second === 0) {
        this.backPrev()
      } else {
        this.second--
      }
    }, 1000)
  }
  private beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="less">
@import "./error.less";
</style>
