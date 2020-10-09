<template xmlns:v-katex="http://www.w3.org/1999/xhtml">
  <Card style="width: 100%">
    <Collapse style="margin-bottom: 10px">
      <Panel name="1">
        数学公式(点击复制)
        <div slot="content" >
          <Button type="info" class="sub-btn" v-clipboard:copy="copyKatexData.seize" v-clipboard:success="onClipboardCopySuc" v-clipboard:error="onClipboardCopyError">占位</Button>
          <Button type="info" class="sub-btn" v-clipboard:copy="copyKatexData.dispersedVariableDistribution" v-clipboard:success="onClipboardCopySuc" v-clipboard:error="onClipboardCopyError">离散变量分布律</Button>
          <Button type="info" class="sub-btn" v-clipboard:copy="copyKatexData.piecewiseFunction"  v-clipboard:success="onClipboardCopySuc" v-clipboard:error="onClipboardCopyError">分段函数</Button>
          <Button type="info" class="sub-btn" v-clipboard:copy="copyKatexData.fraction"  v-clipboard:success="onClipboardCopySuc" v-clipboard:error="onClipboardCopyError">分数</Button>
          <Button type="info" class="sub-btn" v-clipboard:copy="copyKatexData.moreX"  v-clipboard:success="onClipboardCopySuc" v-clipboard:error="onClipboardCopyError">x1~xn</Button>
          <Button type="info" class="sub-btn" v-clipboard:copy="copyKatexData.distributionBinomial"  v-clipboard:success="onClipboardCopySuc" v-clipboard:error="onClipboardCopyError">二项分布</Button>
          <Button type="info" class="sub-btn" v-clipboard:copy="copyKatexData.distributionPoisson"  v-clipboard:success="onClipboardCopySuc" v-clipboard:error="onClipboardCopyError">泊松分布</Button>
          <Button type="info" class="sub-btn" v-clipboard:copy="copyKatexData.distributionUniformity"  v-clipboard:success="onClipboardCopySuc" v-clipboard:error="onClipboardCopyError">均匀分布</Button>
          <Button type="info" class="sub-btn" v-clipboard:copy="copyKatexData.distributionIndex"  v-clipboard:success="onClipboardCopySuc" v-clipboard:error="onClipboardCopyError">指数分布</Button>
          <Button type="info" class="sub-btn" v-clipboard:copy="copyKatexData.distributionNormal"  v-clipboard:success="onClipboardCopySuc" v-clipboard:error="onClipboardCopyError">正态分布</Button>

        </div>
      </Panel>
    </Collapse>
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80" style="margin-left: 20%" label-position="left">
      <FormItem label="标题" prop="title">
        <Input v-model.trim="formItem.title" maxlength="5000" show-word-limit type="textarea" placeholder="输入标题" style="width: 600px" :autosize="{ minRows: 3, maxRows: 10 }"/>
        <auto-katex :data="formItem.title"></auto-katex>
      </FormItem>
      <FormItem label="标题附件">
        <Button icon="ios-add" type="dashed" @click="addTitleMarkdown" style="margin-left: 10px" v-if="!showTitleMarkdown">{{$t("ADD_MARKDOWN")}}</Button>
        <Button icon="ios-add" type="dashed" @click="addTitleMarkdown" style="margin-left: 10px" v-if="showTitleMarkdown">{{$t("CANCEL_MARKDOWN")}}</Button>
        <simple-markdown style="margin-top: 10px" v-if="showTitleMarkdown" :value.sync="formItem.titleAnnexContent"></simple-markdown >
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
      <FormItem label="分数" prop="gradeAmount">
        <Input v-model.trim="formItem.gradeAmount" placeholder="" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="选项" v-if="contentTopicTypeConstantSelectList.indexOf(formItem.topicType) !== -1" prop="chooseOption">
        <Input v-model.trim="optionLabel" placeholder="" style="width: 300px"/>
        <Button icon="ios-add" type="dashed" @click="optionAdd" style="margin-left: 10px">添加选项</Button>
        <auto-katex :data="optionLabel"></auto-katex>
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
        >
          {{item.label}}
        </Tag>
        <CheckboxGroup
        >
          <Checkbox
            v-for="option in formItem.chooseOption"
            :key="option.contentTopicSelectOptionId"
            :label="option.contentTopicSelectOptionId"
            style="margin-left: 10px"
            :disabled="true"
          >
            <auto-katex :data="option.label" :is-line-feed="false"></auto-katex>
          </Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="答案" v-if="formItem.topicType > 0 && contentTopicTypeConstantSelectList.indexOf(formItem.topicType) === -1" prop="answer">
        <Input v-model.trim="formItem.answer" maxlength="5000" show-word-limit type="textarea" placeholder="Enter something..." style="width: 600px" />
        <auto-katex :data="formItem.answer"></auto-katex>
      </FormItem>
      <FormItem label="答案附件">
        <Button icon="ios-add" type="dashed" @click="addAnswerMarkdown" style="margin-left: 10px" v-if="!showAnswerMarkdown">{{$t("ADD_MARKDOWN")}}</Button>
        <Button icon="ios-add" type="dashed" @click="addAnswerMarkdown" style="margin-left: 10px" v-if="showAnswerMarkdown">{{$t("CANCEL_MARKDOWN")}}</Button>
        <simple-markdown style="margin-top: 10px" v-if="showAnswerMarkdown" :value.sync="formItem.answerAnnexContent"></simple-markdown >
      </FormItem>
      <FormItem label="解析" prop="analysis">
        <Input v-model.trim="formItem.analysis" maxlength="2000" show-word-limit type="textarea" placeholder="Enter something..." style="width: 600px" />
        <auto-katex :data="formItem.analysis"></auto-katex>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formItem', true)" :loading="submitRunning" :disabled="loadingInit" style="margin-left: 8px">{{$t('P_SAVE')}}</Button>
        <Button type="info" @click="handleSubmit('formItem', false)" :loading="submitRunning" :disabled="loadingInit" style="margin-left: 8px">{{$t('P_UPDATE')}}</Button>
        <Button @click="back" style="margin-left: 8px">{{$t('P_CANCEL')}}</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ApiUtil } from '@/common/util/ApiUtil'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { StoreConstant } from '@/common/constant/StoreConstant'
