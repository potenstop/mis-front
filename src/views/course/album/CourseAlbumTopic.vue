<template>
  <Card style="width: 100%">
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80" style="margin-left: 20%" label-position="left">
      <FormItem label="">
        <Button type="primary" @click="handleRender">选择题目</Button>
        <course-choose-modal/>
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
import { JSHelperUtil, JsonProperty, JsonProtocol, ReturnGenericsProperty, StringUtil } from 'papio-h5'
import { RefreshEvent } from '@/common/event/RefreshEvent'
import SimplePageTable from '@/components/table/SimplePageTable.vue'
import { ContentTopicApi } from '@/dao/api/ContentTopicApi'
import { ContentTopicListItemRequest } from '@/request/ContentTopicListItemRequest'
import { ContentTopicListItemResponse } from '@/response/ContentTopicListItemResponse'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'
import CourseChooseModal from '@/components/modal/CourseChooseModal.vue'

const contentTopicApi = new ContentTopicApi()
const appModule = namespace(StoreConstant.APP)

class UpdateModel {
  @JsonProperty
  public contentId: number
}

@Component({
  components: {
    CourseChooseModal
  }
})
export default class CourseAlbumTopic extends Vue {
  @appModule.Mutation closeTag: Function
  private name = 'CourseAlbumTopic'
  private formItem: UpdateModel = new UpdateModel()
  private loadingInit: boolean = true
  private value: string = null
  private ruleValidate = {
    title: [
      { type: 'string', required: true, message: '标题不能为空', trigger: 'blur' },
      { type: 'string', max: 50, message: '课程名称最大不超过50字符', trigger: 'blur' }
    ]
  }
  private submitRunning: boolean = false
  private columns = [
    {
      title: 'ID',
      key: 'contentId',
      sortable: true,
      customFilter: {
        type: 'inputNumber'
      }
    },
    {
      title: '题目描述',
      key: 'title',
      customFilter: {
        type: 'inputText'
      }
    },
    {
      title: '题目类型',
      key: 'topicType',
      getValue (item: number, row: ContentTopicListItemResponse, simpleThis: Vue) {
        if (ContentTopicConstant.TYPE_SIGN_SELECT === item) {
          return simpleThis.$t('CONTENT_TOPIC_TYPE_SIGN_SELECT')
        } else if (ContentTopicConstant.TYPE_MUL_SELECT === item) {
          return simpleThis.$t('CONTENT_TOPIC_TYPE_MUL_SELECT')
        } else if (ContentTopicConstant.TYPE_FILL_BLANK === item) {
          return simpleThis.$t('CONTENT_TOPIC_TYPE_FILL_BLANK')
        } else if (ContentTopicConstant.TYPE_SHORT_ANSWER === item) {
          return simpleThis.$t('CONTENT_TOPIC_TYPE_SHORT_ANSWER')
        }
        return simpleThis.$t('P_ERROR_ENUM')
      }
    },
    {
      title: '状态',
      key: 'state',
      getValue (item: number, row: ContentTopicListItemResponse, simpleThis: Vue) {
        if (ContentTopicConstant.STATE_ONLINE === item) {
          return simpleThis.$t('CONTENT_STATE_ONLINE')
        } else if (ContentTopicConstant.STATE_OFFLINE === item) {
          return simpleThis.$t('CONTENT_STATE_OFFLINE')
        }
        return simpleThis.$t('P_ERROR_ENUM')
      }
    },
    {
      title: '操作',
      key: '_option',
      optionList: [
        {
          icon: 'ios-build-outline',
          text: '编辑',
          buttonType: 'primary'
        }
      ]
    }
  ]

  private async created () {
    this.loadingInit = true
    await this.initEditData()
    this.loadingInit = false
  }
  private async initEditData () {
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
  private apiList (body) {
    const request = JsonProtocol.jsonToBean(body, ContentTopicListItemRequest)
    return contentTopicApi.list(request)
  }
  handleRender () {
    const than = this
    this.$modal.show('course-choose-modal')
    console.log(1)
    /* this.$Modal.confirm({
      width: 90,
      render: (h) => {
        const than = this
        return h(SimplePageTable, {
          props: {
            columns: than.columns,
            apiList: than.apiList,
            viewName: 'name',
            hasActionAdd: false
          },
          on: {

          }
        })
      }
    }) */
  }
}
</script>

<style scoped>

</style>
