<template>
  <Card style="width: 100%">
    <Upload
      :action="fileApiAddress"
      :show-upload-list="true"
      :format="['doc']"
      :max-size="1024*20"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :before-upload="handleUploadBefore"
      type="drag"
      :data="fileData"
    >
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>上传word</p>
      </div>
    </Upload>
    <div v-if="Array.isArray(this.formItem) && this.formItem.length > 0">
      <Form
        :ref="'formItem' + index"
        :model="item"
        :rules="ruleValidate"
        :label-width="80"
        label-position="left"
        v-for="(item, index) in this.formItem"
        :key="index"
        style="padding-left: 20%"
      >
        <Card style="width: 800px; margin-top: 20px">
          <p slot="title">
            题号: {{index + 1}}
          </p>
          <Button slot="extra" type="warning" @click="deleteFormItem(index)">删除</Button>
          <FormItem label="标题" prop="title">
            <Input v-model.trim="item.title" maxlength="5000" show-word-limit type="textarea" placeholder="输入标题" style="width: 600px" :autosize="{ minRows: 3, maxRows: 10 }"/>
            <auto-katex :data="item.title"></auto-katex>
          </FormItem>
          <FormItem label="标题附件">
            <Button icon="ios-add" type="dashed" @click="addTitleMarkdown(item)" style="margin-left: 10px" v-if="!item.showTitleMarkdown">{{$t("ADD_MARKDOWN")}}</Button>
            <Button icon="ios-add" type="dashed" @click="addTitleMarkdown(item)" style="margin-left: 10px" v-if="item.showTitleMarkdown">{{$t("CANCEL_MARKDOWN")}}</Button>
            <simple-markdown style="margin-top: 10px" v-if="item.showTitleMarkdown" :value.sync="item.titleAnnexContent"></simple-markdown >
          </FormItem>
          <FormItem label="是否展示" prop="state">
            <Select v-model="item.state" style="width: 300px">
              <Option :value="1">是</Option>
              <Option :value="2">否</Option>
            </Select>
          </FormItem>
          <FormItem label="类型" prop="topicType">
            <Select v-model="item.topicType" style="width: 300px">
              <Option v-for="itemType in selectTopicTypeList" :value="itemType.value" :key="itemType.value">{{itemType.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="分数" prop="gradeAmount">
            <Input v-model.trim="item.gradeAmount" placeholder="" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="选项" v-if="contentTopicTypeConstantSelectList.indexOf(item.topicType) !== -1" prop="chooseOption">
            <Input v-model.trim="item.optionLabel" placeholder="" style="width: 300px"/>
            <Button icon="ios-add" type="dashed" @click="optionAdd(index)" style="margin-left: 10px">添加选项</Button>
            <br/>
            <Tag v-for="itemOption in item.chooseOption"
                 style="margin-top: 5px"
                 :key="itemOption.value"
                 size="large"
                 closable
                 checkable
                 :color="itemOption.checked ? 'primary' : 'default'"
                 :checked="itemOption.checked"
                 :name="itemOption.value"
                 @on-close = "optionTagClose"
                 @on-change = "optionTagChange"
            >{{itemOption.label}}</Tag>
          </FormItem>
          <FormItem label="答案" v-if="item.topicType > 0 && contentTopicTypeConstantSelectList.indexOf(item.topicType) === -1" prop="answer">
            <Input v-model.trim="item.answer" maxlength="5000" show-word-limit type="textarea" placeholder="Enter something..." style="width: 300px" />
            <auto-katex :data="item.answer"></auto-katex>
          </FormItem>
          <FormItem label="答案附件">
            <Button icon="ios-add" type="dashed" @click="addAnsweMarkdown(item)" style="margin-left: 10px" v-if="!item.showAnswerMarkdown">{{$t("ADD_MARKDOWN")}}</Button>
            <Button icon="ios-add" type="dashed" @click="addAnsweMarkdown(item)" style="margin-left: 10px" v-if="item.showAnswerMarkdown">{{$t("CANCEL_MARKDOWN")}}</Button>
            <simple-markdown style="margin-top: 10px" v-if="item.showAnswerMarkdown" :value.sync="item.answerAnnexContent"></simple-markdown >
          </FormItem>
          <FormItem label="解析" prop="analysis">
            <Input v-model.trim="item.analysis" maxlength="2000" show-word-limit type="textarea" placeholder="Enter something..." style="width: 300px" />
            <auto-katex :data="item.analysis"></auto-katex>
          </FormItem>
          <Divider />
        </Card>
      </Form>
      <div style="padding-left: 40%">
        <Button type="primary" @click="handleSubmit('formItem')" :loading="submitRunning" :disabled="loadingInit">{{$t("P_SAVE")}}</Button>
        <Button @click="back" style="margin-left: 8px">{{$t("P_CANCEL")}}</Button>
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApiUtil } from '@/common/util/ApiUtil'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { StoreConstant } from '@/common/constant/StoreConstant'
import {
  JSHelperUtil,
  JsonProperty,
  JsonProtocol,
  Beans,
  ReturnGenericsProperty,
  StringUtil,
  AxiosDataSource
} from 'papio-h5'
import { RefreshEvent } from '@/common/event/RefreshEvent'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'
import { ContentTopicAddRequest } from '@/request/ContentTopicAddRequest'
import { CourseApi } from '@/dao/api/CourseApi'
import { ContentTopicSelectOptionRequest } from '@/request/ContentTopicSelectOptionRequest'
import { UploadTopicListItemResponse } from '@/response/UploadTopicListItemResponse'
import { ApiResult } from '@/bmo/ApiResult'
import { ContentTopicMulAddRequest } from '@/request/ContentTopicMulAddRequest'
import { ForeignApi } from '@/dao/api/ForeignApi'
import moment from 'moment'
import { EncryptUtil } from '@/common/util/EncryptUtil'
import { CmsApi } from '@/dao/api/CmsApi'
import AutoKatex from '@/components/katex/AutoKatex.vue'
import { LocalForageUtil } from '@/common/util/LocalForageUtil'
import { CollectionUtils } from 'papio-h5/lib/util/CollectionUtils'
import ProjectConfig from '@/config/ProjectConfig'
import SimpleMarkdown from '@/components/editor/SimpleMarkdown.vue'

const appModule = namespace(StoreConstant.APP)

const courseApi = new CourseApi()
const foreignApi = new ForeignApi()
const cmsApi = new CmsApi()
class Option {
  @JsonProperty
  public label: string
  @JsonProperty
  public value: number
  @JsonProperty
  public checked: boolean
  @JsonProperty
  public isNew: boolean
}
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
  public optionLabel: string
  @JsonProperty
  public gradeAmount: number
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, { new(): object }>().set('Array', Option))
  public chooseOption: Option[]
  @JsonProperty
  public titleAnnexContent: string
  @JsonProperty
  public answerAnnexContent: string
  public showTitleMarkdown = false
  public showAnswerMarkdown = false
  public constructor () {
    this.contentId = null
    this.title = null
    this.state = ContentTopicConstant.STATE_ONLINE
    this.topicType = ContentTopicConstant.TYPE_SIGN_SELECT
    this.analysis = null
    this.answer = null
    this.chooseOption = []
    this.optionLabel = null
    this.gradeAmount = 1
    this.titleAnnexContent = null
    this.answerAnnexContent = null
  }
}

