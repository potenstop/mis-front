<template>
  <modal name="problem-choose-modal"
         transition="nice-modal-fade"
         :min-width="200"
         :min-height="200"
         :adaptive="true"
         :scrollable="true"
         :reset="true"
         :draggable="true"
         :resizable="true"
         width="80%"
         height="auto"
         @before-open="beforeOpen"
  >
    <Table border :columns="columns" :data="chooseList" style="margin: 5px">
      <template slot-scope="{ row }" slot="progress">
        <Progress :percent="!row.totalContentCount ? 0 : Math.round(row.answerContentCount * 100 / row.totalContentCount)" :stroke-color="['#108ee9', '#87d068']" />
      </template>
      <template slot-scope="{ row }" slot="_option">
        <Button type="info" icon="ios-play" @click.stop="onRowClick(row)">继续</Button>
        <Button type="warning" icon="md-trash" @click.stop="onDelete(row.albumCourseProblemId)">删除</Button>
      </template>
    </Table>
    <Row type="flex" justify="center" style="padding-top: 20px">
      <Col span="4">
        <Button type="primary" @click="createProblem()">新建</Button>
      </Col>
    </Row>

  </modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AlbumCourseProblemListItemResponse } from '@/response/AlbumCourseProblemListItemResponse'
import { CourseApi } from '@/dao/api/CourseApi'

const courseApi = new CourseApi()

@Component
export default class ProblemChooseModal extends Vue {
  private name = 'ProblemChooseModal'
  private chooseList: AlbumCourseProblemListItemResponse[] = []
  private onChooseRow: Function = null
  private albumId: number = null
  private columns = [
    {
      'title': 'ID',
      'key': 'albumCourseProblemId'
    },
    {
      'title': '创建时间',
      'key': 'createTime'
    },
    {
      'title': '更新时间',
      'key': 'updateTime'
    },
    {
      'title': '进度',
      'key': 'progress',
      'slot': 'progress'
    },
    {
      'title': '操作',
      'key': '_option',
      'slot': '_option'
    }
  ]
  private beforeOpen (event) {
    this.chooseList = event.params.chooseList
    this.onChooseRow = event.params.onChooseRow
    this.albumId = event.params.albumId
  }
  private onRowClick (row) {
    this.$modal.hide('problem-choose-modal')
    if (this.onChooseRow) {
      this.onChooseRow(row, this.albumId)
    }
  }
  private onDelete (albumCourseProblemId: number) {
    this.$Modal.confirm({
      title: '确认删除吗?',
      onOk: () => {
        this.$modal.hide('problem-choose-modal')
        return courseApi.albumCourseProblemDelete(albumCourseProblemId)
      }
    })
  }
  private async createProblem () {
    this.$modal.hide('problem-choose-modal')
    if (this.onChooseRow) {
      this.onChooseRow(null, this.albumId)
    }
  }
}
</script>

<style scoped>

</style>
