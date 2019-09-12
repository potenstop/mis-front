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
  name = 'BackBtnGroup';

  // data
  second = 5;
  timer = 0;
  backHome () {
    this.$router.replace({
      name: this.$config.homeName
    })
  }

  backPrev () {
    this.$router.go(-1)
  }
  mounted () {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev()
      else this.second--
    }, 1000) as any
  }
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="less">
@import "./error.less";
</style>
