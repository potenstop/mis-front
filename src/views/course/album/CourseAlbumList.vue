<template>
  <div>
    <simple-page-table
      :columns="columns1"
      :api-list="apiList"
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
  private columns1 = [
    {
      title: 'ID',
      key: 'albumId',
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
      title: '题目总数',
      key: 'contentCount'
    },
    {
      title: '分类',
      key: 'courseTypeNames'
    },
    {
      title: '创建时间',
      key: 'createTime',
      sortable: true,
      customFilter: {
        type: 'dateScope'
      }
    },
    {
      title: '更新时间',
      key: 'updateTime',
      sortable: true,
      customFilter: {
        type: 'dateScope'
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
  private apiList (body) {
    const request = JsonProtocol.jsonToBean(body, AlbumCourseListItemRequest)
    return albumCourseApi.list(request)
  }
  private actionAdd () {
    this.$Message.info('111111')
  }
}
</script>

<style scoped>

</style>