import { JSHelperUtil, JsonProperty, JsonProtocol, ReturnGenericsProperty, StringUtil } from 'papio-h5'
import { RefreshEvent } from '@/common/event/RefreshEvent'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'
import { ContentTopicAddRequest } from '@/request/ContentTopicAddRequest'
import { CourseApi } from '@/dao/api/CourseApi'
import { ContentTopicUpdateRequest } from '@/request/ContentTopicUpdateRequest'
import { ContentTopicSelectOptionRequest } from '@/request/ContentTopicSelectOptionRequest'
import AutoKatex from '@/components/katex/AutoKatex.vue'
import SimpleMarkdown from '@/components/editor/SimpleMarkdown.vue'

const appModule = namespace(StoreConstant.APP)

const courseApi = new CourseApi()
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
  public gradeAmount: number
  @JsonProperty
  public chooseOption: {label: string, value: number, checked: boolean, isNew: boolean}[]
  @JsonProperty
  public titleAnnexContent: string
  @JsonProperty
  public answerAnnexContent: string
  public constructor () {
    this.contentId = null
    this.title = null
    this.state = ContentTopicConstant.STATE_ONLINE
    this.topicType = ContentTopicConstant.TYPE_SIGN_SELECT
    this.analysis = null
    this.answer = null
    this.chooseOption = []
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
export default class CourseTopicEdit extends Vue {
  @appModule.Mutation closeTag: Function
  private name = 'CourseTopicEdit'
  private formItem: UpdateModel = new UpdateModel()
  private formItemHasUpdate: boolean = false
  private loadingInit: boolean = true
  private selectTopicTypeList: {value: number, label: string}[] = []
  private contentTopicTypeConstantSelectList: number[] = []
  private ruleValidate = {
    title: [
      { type: 'string', required: true, message: '标题不能为空' },
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
  private optionLabel: string = ''
  private removeOptionIdList: number[] = []
  private showTitleMarkdown = false
  private showAnswerMarkdown = false
  private copyKatexData = {
    seize: `$$$$`,
    dispersedVariableDistribution: `$$\\def\\arraystretch{1.5}
   \\begin{array}{c|}
   X & 0 & 1 \\\\ \\hline
   P & 0.4 & 0.6 \\\\
\\end{array}$$`,
    piecewiseFunction: `$$f(x)=\\begin{cases}
     2x, 0\\le x \\le 1,\\\\
     0, 其他,
  \\end{cases}$$`,
    fraction: `$$\\dfrac{1}{2}$$`,
    moreX: `$$x_1, x_2,...,x_n$$`,
    distributionBinomial: `$$X \\text{\\textasciitilde}B(n,p)$$`,
    distributionPoisson: `$$X \\text{\\textasciitilde}P(\\lambda)$$`,
    distributionUniformity: `$$X \\text{\\textasciitilde}U(a,b)$$`,
    distributionIndex: `$$X \\text{\\textasciitilde}E(\\lambda)$$`,
    distributionNormal: `$$X \\text{\\textasciitilde}N(\\mu, \\sigma^2)$$`
  }

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
      const result = await courseApi.contentTopicView(query.id)
      const response = ApiUtil.getData(result)
      this.formItem = new UpdateModel()
      JsonProtocol.copyProperties(response, this.formItem)
      if (StringUtil.isNotBank(this.formItem.titleAnnexContent)) {
        this.showTitleMarkdown = true
      }
      if (StringUtil.isNotBank(this.formItem.answerAnnexContent)) {
        this.showAnswerMarkdown = true
      }
      if (JSHelperUtil.isNotNull(response.getAddOptionList()) && response.getAddOptionList()) {
        this.formItem.chooseOption = []
        response.getAddOptionList().forEach(item => {
          this.formItem.chooseOption.push({
            value: item.getContentTopicSelectOptionId(),
            label: item.getOptionLabel(),
            checked: item.getIsOptionAnswer() === 1,
            isNew: false
          })
        })
      }
    }
  }
  private async handleSubmit (name, isBack: boolean) {
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
        if (ContentTopicConstant.TYPE_SIGN_SELECT === this.formItem.topicType || ContentTopicConstant.TYPE_MUL_SELECT === this.formItem.topicType) {
          if (JSHelperUtil.isNullOrUndefined(this.formItem.chooseOption) || this.formItem.chooseOption.length === 0) {
            // 没有选项
            this.$Message.warning('选择题必须有选项')
            return
          }
          const optionList: ContentTopicSelectOptionRequest[] = []
          let hasCheck = false
          this.formItem.chooseOption.forEach(option => {
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
          request.setAddOptionList(optionList)
        }
        result = await courseApi.contentTopicAdd(request)
      } else {
        const request = new ContentTopicUpdateRequest()
        JsonProtocol.copyProperties(this.formItem, request)
        if (ContentTopicConstant.TYPE_SIGN_SELECT === this.formItem.topicType || ContentTopicConstant.TYPE_MUL_SELECT === this.formItem.topicType) {
          if (JSHelperUtil.isNullOrUndefined(this.formItem.chooseOption) || this.formItem.chooseOption.length === 0) {
            // 没有选项
            this.$Message.warning('选择题必须有选项')
            return
          }
          let hasCheck = false
          this.formItem.chooseOption.forEach(option => {
            const contentTopicSelectOptionRequest = new ContentTopicSelectOptionRequest()
            contentTopicSelectOptionRequest.setOptionLabel(option.label)
            contentTopicSelectOptionRequest.setIsOptionAnswer(option.checked ? 1 : 2)
            if (option.checked) {
              hasCheck = true
            }
          })
          if (!hasCheck) {
            // 没有答案
            this.$Message.warning('选择题必须答案')
            return
          }
          // 找出新增的 修改的 删除的
          let addOptionList: ContentTopicSelectOptionRequest[] = []
          let modifyOptionList: ContentTopicSelectOptionRequest[] = []
          this.formItem.chooseOption.forEach(item => {
            const option = new ContentTopicSelectOptionRequest()
            option.setIsOptionAnswer(item.checked ? 1 : 2)
            option.setOptionLabel(item.label)
            if (item.isNew) {
              addOptionList.push(option)
            } else {
              option.setContentTopicSelectOptionId(item.value)
              modifyOptionList.push(option)
            }
          })
          request.setAddOptionList(addOptionList)
          request.setModifyOptionList(modifyOptionList)
        }
        request.setRemoveOptionIdList(this.removeOptionIdList)
        result = await courseApi.contentTopicUpdate(request)
      }
      ApiUtil.getData(result)
      RefreshEvent.emit('CourseTopicList')
      this.$Message.info('保存成功！')
      this.formItemHasUpdate = false
      if (isBack) {
        this.back()
      }
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
      const option = this.formItem.chooseOption.splice(index, 1)
      if (option.length === 1 && !option[0].isNew) {
        this.removeOptionIdList.push(option[0].value)
      }
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
  @Watch('formItem')
  private onFormItemChange () {
    this.formItemHasUpdate = true
  }
  private async addTitleMarkdown () {
    if (this.showTitleMarkdown) {}
    this.showTitleMarkdown = !this.showTitleMarkdown
  }
  private async addAnswerMarkdown () {
    if (this.showAnswerMarkdown) {}
    this.showAnswerMarkdown = !this.showAnswerMarkdown
  }
  private async onClipboardCopySuc () {
    this.$Message.info('复制成功')
  }
  private async onClipboardCopyError () {
    this.$Message.warning('复制失败')
  }
}
</script>

<style scoped>
.sub-btn{
  margin: 1px;
}
</style>
