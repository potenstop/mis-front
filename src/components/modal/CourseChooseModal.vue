<template>
  <modal name="course-choose-modal"
         transition="nice-modal-fade"
         :min-width="200"
         :min-height="200"
         :adaptive="true"
         :scrollable="true"
         :reset="true"
         :draggable="true"
         width="80%"
         height="auto"
         @before-open="beforeOpen"
  >
    <Table border
           :columns="columns"
           :data="dataList"
           style="margin: 10px"
           :loading="loading"
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
        <Button v-if="chooseIdList.indexOf(row.contentId) !== -1" type="warning" size="small" style="margin-right: 5px" @click="actionCancelChoose(row, index)">取消选中</Button>
        <Button v-else type="primary" size="small" style="margin-right: 5px" @click="actionChoose(row, index)">选中</Button>
      </template>
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          :page-size="pageSize"
          :show-total="true"
          :show-elevator="true"
          :show-sizer="true"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
        ></Page>
      </div>
    </div>

  </modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ContentTopicListItemResponse } from '@/response/ContentTopicListItemResponse'
import { JsonProtocol } from 'papio-h5'
import { ContentTopicListItemRequest } from '@/request/ContentTopicListItemRequest'
import { ContentTopicApi } from '@/dao/api/ContentTopicApi'
import { ApiUtil } from '@/common/util/ApiUtil'
import ConstantMixin from '@/components/mixin/ConstantMixin'
import { mixins } from 'vue-class-component'
const contentTopicApi = new ContentTopicApi()

@Component
export default class CourseChooseModal extends mixins(ConstantMixin) {
  private name = 'CourseChooseModal'
  private chooseIdList: Array<number> = []
  private pageTotal: number = 0
  private pageCurrent: number = 1
  private pageSize: number = 20
  private loading = true
  private columns = [
    {
      title: 'ID',
      slot: 'contentId',
      sortable: true
    },
    {
      title: '题目描述',
      slot: 'title'
    },
    {
      title: '题目类型',
      slot: 'topicType',
      key: 'topicType'
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
  private dataList: ContentTopicListItemResponse[] = []
  private async created () {
  }
  private async beforeOpen (event) {
    this.chooseIdList = event.params.chooseIdList
    await this.load()
  }
  private async load () {
    this.loading = true
    try {
      const request = JsonProtocol.jsonToBean({}, ContentTopicListItemRequest)
      request.setPageNum(this.pageCurrent)
      request.setPageSize(this.pageSize)
      const result = await contentTopicApi.list(request)
      const data = ApiUtil.getData(result)
      this.dataList = data.getList()
      this.pageTotal = data.getTotal()
    } finally {
      this.loading = false
    }
  }
  private actionChoose (row: any, index) {
    this.chooseIdList.push(row.contentId)
  }
  private actionCancelChoose (row: any, index) {
    const i = this.chooseIdList.indexOf(row.contentId)
    if (i !== -1) {
      this.chooseIdList.splice(i, 1)
    }
  }
  private async pageChange (current: number) {
    this.pageCurrent = current
    await this.load()
  }
  private async pageSizeChange (pageSize: number) {
    this.pageSize = pageSize
    await this.load()
  }
}
</script>

<style scoped>

</style>
