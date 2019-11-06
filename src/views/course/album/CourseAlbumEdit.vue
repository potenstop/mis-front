<template>
  <div>
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80" style="margin-left: 20%" label-position="left" @on-validate="formValidate">
      <FormItem label="专辑名称" prop="albumName">
        <Input v-model="formItem.albumName" placeholder="" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="专辑描述" prop="albumDesc">
        <Input v-model="formItem.albumDesc" placeholder="" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="课程" prop="courseId">
        <Select
          ref="courseSelect"
          style="width: 300px"
          v-model="formItem.courseId"
          filterable
          clearable
          remote
          :loading="courseLoading"
          @on-query-change="courseSelectQueryChane"
          @on-clear="courseSelectClear"
          @on-change="courseSelectChange"
        >
          <Option v-for="(option, index) in courseList" :value="option.courseId" :key="index">{{option.courseName}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formItem')" :loading="submitRunning" :disabled="loadingInit">{{$t("P_SAVE")}}</Button>
        <Button @click="back" style="margin-left: 8px">{{$t("P_CANCEL")}}</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AlbumCourseApi } from '@/dao/api/AlbumCourseApi'
import { CourseApi } from '@/dao/api/CourseApi'
import { JsonProperty, JsonProtocol } from 'papio-h5'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { StoreConstant } from '@/common/constant/StoreConstant'
import { ApiUtil } from '@/common/util/ApiUtil'
import { CourseListItemResponse } from '@/response/CourseListItemResponse'
import { AlbumCourseAddRequest } from '@/request/AlbumCourseAddRequest'
import { AlbumCourseUpdateRequest } from '@/request/AlbumCourseUpdateRequest'
import { RefreshEvent } from '@/common/event/RefreshEvent'

const appModule = namespace(StoreConstant.APP)
const albumCourseApi = new AlbumCourseApi()
const courseApi = new CourseApi()
class UpdateModel {
  @JsonProperty
  public albumId: number
  @JsonProperty
  public albumName: string
  @JsonProperty
  public albumDesc: string
  @JsonProperty
  public courseId: number
  public constructor () {
    this.albumId = 0
    this.albumName = ''
    this.albumDesc = ''
    this.courseId = 0
  }
}

@Component
export default class CourseAlbumEdit extends Vue {
  private name = 'CourseAlbumEdit'
  private formItem: UpdateModel = new UpdateModel();
  @appModule.Mutation closeTag: Function
  private submitRunning: boolean = false
  private isAddPage = true
  private loadingInit: boolean = true
  private courseList: CourseListItemResponse[] = []
  private courseLoading: boolean = false
  private courseSelectQuery: string = null
  private ruleValidate = {
    albumName: [
      { required: true, message: '课程名称不能为空', trigger: 'blur' },
      { type: 'string', max: 255, message: '课程名称最大不超过255字符', trigger: 'blur' }
    ],
    albumDesc: [
      { required: true, message: '课程代码不能为空', trigger: 'blur' },
      { type: 'string', max: 2000, message: '课程代码最大不超过2000字符', trigger: 'blur' }
    ],
    courseId: [
      { type: 'integer', required: true, message: '课程不能为空', min: 1, trigger: 'blur' }
    ]
  }

  private async created () {
    this.loadingInit = true
    if (this.$route.path.indexOf('add') !== -1) {
      this.isAddPage = true
    } else {
      this.isAddPage = false
    }
    if (!this.isAddPage) {
      const query = this.$route.query as any
      const result = await albumCourseApi.view(query.id)
      const albumCourseViewResponse = ApiUtil.getData(result)
      this.formItem = new UpdateModel()
      JsonProtocol.copyProperties(albumCourseViewResponse, this.formItem)
      await this.remoteCourseList(this.formItem.courseId + '')
    } else {
      await this.remoteCourseList('')
    }
    this.loadingInit = false
  }
  private async remoteCourseList (input: string) {
    try {
      this.courseLoading = true
      let courseId: number = null
      let courseName: string = null
      if (input !== '') {
        if (!isNaN(+input)) {
          courseId = +input
        } else {
          courseName = input
        }
      }
      this.courseList = ApiUtil.getData(await courseApi.notPageList(courseName, courseId))
    } finally {
      this.courseLoading = false
    }
  }
  private async handleSubmit (name) {
    console.log(this.formItem)
    this.submitRunning = true
    try {
      const form = this.$refs[name] as any
      const valid = await form.validate()
      if (!valid) {
        return
      }
      let result = null
      if (this.isAddPage) {
        const request = new AlbumCourseAddRequest()
        JsonProtocol.copyProperties(this.formItem, request)
        result = await albumCourseApi.add(request)
      } else {
        const request = new AlbumCourseUpdateRequest()
        JsonProtocol.copyProperties(this.formItem, request)
        result = await albumCourseApi.update(request)
      }
      ApiUtil.getData(result)
      RefreshEvent.emit('CourseAlbumList')
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
  private async courseSelectQueryChane (query) {
    this.courseSelectQuery = query
    await this.remoteCourseList(query)
  }
  private courseSelectClear () {
    this.formItem.courseId = null
  }
  private courseSelectChange (id) {
    this.formItem.courseId = id
  }
  private formValidate (prop, status, error) {
    console.log(prop, status, error)
  }
}
</script>

<style scoped>

</style>
