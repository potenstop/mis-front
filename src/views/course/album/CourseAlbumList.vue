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
import { AlbumCourseApi } from '@/dao/api/AlbumCourseApi'
import { JsonProtocol } from 'papio-h5'
import { AlbumCourseListItemRequest } from '@/request/AlbumCourseListItemRequest'
import SimplePageTable from '@/components/table/SimplePageTable.vue'

const albumCourseApi = new AlbumCourseApi()
@Component({
  components: {
    SimplePageTable
  }
})
export default class CourseAlbumList extends Vue {
  private name = 'CourseAlbumList'
  private columns = [
    {
      title: 'ID',
      key: 'albumId',
      width: 120,
      sortable: true,
      customFilter: {
        type: 'inputNumber'
      }
    },
    {
      title: '专辑名称',
      key: 'albumName',
      customFilter: {
        type: 'inputText'
      }
    },
    {
      title: '描述',
      key: 'albumDesc'
    },
    {
      title: '题目数',
      key: 'contentCount',
      width: 80
    },
    {
      title: '课程名称',
      key: 'courseName'
    },
    {
      title: '创建时间',
      key: 'createTime',
      width: 150,
      sortable: true,
      customFilter: {
        type: 'dateScope'
      }
    },
    {
      title: '更新时间',
      key: 'updateTime',
      width: 150,
      sortable: true,
      customFilter: {
        type: 'dateScope'
      }
    },
    {
      title: '操作',
      key: '_option',
      width: 300,
      optionList: [
        {
          icon: 'ios-build-outline',
          text: '编辑',
          buttonType: 'primary',
          click: this.actionView
        },
        {
          icon: 'ios-build-outline',
          text: '选题',
          buttonType: 'primary',
          click: this.actionTopic
        }
      ]
    }
  ]
  private apiList (body) {
    const request = JsonProtocol.jsonToBean(body, AlbumCourseListItemRequest)
    return albumCourseApi.list(request)
  }
  private actionAdd () {
    this.$router.push({
      path: '/course/album/add'
    })
  }
  private actionView (row: any, index) {
    this.$router.push({
      path: '/course/album/edit',
      query: {
        id: row.courseId
      }
    })
  }
  private actionTopic (row: any, index) {
    this.$router.push({
      path: '/course/album/topic',
      query: {
        id: row.albumId
      }
    })
  }
}
</script>

<style scoped>

</style>
