<template>
  <div>
    <simple-page-table
      :columns="columns"
      :api-list="apiList"
      :view-name="name"
    >
      <div slot="headButtonList" class="simple-page-table-head">
        <Button type="primary" icon="ios-add" v-on:click="actionAdd">{{$t("P_ADD")}}</Button>
      </div>
    </simple-page-table>
    <problem-choose-modal/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CourseApi } from '@/dao/api/CourseApi'
import { JsonProtocol } from 'papio-h5'
import { AlbumCourseListItemRequest } from '@/request/AlbumCourseListItemRequest'
import SimplePageTable from '@/components/table/SimplePageTable.vue'
import { AlbumCourseProblemListItemRequest } from '@/request/AlbumCourseProblemListItemRequest'
import { StoreConstant } from '@/common/constant/StoreConstant'
import { namespace } from 'vuex-class'
import { AlbumCourseProblemConstant } from '@/common/constant/AlbumCourseProblemConstant'
import { ApiUtil } from '@/common/util/ApiUtil'
import { AlbumCourseProblemAddRequest } from '@/request/AlbumCourseProblemAddRequest'
import ProblemChooseModal from '@/components/modal/ProblemChooseModal.vue'

const userModule = namespace(StoreConstant.USER)

const courseApi = new CourseApi()
@Component({
  components: {
    SimplePageTable, ProblemChooseModal
  }
})
export default class CourseAlbumList extends Vue {
  @userModule.State userId: string;
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
        },
        {
          icon: 'ios-build-outline',
          text: '答题',
          buttonType: 'primary',
          click: this.actionAnswer
        }
      ]
    }
  ]
  private apiList (body) {
    const request = JsonProtocol.jsonToBean(body, AlbumCourseListItemRequest)
    return courseApi.albumCourseList(request)
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
        id: row.albumId
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
  private async actionAnswer (row: any, index) {
    const albumCourseProblemListItemRequest = new AlbumCourseProblemListItemRequest()
    albumCourseProblemListItemRequest.setAlbumId(row.albumId)
    albumCourseProblemListItemRequest.setUserId(+this.userId)
    albumCourseProblemListItemRequest.setPageSize(1000)
    albumCourseProblemListItemRequest.setPageNum(1)
    albumCourseProblemListItemRequest.setState(AlbumCourseProblemConstant.STATE_SAVE)
    const listResult = await courseApi.albumCourseProblemList(albumCourseProblemListItemRequest)
    const listData = ApiUtil.getData(listResult)
    if (listData.getTotal() === 0) {
      await this.createProblem(row.albumId)
    } else {
      this.$modal.show('problem-choose-modal', {
        chooseList: listData.getList(),
        onChooseRow: this.onChooseRow,
        albumId: row.albumId
      })
    }
  }
  private async onChooseRow (row, albumId) {
    if (row === null && albumId !== null) {
      await this.createProblem(albumId)
      return
    }
    this.$router.push({
      path: '/course/album/answer',
      query: {
        albumId: row.albumId + '',
        albumCourseProblemId: row.albumCourseProblemId + ''
      }
    })
  }
  private async createProblem (albumId: number) {
    const albumCourseProblemAddRequest = new AlbumCourseProblemAddRequest()
    albumCourseProblemAddRequest.setAlbumId(albumId)
    const addResult = await courseApi.albumCourseProblemAdd(albumCourseProblemAddRequest)
    const addData = ApiUtil.getData(addResult)
    this.$router.push({
      path: '/course/album/answer',
      query: {
        albumId: albumId + '',
        albumCourseProblemId: addData + ''
      }
    })
  }
}
</script>

<style scoped>

</style>
