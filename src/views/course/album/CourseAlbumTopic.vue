<template>
  <Card style="width: 100%">
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80" style="margin-left: 20%" label-position="left">
      <FormItem label="">
        <Button type="primary" @click="handleRender">选择题目</Button>
        <course-choose-modal/>
      </FormItem>
      <FormItem label="已选题目">
        <Table border
               :columns="columns"
               :data="contentTopicDataList"
               style="margin: 10px"
               :loading="chooseTopicLoading"
        >
          <template slot-scope="{ row }" slot="contentId">
            <span>{{ row.contentId }}</span>
          </template>
          <template slot-scope="{ row }" slot="title">
            <span>{{ row.title }}</span>
          </template>
          <template slot-scope="{ row }" slot="topicType">
            <span>{{ getContentTopicTypeNameById(row.topicType) }}</span>
          </template>
          <template slot-scope="{ row }" slot="state">
            <span>{{ getContentStateNameById(row.state) }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="warning" size="small" style="margin-right: 5px" @click="actionCancelChoose(row, index)">取消选中</Button>
          </template>
          <slot name="header" slot="header"></slot>
          <slot name="footer" slot="footer"></slot>
          <slot name="loading" slot="loading"></slot>
        </Table>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formItem')" :loading="submitRunning" :disabled="loadingInit">{{$t("P_SAVE")}}</Button>
        <Button @click="back" style="margin-left: 8px">{{$t("P_CANCEL")}}</Button>
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
import { ContentTopicApi } from '@/dao/api/ContentTopicApi'
import { ContentTopicListItemRequest } from '@/request/ContentTopicListItemRequest'
import CourseChooseModal from '@/components/modal/CourseChooseModal.vue'
import ConstantMixin from '@/components/mixin/ConstantMixin'
import { mixins } from 'vue-class-component'
import { AlbumCourseApi } from '@/dao/api/AlbumCourseApi'
import { AlbumCourseUpdateCourseRelationRequest } from '@/request/AlbumCourseUpdateCourseRelationRequest'

const contentTopicApi = new ContentTopicApi()
const albumCourseApi = new AlbumCourseApi()
const appModule = namespace(StoreConstant.APP)

class UpdateModel {
  @JsonProperty
  public albumId: number

  @JsonProperty
  public contentIdList: number[]
  constructor () {
    this.albumId = null
    this.contentIdList = []
  }
}

@Component({
  components: {
    CourseChooseModal
  }
})
export default class CourseAlbumTopic extends mixins(ConstantMixin) {
  @appModule.Mutation closeTag: Function
  private name = 'CourseAlbumTopic'
  private formItem: UpdateModel = new UpdateModel()
  private loadingInit: boolean = true
  private value: string = null
  private ruleValidate = {}
  private submitRunning: boolean = false
  private columns = [
    {
      title: 'ID',
      slot: 'contentId'
    },
    {
      title: '题目描述',
      slot: 'title'
    },
    {
      title: '题目类型',
      slot: 'topicType'
    },
    {
      title: '状态',
      slot: 'state'
    },
    {
      title: '操作',
      slot: 'action'
    }
  ]
  private contentTopicDataList = []
  private chooseTopicLoading = true

  private async created () {
    this.loadingInit = true
    await this.initEditData()
    this.loadingInit = false
  }
  private async initEditData () {
    const query = this.$route.query as any
    this.formItem.albumId = query.id
    const result = await albumCourseApi.view(query.id)
    const data = ApiUtil.getData(result)
    this.formItem.contentIdList = data.getContentIdList()
    // await this.loadContentIdList(data.getContentIdList())
  }
  private async loadContentIdList (idList: number[]) {
    try {
      this.chooseTopicLoading = true
      const contentTopicListItemRequest = new ContentTopicListItemRequest()
      if (Array.isArray(idList)) {
        if (idList.length > 0) {
          contentTopicListItemRequest.setContentIdList(idList)
          contentTopicListItemRequest.setPageNum(1)
          contentTopicListItemRequest.setPageSize(100000)
          const contentListResult = await contentTopicApi.list(contentTopicListItemRequest)
          const contentListData = ApiUtil.getData(contentListResult)
          this.contentTopicDataList = contentListData.getList()
        } else {
          this.contentTopicDataList = []
        }
      }
    } finally {
      this.chooseTopicLoading = false
    }
  }
  private async handleSubmit (name) {
    this.submitRunning = true
    try {
      // const form = this.$refs[name] as any
      // const valid = await form.validate()
      // if (!valid) {
      //   return
      // }
      const request = new AlbumCourseUpdateCourseRelationRequest()
      request.setAlbumId(this.formItem.albumId)
      request.setContentIdList(this.formItem.contentIdList)
      const result = await albumCourseApi.updateCourseRelation(request)
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
    this.$modal.show('course-choose-modal', {
      chooseIdList: this.formItem.contentIdList
    })
  }
  @Watch('formItem.contentIdList')
  private async onContentIdListChange () {
    await this.loadContentIdList(this.formItem.contentIdList)
  }
  private async actionCancelChoose (row: any, index) {
    const i = this.formItem.contentIdList.indexOf(row.contentId)
    if (i !== -1) {
      this.formItem.contentIdList.splice(i, 1)
    }
  }
}
</script>

<style scoped>

</style>
