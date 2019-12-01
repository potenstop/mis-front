<template>
  <div>
    <Card :bordered="false">
      <p slot="title" style="font-size: 20px">{{data.title}}</p>
      <RadioGroup size="large" v-if="data.topicType === topicType.TYPE_SIGN_SELECT">
        <Radio
          v-model='signData'
          v-for="option in data.addOptionList"
          :key="option.contentTopicSelectOptionId"
          :label="option.contentTopicSelectOptionId"
          style="margin-left: 10px"
        >
          {{option.optionLabel}}
        </Radio>
      </RadioGroup>
      <CheckboxGroup v-if="data.topicType === topicType.TYPE_MUL_SELECT" v-model='mulData'>
        <Checkbox
          v-for="option in data.addOptionList"
          :key="option.contentTopicSelectOptionId"
          :label="option.contentTopicSelectOptionId"
          style="margin-left: 10px"
        >{{option.optionLabel}}</Checkbox>
      </CheckboxGroup>
      <div v-if="data.topicType === topicType.TYPE_FILL_BLANK">
        <Input placeholder="输入答案" style="width: 300px" v-model="inputData"></Input>
      </div>
      <div v-if="data.topicType === topicType.TYPE_SHORT_ANSWER">
        <Input maxlength="5000" show-word-limit type="textarea" placeholder="输入答案" style="width: 600px" v-model="inputData"/>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { ItemContentTopic } from '@/components/item/topic/ItemContentTopic'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'

@Component
export default class TopicItem extends Vue {
  private name = 'TopicItem'
  @Prop({ default: () => new ItemContentTopic() }) private readonly data: ItemContentTopic
  private signData: number = null
  private mulData: number[] = []
  private inputData: string = null
  private topicType = {
    TYPE_SIGN_SELECT: ContentTopicConstant.TYPE_SIGN_SELECT,
    TYPE_MUL_SELECT: ContentTopicConstant.TYPE_MUL_SELECT,
    TYPE_FILL_BLANK: ContentTopicConstant.TYPE_FILL_BLANK,
    TYPE_SHORT_ANSWER: ContentTopicConstant.TYPE_SHORT_ANSWER
  }
  @Watch('signData')
  private signDataChanged () {
    this.data.chooseValue = this.signData + ''
  }
  @Watch('mulData')
  private mulDataChanged () {
    this.data.chooseValue = this.mulData.join(',')
  }
  @Watch('inputData')
  private inputDataChanged () {
    this.data.chooseValue = this.inputData
  }
  private created () {
  }
}
</script>

<style scoped>

</style>
