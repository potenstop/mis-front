<template>
  <div>
    <simple-page-table
      :columns="columns"
      :api-list="apiList"
      :view-name="name"
      :child-start-init="childStartInit"
    >
      <div slot="headButtonList" class="simple-page-table-head">
        <Button type="primary" icon="ios-add" v-on:click="actionAdd">{{$t("P_ADD")}}</Button>
      </div>
    </simple-page-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'
import { CourseApi } from '@/dao/api/CourseApi'
import { JSHelperUtil, JsonProtocol } from 'papio-h5'
import SimplePageTable from '@/components/table/SimplePageTable.vue'
import { CourseListItemRequest } from '@/request/CourseListItemRequest'
import { CourseListItemResponse } from '@/response/CourseListItemResponse'
import { CourseTypeSimpleResponse } from '@/response/CourseTypeSimpleResponse'
import { ApiUtil } from '@/common/util/ApiUtil'
const courseApi = new CourseApi()
@Component({
  components: {
    SimplePageTable
  }
})
export default class CourseSubjectList extends Vue {
  @Inject('reload') readonly reload: Function
  private name = 'CourseSubjectList'
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
      key: 'courseStairName',
      requestKey: 'courseStairId',
      customFilter: {
        type: 'selectSign'
      }
    },
    {
      title: '二级分类名称',
      key: 'courseSecondName',
      requestKey: 'courseSecondId',
      customFilter: {
        type: 'selectSign'
      }
    },
    {
      title: '三级分类名称',
      key: 'courseThreeName',
      customFilter: {
        type: 'selectSign'
      },
      responseKey: 'courseThreeList',
      requestKey: 'courseThreeId',
      getValue (item: CourseTypeSimpleResponse[], row: CourseListItemResponse) {
        let v = ''
        if (Array.isArray(item) && item.length > 0) {
          item.forEach((simpleItem: CourseTypeSimpleResponse) => {
            v += simpleItem.getTypeName()
          })
        }
        return v
      }
    },
    {
      title: '操作',
      key: '_option',
      optionList: [
        {
          icon: 'ios-build-outline',
          text: '编辑',
          buttonType: 'primary',
          click: this.actionView
        }
      ]
    }
  ]
  private async created () {
    // this.editName = this.$t('P_EDIT') as string
    console.log(this.$t('P_EDIT'))
  }
  private apiList (body) {
    const request = JsonProtocol.jsonToBean(body, CourseListItemRequest)
    return courseApi.courseListByFilter(request)
  }
  private actionAdd () {
    this.$router.push({
      path: '/course/subject/add'
    })
  }
  private actionView (row: any, index) {
    this.$router.push({
      path: '/course/subject/edit',
      query: {
        id: row.courseId
      }
    })
  }
  private async childStartInit () {
    const result = await courseApi.courseTypeListByFilterNotPage(null, null)
    const data = ApiUtil.getData(result)
    const map = new Map<number, { value: number; label: string; }[]>()
    data.forEach(item => {
      const pushItem = {
        value: item.getCourseTypeId(),
        label: item.getTypeName()
      }
      if (map.has(item.getRank())) {
        map.get(item.getRank()).push(pushItem)
      } else {
        map.set(item.getRank(), [ pushItem ])
      }
    })
    this.columns.forEach((item: any) => {
      let rank = null
      if (item.customFilter) {
        if (item.key === 'courseStairName') {
          rank = 1
        } else if (item.key === 'courseSecondName') {
          rank = 2
        } else if (item.key === 'courseThreeName') {
          rank = 3
        }
      }
      if (rank !== null && map.has(rank)) {
        item.customFilter.option = map.get(rank)
      }
    })
  }
}
</script>

<style scoped>

</style>
