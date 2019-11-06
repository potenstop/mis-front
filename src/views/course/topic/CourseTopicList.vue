<template>
  <div>
    <simple-page-table
      :columns="columns"
      :api-list="apiList"
      :view-name="name"
      @on-action-add="actionAdd"
    ></simple-page-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CourseApi } from '@/dao/api/CourseApi'
import { JsonProtocol } from 'papio-h5'
import SimplePageTable from '@/components/table/SimplePageTable.vue'
import { CourseListItemRequest } from '@/request/CourseListItemRequest'
import { CourseListItemResponse } from '@/response/CourseListItemResponse'
import { CourseTypeSimpleResponse } from '@/response/CourseTypeSimpleResponse'

const courseApi = new CourseApi()
@Component({
  components: {
    SimplePageTable
  }
})
export default class CourseTopicList extends Vue {
  private name = 'CourseTopicList'
  private columns = [
    {
      title: 'ID',
      key: 'courseId',
      sortable: true,
      customFilter: {
        type: 'inputNumber'
      }
    },
    {
      title: '课程名称',
      key: 'courseName',
      customFilter: {
        type: 'inputText'
      }
    },
    {
      title: '一级分类名称',
      key: 'courseStairName'
    },
    {
      title: '二级分类名称',
      key: 'courseSecondName'
    },
    {
      title: '三级分类名称',
      key: 'courseThreeName',
      itemValueKey: 'courseThreeList',
      getValue (item: CourseTypeSimpleResponse[], row: CourseListItemResponse) {
        let v = ''
        if (Array.isArray(item) && item.length > 0) {
          item.forEach((simpleItem: CourseTypeSimpleResponse) => {
            v += simpleItem.getTypeName()
          })
        }
        return v
      }
    }
  ]
  private apiList (body) {
    const request = JsonProtocol.jsonToBean(body, CourseListItemRequest)
    return courseApi.list(request)
  }
  private actionAdd () {
    this.$Message.info('111111')
  }
}
</script>

<style scoped>

</style>
