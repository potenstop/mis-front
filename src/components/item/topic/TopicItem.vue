<template>
  <div>
    <div>111</div>
    <div>
      <RadioGroup>
        <Radio label="male">Male</Radio>
        <Radio label="female">Female</Radio>
      </RadioGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { ItemContentTopic } from '@/components/item/topic/ItemContentTopic'

@Component
export default class TopicItem extends Vue {
  private name = 'TopicItem'
  @Prop({ default: () => new ItemContentTopic() }) private readonly data: ItemContentTopic
  private created () {
    console.log(this.data)
  }
}
</script>

<style scoped>

</style>
