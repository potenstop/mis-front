<template>
  <div>
    <Card :bordered="false">
      <auto-katex :data="data.title"></auto-katex>
      <RadioGroup
        style="margin-top: 15px"
        size="large" v-model='signData'
        v-if="data.topicType === topicType.TYPE_SIGN_SELECT"
        @on-change="signDataChanged"
      >
        <Radio
          v-for="option in data.addOptionList"
          :key="option.contentTopicSelectOptionId"
          :label="option.contentTopicSelectOptionId"
          style="margin-left: 10px"
        >
          <auto-katex :data="option.optionLabel" :is-line-feed="false"></auto-katex>
        </Radio>
      </RadioGroup>
      <CheckboxGroup
        v-if="data.topicType === topicType.TYPE_MUL_SELECT"
        v-model='mulData'
        @on-change="mulDataChanged"
      >
        <Checkbox
          v-for="option in data.addOptionList"
          :key="option.contentTopicSelectOptionId"
          :label="option.contentTopicSelectOptionId"
          style="margin-left: 10px"
        >{{option.optionLabel}}</Checkbox>
      </CheckboxGroup>
      <div v-if="data.topicType === topicType.TYPE_FILL_BLANK">
        <Input @on-change="inputDataChanged" placeholder="输入答案" style="width: 300px" v-model="inputData"></Input>
      </div>
      <div v-if="data.topicType === topicType.TYPE_SHORT_ANSWER">
        <Input @on-change="inputDataChanged" maxlength="5000" show-word-limit type="textarea" placeholder="输入答案" style="width: 600px" v-model="inputData"/>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'
import { ItemContentTopic } from '@/components/item/topic/ItemContentTopic'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'
import AutoKatex from '@/components/katex/AutoKatex.vue'

@Component({
  components: {
    AutoKatex
  }
})
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
  private signDataChanged () {
    this.data.chooseValue = this.signData + ''
    this.noticeValue()
  }
  private mulDataChanged () {
    this.data.chooseValue = this.mulData.join(',')
    this.noticeValue()
  }
  private inputDataChanged () {
    this.data.chooseValue = this.inputData
    this.noticeValue()
  }
  private created () {
    if (this.data.chooseValue !== null && this.data.chooseValue !== undefined) {
      if (this.data.topicType === this.topicType.TYPE_SIGN_SELECT) {
        this.signData = +this.data.chooseValue
      } else if (this.data.topicType === this.topicType.TYPE_MUL_SELECT) {
        const split = this.data.chooseValue.split(',')
        const list = []
        split.forEach(item => list.push(+item))
        this.mulData = list
      } else {
        this.inputData = this.data.chooseValue
      }
    }
  }
  private noticeValue () {
    this.$emit('on-choose-value')
  }
}
</script>

<style scoped>

</style>
