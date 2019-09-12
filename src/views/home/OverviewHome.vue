<template>
  <div>
    <Row :gutter="20">
      <i-col
        :xs="12"
        :md="8"
        :lg="4"
        v-for="(data, index) in statisticalIndexCardDataList"
        :key="`statisticalIndexCard-${index}`"
        style="height: 120px;padding-bottom: 10px;"
      >
        <statistical-index-card
          shadow
          :color="data.color"
          :icon="data.icon"
          :icon-size="36"
        >
          <number-change-animation :end="data.count" count-class="count-style" />
          <p>{{ data.title }}</p>
        </statistical-index-card>
      </i-col>
    </Row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StatisticalIndexCard from '@/components/card/StatisticalIndexCard.vue'
import NumberChangeAnimation from '@/components/animation/NumberChangeAnimation.vue'
@Component({
  components: {
    NumberChangeAnimation,
    StatisticalIndexCard
  }
})
export default class OverviewHome extends Vue {
  name = 'OverviewHome'
  statisticalIndexCardDataList = [
    {
      title: '新增用户',
      icon: 'md-person-add',
      count: 803,
      color: '#2d8cf0'
    },
    { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
    {
      title: '新增问答',
      icon: 'md-help-circle',
      count: 142,
      color: '#ff9900'
    },
    { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
    {
      title: '新增互动',
      icon: 'md-chatbubbles',
      count: 12,
      color: '#E46CBB'
    },
    { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
  ];
}
</script>

<style scoped>
  .count-style {
    font-size: 50px;
  }
</style>
