<template>
  <modal name="problem-choose-modal"
         transition="nice-modal-fade"
         :min-width="200"
         :min-height="200"
         :adaptive="true"
         :scrollable="true"
         :reset="true"
         :draggable="true"
         width="50%"
         height="50%"
         @before-open="beforeOpen"
  >
    <Table border :columns="columns" :data="chooseList"  @on-row-click="onRowClick" style="margin: 5px">
      <template slot-scope="{ row }" slot="progress">
        <Progress :percent="!row.totalContentCount ? 0 : Math.round(row.answerContentCount * 100 / row.totalContentCount)" :stroke-color="['#108ee9', '#87d068']" />
      </template>

    </Table>

  </modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AlbumCourseProblemListItemResponse } from '@/response/AlbumCourseProblemListItemResponse'
@Component
export default class ProblemChooseModal extends Vue {
  private name = 'ProblemChooseModal'
  private chooseList: AlbumCourseProblemListItemResponse[] = []
  private onChooseRow: Function = null
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
    }
  ]
  private beforeOpen (event) {
    this.chooseList = event.params.chooseList
    this.onChooseRow = event.params.onChooseRow
  }
  private onRowClick (row, index) {
    this.$modal.hide('problem-choose-modal')
    if (this.onChooseRow) {
      this.onChooseRow(row, index)
    }
  }
}
</script>

<style scoped>

</style>
