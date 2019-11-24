<template>
  <div>
    <Card :bordered="false">
      <p slot="title" style="font-size: 20px">{{data.title}}</p>
      <RadioGroup size="large" v-if="data.topicType === topicType.TYPE_SIGN_SELECT">
        <Radio
          v-for="option in data.addOptionList"
          :key="option.contentTopicSelectOptionId"
          :label="option.contentTopicSelectOptionId"
          style="margin-left: 10px"
        >
          {{option.optionLabel}}
        </Radio>
      </RadioGroup>
      <CheckboxGroup v-if="data.topicType === topicType.TYPE_MUL_SELECT">
        <Checkbox
          v-for="option in data.addOptionList"
          :key="option.contentTopicSelectOptionId"
          :label="option.contentTopicSelectOptionId"
          style="margin-left: 10px"
        >{{option.optionLabel}}</Checkbox>
      </CheckboxGroup>
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { ItemContentTopic } from '@/components/item/topic/ItemContentTopic'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'

@Component
export default class TopicItem extends Vue {
  private name = 'TopicItem'
  @Prop({ default: () => new ItemContentTopic() }) private readonly data: ItemContentTopic
  private topicType = {
    TYPE_SIGN_SELECT: ContentTopicConstant.TYPE_SIGN_SELECT,
    TYPE_MUL_SELECT: ContentTopicConstant.TYPE_MUL_SELECT,
    TYPE_FILL_BLANK: ContentTopicConstant.TYPE_FILL_BLANK,
    TYPE_SHORT_ANSWER: ContentTopicConstant.TYPE_SHORT_ANSWER
  }
  private created () {
  }
}
</script>

<style scoped>

</style>
