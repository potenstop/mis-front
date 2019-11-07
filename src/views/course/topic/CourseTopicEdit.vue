<template>
  <Card style="width: 100%">
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80" style="margin-left: 20%" label-position="left">
      <FormItem label="标题" prop="title">
        <Input v-model="formItem.title" placeholder="" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="是否展示" prop="state">
        <Select v-model="formItem.state" style="width: 300px">
          <Option :value="1">是</Option>
          <Option :value="2">否</Option>
        </Select>
      </FormItem>
      <FormItem label="类型" prop="topicType">
        <Select v-model="formItem.topicType" style="width: 300px">
          <Option v-for="item in selectTopicTypeList" :value="item.value" :key="item.item">{{item.label}}</Option>
        </Select>
      </FormItem>
      <FormItem label="" v-if="contentTopicTypeConstantSelectList.indexOf(formItem.topicType) !== -1" prop="chooseOption">
        <Input v-model="optionLabel" placeholder="" style="width: 300px"/>
        <Button icon="ios-add" type="dashed" @click="optionAdd" style="margin-left: 10px">添加选项</Button>
        <Tag v-for="item in formItem.chooseOption"
             style="margin-top: 5px"
             :key="item.value"
             size="large"
             closable
             checkable
             :color="item.checked ? 'primary' : 'error'"
             :checked="item.checked"
             :name="item.value"
             @on-close = "optionTagClose"
             @on-change = "optionTagChange"
        >{{item.label}}</Tag>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formItem')" :loading="submitRunning" :disabled="loadingInit">{{$t("P_SAVE")}}</Button>
        <Button @click="back" style="margin-left: 8px">{{$t("P_CANCEL")}}</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApiUtil } from '@/common/util/ApiUtil'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { StoreConstant } from '@/common/constant/StoreConstant'
import { JsonProperty, JsonProtocol, ReturnGenericsProperty, StringUtil } from 'papio-h5'
import { RefreshEvent } from '@/common/event/RefreshEvent'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'
import { ContentTopicAddRequest } from '@/request/ContentTopicAddRequest'
import { ContentTopicApi } from '@/dao/api/ContentTopicApi'
import { ContentTopicUpdateRequest } from '@/request/ContentTopicUpdateRequest'
import { ContentTopicSelectOptionRequest } from '@/request/ContentTopicSelectOptionRequest'

const appModule = namespace(StoreConstant.APP)

const contentTopicApi = new ContentTopicApi()
class UpdateModel {
  @JsonProperty
  public contentId: number
  @JsonProperty
  public title: string
  @JsonProperty
  public state: number
  @JsonProperty
  public topicType: number
  @JsonProperty
  public analysis: string
  @JsonProperty
  public answer: string
  @JsonProperty
  public chooseOption: {label: string, value: number, checked: boolean}[]
  public constructor () {
    this.contentId = null
    this.title = null
    this.state = null
    this.topicType = null
    this.analysis = null
    this.answer = null
    this.chooseOption = []
  }
}

@Component
export default class CourseTopicEdit extends Vue {
  @appModule.Mutation closeTag: Function
  private name = 'CourseTopicEdit'
  private formItem: UpdateModel = new UpdateModel()
  private loadingInit: boolean = true
  private selectTopicTypeList: {value: number, label: string}[] = []
  private contentTopicTypeConstantSelectList: number[] = []
  private ruleValidate = {
    title: [
      { type: 'string', required: true, message: '标题不能为空', trigger: 'blur' },
      { type: 'string', max: 50, message: '课程名称最大不超过50字符', trigger: 'blur' }
    ],
    state: [
      { type: 'integer', required: true, message: '状态不能为空', trigger: 'blur' }
    ],
    topicType: [
      { type: 'integer', required: true, message: '分类不能为空', trigger: 'blur' }
    ],
    chooseOption: [
      { type: 'array', required: true, message: '选项不能为空', trigger: 'blur' }
    ]
  }
  private submitRunning: boolean = false
  private isAddPage = true
  private optionLabel: string = ''
  private optionTagColor: string = ''