@Component({
  components: {
    AutoKatex,
    SimpleMarkdown
  }
})
export default class CourseTopicMulAdd extends Vue {
  @appModule.Mutation closeTag: Function
  private fileApiAddress: string;
  private name = 'CourseTopicMulAdd'
  private formItem: UpdateModel[] = []
  private loadingInit: boolean = true
  private selectTopicTypeList: {value: number, label: string}[] = []
  private contentTopicTypeConstantSelectList: number[] = []
  private ruleValidate = {
    title: [
      { type: 'string', required: true, message: '标题不能为空', trigger: 'blur' },
      { type: 'string', max: 2000, message: '课程名称最大不超过50字符', trigger: 'blur' }
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
    ],
    answer: [
    ],
    gradeAmount: [
      { required: true, message: '分数不能为空' }
    ]
  }
  private submitRunning: boolean = false
  private isAddPage = true
  private removeOptionIdList: number[] = []
  private optionValue: number = 1000
  private fileData = {
    token: '',
    key: ''
  }
  private loadCacheFormItemKey = 'CourseTopicMulAddKey'

  private async created () {
    this.fileApiAddress = ProjectConfig.qiniuUpload
    if (this.$route.path.indexOf('add') !== -1) {
      this.isAddPage = true
    } else {
      this.isAddPage = false
    }
    this.loadingInit = true
    this.initSelectTopicTypeList()
    this.initContentTopicTypeConstantSelectList()
    this.loadingInit = false
    this.loadCacheFormItem()
    this.startTimeSaveCache()
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
  private async handleSubmit () {
    this.submitRunning = true
    try {
      const contentTopicAddRequestList: ContentTopicAddRequest[] = []
      let i = 0
      for (;i <= this.formItem.length - 1; i++) {
        const form = this.$refs['formItem' + i][0] as any
        const valid = await form.validate()
        if (!valid) {
          return
        }
        const item = this.formItem[i]
        const contentTopicAddRequest = new ContentTopicAddRequest()
        JsonProtocol.copyProperties(item, contentTopicAddRequest)
        if (ContentTopicConstant.TYPE_SIGN_SELECT === item.topicType || ContentTopicConstant.TYPE_MUL_SELECT === item.topicType) {
          if (JSHelperUtil.isNullOrUndefined(item.chooseOption) || item.chooseOption.length === 0) {
            // 没有选项
            this.$Message.warning('选择题必须有选项')
            return
          }
          const optionList: ContentTopicSelectOptionRequest[] = []
          let hasCheck = false
          item.chooseOption.forEach(option => {
            const contentTopicSelectOptionRequest = new ContentTopicSelectOptionRequest()
            contentTopicSelectOptionRequest.setOptionLabel(option.label)
            contentTopicSelectOptionRequest.setIsOptionAnswer(option.checked ? 1 : 2)
            if (option.checked) {
              hasCheck = true
            }
            optionList.push(contentTopicSelectOptionRequest)
          })
          if (!hasCheck) {
            // 没有答案
            this.$Message.warning('选择题必须答案')
            return
          }
          contentTopicAddRequest.setAddOptionList(optionList)
        }
        contentTopicAddRequestList.push(contentTopicAddRequest)
      }
      console.log(contentTopicAddRequestList, '111111')
      const request = new ContentTopicMulAddRequest()
      request.setContentTopicAddRequestList(contentTopicAddRequestList)
      const result = await courseApi.contentTopicMulAdd(request)
      ApiUtil.getData(result)
      RefreshEvent.emit('CourseTopicList')
      await LocalForageUtil.deleteItem(this.loadCacheFormItemKey)
      this.back()
    } catch (e) {
      this.$Message.error(e.message)
    } finally {
      this.submitRunning = false
    }
  }
  private async loadCacheFormItem () {
    const cacheData = await LocalForageUtil.getItem(this.loadCacheFormItemKey)
    if (cacheData != null) {
      this.formItem = JsonProtocol.arrayToBeans(cacheData, UpdateModel, new Map<string, new() => object>().set('root', UpdateModel), 'root')
    }
  }
  private async startTimeSaveCache () {
    setInterval(() => {
      if (CollectionUtils.isNotEmpty(this.formItem)) {
        LocalForageUtil.setItem(this.loadCacheFormItemKey, this.formItem)
      }
    }, 500)
  }
  public back () {
    this.closeTag(this.$route)
  }
  private optionAdd (index: number) {
    const label = this.formItem[index].optionLabel
    if (StringUtil.isBank(label)) {
      this.$Message.warning('输入不能为空')
      return
    }
    this.formItem[index].chooseOption.push({
      value: this.optionValue++,
      label,
      checked: false,
      isNew: true
    })
    this.formItem[index].optionLabel = ''
    const f = this.$refs['formItem' + index][0] as any
    f.validateField('chooseOption')
  }
  private optionTagClose (event, id) {
    const index = this.getOptionIndexById(id)
    if (index[0] >= 0 && index[1] >= 0) {
      const option = this.formItem[index[0]].chooseOption.splice(index[1], 1)
      if (option.length === 1 && !option[0].isNew) {
        this.removeOptionIdList.push(option[0].value)
      }
    }
  }
  private getOptionIndexById (id): number[] {
    let indexI = -1
    let indexJ = -1
    this.formItem.forEach((item, i) => {
      item.chooseOption.forEach((option, j) => {
        if (option.value === id) {
          indexI = i
          indexJ = j
        }
      })
    })
    return [indexI, indexJ]
  }
  private optionTagChange (checked, id) {
    const index = this.getOptionIndexById(id)
    if (checked && ContentTopicConstant.TYPE_SIGN_SELECT === this.formItem[index[0]].topicType) {
      // 单选 判断当前选中的数量
      let checkCount = 0
      this.formItem[index[0]].chooseOption.forEach((option, i) => {
        if (option.checked) {
          checkCount++
        }
      })
      if (checkCount !== 0) {
        this.$Message.warning('单选模式 不能多选')
        if (index[0] >= 0 && index[1] >= 0) {
          this.formItem[index[0]].chooseOption[index[1]].checked = false
        }
        return
      }
    }
    if (index[0] >= 0 && index[1] >= 0) {
      this.formItem[index[0]].chooseOption[index[1]].checked = checked
    }
  }
  private async handleUploadSuccess (res) {
    try {
      const data = ApiUtil.getData(await cmsApi.wordBatchCourseTopic(ProjectConfig.picDomain + this.fileData.key))
      this.formItem = []
      data.forEach(item => {
        const updateModel = new UpdateModel()
        updateModel.state = ContentTopicConstant.STATE_ONLINE
        updateModel.topicType = item.getTopicType()
        updateModel.title = item.getTitle()
        updateModel.chooseOption = []
        if (JSHelperUtil.isNotNull(item.getOptionList())) {
          item.getOptionList().forEach(option => {
            updateModel.chooseOption.push({
              value: this.optionValue++,
              label: option,
              checked: false,
              isNew: true
            })
          })
        }
        this.formItem.push(updateModel)
      })
    } catch (e) {
      throw e
    } finally {
      ApiUtil.getData(await foreignApi.qiniuFileDelete(this.fileData.key))
    }
  }
  private handleUploadError (error) {
    this.$Message.error('上传失败:' + error.message)
  }
  private async handleUploadBefore () {
    this.fileData.token = ApiUtil.getData(await foreignApi.qiniuTokenRefresh())
    const now = moment()
    this.fileData.key = `course/word/problem/${now.format('YYYY')}/${now.format('MM-DD')}/${now.format('X')}_${Math.floor(Math.random() * 1000)}.doc`
    return true
  }
  private async deleteFormItem (index: number) {
    this.formItem.splice(index, 1)
  }
  private async addTitleMarkdown (item: UpdateModel) {
    if (item.showTitleMarkdown) {}
    item.showTitleMarkdown = !item.showTitleMarkdown
  }
  private async addAnsweMarkdown (item: UpdateModel) {
    if (item.showAnswerMarkdown) {}
    item.showAnswerMarkdown = !item.showAnswerMarkdown
  }
}
</script>

<style scoped>

</style>
