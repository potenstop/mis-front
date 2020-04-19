<template>
  <modal name="problem-answer-grade-overview-modal"
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

    <List header="得分概览" border>
      <ListItem>总分:{{answerOverview.getProblemAmount()}}</ListItem>
      <ListItem>总得分:{{answerOverview.getProblemGradeAmount()}}</ListItem>
      <ListItem>排名:{{answerOverview.getSiteRank() === -1 ? '未上榜' : `第${answerOverview.getSiteRank()}名`}}</ListItem>
      <ListItem>准确率:{{answerOverview.getCorrectRate() * 100 + '%'}}</ListItem>
    </List>

    <br>
  </modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CourseApi } from '@/dao/api/CourseApi'
import { AlbumCourseProblemAnswerOverviewResponse } from '@/response/AlbumCourseProblemAnswerOverviewResponse'

const courseApi = new CourseApi()

@Component
export default class ProblemAnswerGradeOverviewModal extends Vue {
  private name = 'ProblemAnswerGradeOverviewModal'
  private answerOverview: AlbumCourseProblemAnswerOverviewResponse = new AlbumCourseProblemAnswerOverviewResponse()
  private beforeOpen (event) {
    this.answerOverview = event.params.answerOverview
  }
}
</script>

<style scoped>

</style>