  private async created () {
    this.loadingInit = true
    this.initSelectTopicTypeList()
    this.initContentTopicTypeConstantSelectList()
    this.loadingInit = false
  }
  private initSelectTopicTypeList () {
    const t1 = this.$t('CONTENT_TOPIC_TYPE_SIGN_SELECT') as string
    const t2 = this.$t('CONTENT_TOPIC_TYPE_MUL_SELECT') as string
    const t3 = this.$t('CONTENT_TOPIC_TYPE_FILL_BLANK') as string
    const t4 = this.$t('CONTENT_TOPIC_TYPE_SHORT_ANSWER') as string
    this.selectTopicTypeList = [{
      value: ContentTopicConstant.TYPE_SIGN_SELECT,
      label: t1
    }, {
      value: ContentTopicConstant.TYPE_MUL_SELECT,
      label: t2
    }, {
      value: ContentTopicConstant.TYPE_FILL_BLANK,
      label: t3
    }, {
      value: ContentTopicConstant.TYPE_SHORT_ANSWER,
      label: t4
    }]
  }
  private initContentTopicTypeConstantSelectList () {
    this.contentTopicTypeConstantSelectList.push(ContentTopicConstant.TYPE_SIGN_SELECT)
    this.contentTopicTypeConstantSelectList.push(ContentTopicConstant.TYPE_MUL_SELECT)
  }
  private async handleSubmit (name) {
    this.submitRunning = true
    try {
      const form = this.$refs[name] as any
      const valid = await form.validate()
      if (!valid) {
        return
      }
      let result = null
      if (this.isAddPage) {
        const request = new ContentTopicAddRequest()
        JsonProtocol.copyProperties(this.formItem, request)
        const optionList: ContentTopicSelectOptionRequest[] = []
        this.formItem.chooseOption.forEach(option => {
          const contentTopicSelectOptionRequest = new ContentTopicSelectOptionRequest()
          contentTopicSelectOptionRequest.setOptionLabel(option.label)
          contentTopicSelectOptionRequest.setIsOptionAnswer(option.checked ? 1 : 2)
          optionList.push(contentTopicSelectOptionRequest)
        })
        request.setAddOptionList(optionList)
        result = await contentTopicApi.add(request)
      } else {
        const request = new ContentTopicUpdateRequest()
        JsonProtocol.copyProperties(this.formItem, request)
        result = await contentTopicApi.update(request)
      }
      ApiUtil.getData(result)
      RefreshEvent.emit('CourseTopicList')
      this.back()
    } catch (e) {
      this.$Message.error(e.message)
    } finally {
      this.submitRunning = false
    }
  }
  public back () {
    this.closeTag(this.$route)
  }
  private optionAdd () {
    const label = this.optionLabel
    if (StringUtil.isBank(label)) {
      this.$Message.warning('输入不能为空')
      return
    }
    this.formItem.chooseOption.push({
      value: new Date().getTime(),
      label,
      checked: true
    })
    this.optionLabel = ''
    const f = this.$refs.formItem as any
    f.validateField('chooseOption')
  }
  private optionTagClose (event, id) {
    const index = this.getOptionIndexById(id)
    if (index >= 0) {
      this.formItem.chooseOption.splice(index, 1)
    }
  }
  private getOptionIndexById (id) {
    let index = -1
    this.formItem.chooseOption.forEach((option, i) => {
      if (option.value === id) {
        index = i
      }
    })
    return index
  }
  private optionTagChange (checked, id) {
    const index = this.getOptionIndexById(id)
    if (checked && ContentTopicConstant.TYPE_SIGN_SELECT === this.formItem.topicType) {
      // 单选 判断当前选中的数量
      let checkCount = 0
      this.formItem.chooseOption.forEach((option, i) => {
        if (option.checked) {
          checkCount++
        }
      })
      if (checkCount !== 0) {
        this.$Message.warning('单选模式 不能多选')
        if (index >= 0) {
          this.formItem.chooseOption[index].checked = false
          console.log('111', this.formItem.chooseOption[index])
        }
        return
      }
    }
    if (index >= 0) {
      this.formItem.chooseOption[index].checked = checked
    }
  }
}
</script>

<style scoped>

</style>
