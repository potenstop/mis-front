<template>
  <Card style="width: 100%">
    <Button>导入word</Button>
    <Form
      ref="formItem"
      :model="formItem"
      :rules="ruleValidate"
      :label-width="80"
      label-position="left"
      v-if="formItem.length > 0"
    >
        <div v-for="(item,index) in [1,2,3]" :key="item">
          <div style="margin-left: 20%">
            <FormItem label="标题" prop="title">
              <Input v-model.trim="formItem.title" placeholder="" style="width: 300px"></Input>
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
            <FormItem label="选项" v-if="contentTopicTypeConstantSelectList.indexOf(formItem.topicType) !== -1" prop="chooseOption">
              <Input v-model.trim="optionLabel" placeholder="" style="width: 300px"/>
              <Button icon="ios-add" type="dashed" @click="optionAdd" style="margin-left: 10px">添加选项</Button>
              <br/>
              <Tag v-for="item in formItem.chooseOption"
                   style="margin-top: 5px"
                   :key="item.value"
                   size="large"
                   closable
                   checkable
                   :color="item.checked ? 'primary' : 'default'"
                   :checked="item.checked"
                   :name="item.value"
                   @on-close = "optionTagClose"
                   @on-change = "optionTagChange"
              >{{item.label}}</Tag>
            </FormItem>
            <FormItem label="答案" v-if="formItem.topicType > 0 && contentTopicTypeConstantSelectList.indexOf(formItem.topicType) === -1" prop="answer">
              <Input v-model.trim="formItem.answer" maxlength="5000" show-word-limit type="textarea" placeholder="Enter something..." style="width: 300px" />
            </FormItem>
            <FormItem label="解析" prop="analysis">
              <Input v-model.trim="formItem.analysis" maxlength="2000" show-word-limit type="textarea" placeholder="Enter something..." style="width: 300px" />
            </FormItem>
          </div>

          <Divider />

        </div>
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
import { JSHelperUtil, JsonProperty, JsonProtocol, ReturnGenericsProperty, StringUtil } from 'papio-h5'
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
  public chooseOption: {label: string, value: number, checked: boolean, isNew: boolean}[]
  public constructor () {
    this.contentId = null
    this.title = null
    this.state = ContentTopicConstant.STATE_ONLINE
    this.topicType = ContentTopicConstant.TYPE_SIGN_SELECT
    this.analysis = null
    this.answer = null
    this.chooseOption = []
  }
}

@Component
export default class CourseTopicMulAdd extends Vue {
  @appModule.Mutation closeTag: Function
  private name = 'CourseTopicMulAdd'
  private formItem: UpdateModel[] = []
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
    ],
    analysis: [
      { type: 'string', required: true, message: '解析不能为空', trigger: 'blur' }
    ],
    answer: [
      { type: 'string', required: true, message: '答案不能为空', trigger: 'blur' }
    ]
  }
  private submitRunning: boolean = false
  private isAddPage = true
  private optionLabel: string = ''
  private removeOptionIdList: number[] = []

  private async created () {
    if (this.$route.path.indexOf('add') !== -1) {
      this.isAddPage = true
    } else {
      this.isAddPage = false
    }
    this.loadingInit = true
    this.initSelectTopicTypeList()
    this.initContentTopicTypeConstantSelectList()
    await this.initEditData()
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
    this.contentTopicTypeConstantSelectList = [ContentTopicConstant.TYPE_SIGN_SELECT, ContentTopicConstant.TYPE_MUL_SELECT]
  }
  private async initEditData () {
    if (!this.isAddPage) {
      const query = this.$route.query as any
      const result = await contentTopicApi.view(query.id)
      const response = ApiUtil.getData(result)
      this.formItem = []
      const updateModel = new UpdateModel()
      updateModel.title = '111'
      updateModel.topicType = 1
      updateModel.state = 1
      updateModel.chooseOption = []

      // JsonProtocol.copyProperties(response, this.formItem)
      // if (JSHelperUtil.isNotNull(response.getAddOptionList()) && response.getAddOptionList()) {
      //   this.formItem.chooseOption = []
      //   response.getAddOptionList().forEach(item => {
      //     this.formItem.chooseOption.push({
      //       value: item.getContentTopicSelectOptionId(),
      //       label: item.getOptionLabel(),
      //       checked: item.getIsOptionAnswer() === 1,
      //       isNew: false
      //     })
      //   })
      // }
    }
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

        // const request = new ContentTopicAddRequest()
        // JsonProtocol.copyProperties(this.formItem, request)
        // if (ContentTopicConstant.TYPE_SIGN_SELECT === this.formItem.topicType || ContentTopicConstant.TYPE_MUL_SELECT === this.formItem.topicType) {
        //   if (JSHelperUtil.isNullOrUndefined(this.formItem.chooseOption) || this.formItem.chooseOption.length === 0) {
        //     // 没有选项
        //     this.$Message.warning('选择题必须有选项')
        //     return
        //   }
        //   const optionList: ContentTopicSelectOptionRequest[] = []
        //   let hasCheck = false
        //   this.formItem.chooseOption.forEach(option => {
        //     const contentTopicSelectOptionRequest = new ContentTopicSelectOptionRequest()
        //     contentTopicSelectOptionRequest.setOptionLabel(option.label)
        //     contentTopicSelectOptionRequest.setIsOptionAnswer(option.checked ? 1 : 2)
        //     if (option.checked) {
        //       hasCheck = true
        //     }
        //     optionList.push(contentTopicSelectOptionRequest)
        //   })
        //   if (!hasCheck) {
        //     // 没有答案
        //     this.$Message.warning('选择题必须答案')
        //     return
        //   }
        //   request.setAddOptionList(optionList)
        // }
        // result = await contentTopicApi.add(request)

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
  private optionAdd (index: number) {
    const label = this.optionLabel
    if (StringUtil.isBank(label)) {
      this.$Message.warning('输入不能为空')
      return
    }
    this.formItem[index].chooseOption.push({
      value: new Date().getTime(),
      label,
      checked: false,
      isNew: true
    })
    this.optionLabel = ''
    const f = this.$refs.formItem as any
    f.validateField('chooseOption')
  }
  private optionTagClose (event, id) {
    const index = this.getOptionIndexById(id)
    if (index >= 0) {
      // const option = this.formItem.chooseOption.splice(index, 1)
      // if (option.length === 1 && !option[0].isNew) {
      //   this.removeOptionIdList.push(option[0].value)
      // }
    }
  }
  private getOptionIndexById (id) {
    let index = -1
    // this.formItem.chooseOption.forEach((option, i) => {
    //   if (option.value === id) {
    //     index = i
    //   }
    // })
    return index
  }
  private optionTagChange (checked, id) {
    // const index = this.getOptionIndexById(id)
    // if (checked && ContentTopicConstant.TYPE_SIGN_SELECT === this.formItem.topicType) {
    //   // 单选 判断当前选中的数量
    //   let checkCount = 0
    //   this.formItem.chooseOption.forEach((option, i) => {
    //     if (option.checked) {
    //       checkCount++
    //     }
    //   })
    //   if (checkCount !== 0) {
    //     this.$Message.warning('单选模式 不能多选')
    //     if (index >= 0) {
    //       this.formItem.chooseOption[index].checked = false
    //       console.log('111', this.formItem.chooseOption[index])
    //     }
    //     return
    //   }
    // }
    // if (index >= 0) {
    //   this.formItem.chooseOption[index].checked = checked
    // }
  }
}
</script>

<style scoped>

</style>
