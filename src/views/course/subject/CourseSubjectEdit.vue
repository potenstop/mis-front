<template>
  <Card style="width: 100%">
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80" style="margin-left: 20%" label-position="left">
      <FormItem label="课程名称" prop="courseName">
        <Input v-model="formItem.courseName" placeholder="" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="课程代码" prop="courseCode">
        <Input v-model="formItem.courseCode" placeholder="" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="课程分类" prop="courseThreeIdList">
        <Tag v-for="item in chooseThreeTypeList"
             :key="item.threeId"
             size="large"
             type="border"
             closable
             color="primary"
             :name="item.threeId"
             @on-close = "typeTagClose"
        >{{item.threeName}}</Tag>
        <Cascader :data="courseTypeTreeList" @on-change="typeChoose">
          <Button icon="ios-add" type="dashed" size="large">添加分类</Button>
        </Cascader>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formItem')" :loading="submitRunning" :disabled="loadingInit">{{$t("P_SAVE")}}</Button>
        <Button @click="back" style="margin-left: 8px">{{$t("P_CANCEL")}}</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CourseAddRequest } from '@/request/CourseAddRequest'
import { CourseApi } from '@/dao/api/CourseApi'
import { CourseTypeApi } from '@/dao/api/CourseTypeApi'
import { CourseTypeTreeItemResponse } from '@/response/CourseTypeTreeItemResponse'
import { ApiUtil } from '@/common/util/ApiUtil'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { StoreConstant } from '@/common/constant/StoreConstant'
import { CourseUpdateRequest } from '@/request/CourseUpdateRequest'
import { JsonProperty, JsonProtocol, ReturnGenericsProperty } from 'papio-h5'
import { RefreshEvent } from '@/common/event/RefreshEvent'

const appModule = namespace(StoreConstant.APP)

const courseApi = new CourseApi()
const courseTypeApi = new CourseTypeApi()
class UpdateModel {
  @JsonProperty
  public courseId: number
  @JsonProperty
  public courseCode: string
  @JsonProperty
  public courseName: string
  @JsonProperty
  public courseSecondId: number
  @JsonProperty
  public courseStairId: number
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', Number))
  public courseThreeIdList: number[]
  public constructor () {
    this.courseId = 0
    this.courseName = ''
    this.courseCode = ''
    this.courseSecondId = 0
    this.courseStairId = 0
    this.courseThreeIdList = []
  }
}

@Component
export default class CourseSubjectEdit extends Vue {
  private name = 'CourseSubjectEdit'
  private formItem: UpdateModel = new UpdateModel()
  private courseTypeTreeList: CourseTypeTreeItemResponse[] = []
  private chooseThreeTypeList: {threeId: number, threeName: string}[] = []
  private chooseThreeTypeIdMap: Map<number, number> = new Map<number, number>()
  private stairId: number = null
  private stairName: string = null
  private secondId: number = null
  private secondName: string = null
  private loadingInit: boolean = true
  private ruleValidate = {
    courseName: [
      { required: true, message: '课程名称不能为空', trigger: 'blur' },
      { type: 'string', max: 50, message: '课程名称最大不超过50字符', trigger: 'blur' }
    ],
    courseCode: [
      { required: true, message: '课程代码不能为空', trigger: 'blur' },
      { type: 'string', max: 50, message: '课程代码最大不超过50字符', trigger: 'blur' }
    ],
    courseThreeIdList: [
      { type: 'array', required: true, message: '课程分类不能为空', min: 1, trigger: 'blur' }
    ]
  }
  @appModule.Mutation closeTag: Function
  private submitRunning: boolean = false
  private isAddPage = true

  private async created () {
    this.loadingInit = true
    this.courseTypeTreeList = ApiUtil.getData(await courseTypeApi.noPageTree())
    if (this.$route.path.indexOf('add') !== -1) {
      this.isAddPage = true
    } else {
      this.isAddPage = false
    }
    if (!this.isAddPage) {
      const query = this.$route.query as any
      const result = await courseApi.view(query.id)
      const courseViewResponse = ApiUtil.getData(result)
      this.formItem = new UpdateModel()
      JsonProtocol.copyProperties(courseViewResponse, this.formItem)
      this.stairId = courseViewResponse.getCourseStairId()
      this.stairName = courseViewResponse.getCourseStairName()
      this.secondId = courseViewResponse.getCourseSecondId()
      this.secondName = courseViewResponse.getCourseSecondName()
      courseViewResponse.getCourseThreeList().forEach(item => {
        const i = this.chooseThreeTypeList.push({
          threeId: item.getCourseTypeId(),
          threeName: item.getTypeName()
        })
        this.chooseThreeTypeIdMap.set(item.getCourseTypeId(), i - 1)
        this.formItem.courseThreeIdList = []
        this.formItem.courseThreeIdList.push(item.getCourseTypeId())
      })
    }
    this.loadingInit = false
  }
  /**
  * 方法描述 分类选中事件
  * @author yanshaowen
  * @date 2019/11/3 14:35
  * @param value        选中的id列表 [1,2,4]
  * @param selectedData 选中的item列表 [{value: 1, label: ""}]
  * @return
  */
  private typeChoose (value: number[], selectedData: {value: number, label: string}[]) {
    if (this.stairId !== null && this.stairId !== value[0] && this.secondId !== value[1]) {
      // 只能添加相同的父级类型
      this.$Message.warning(`已存在(${this.stairName}/${this.secondName})的级别 只能添加该级别的子类`)
      return
    }
    if (this.stairId == null) {
      this.stairId = selectedData[0].value
      this.stairName = selectedData[0].label
      this.secondId = selectedData[1].value
      this.secondName = selectedData[1].label
      this.chooseThreeTypeList = []
      this.chooseThreeTypeIdMap.clear()
    }
    if (!this.chooseThreeTypeIdMap.has(selectedData[2].value)) {
      const i = this.chooseThreeTypeList.push({
        threeId: selectedData[2].value,
        threeName: selectedData[2].label
      })
      this.chooseThreeTypeIdMap.set(selectedData[2].value, i - 1)
    }
    this.resetTypeChoose()
  }
  /**
  * 方法描述 删除标签
  * @author yanshaowen
  * @date 2019/11/3 14:42
  * @param event    点击事件
  * @param name     对应Tag设置的name
  * @return
  */
  private typeTagClose (event: MouseEvent, name: number) {
    if (this.chooseThreeTypeIdMap.has(name)) {
      this.chooseThreeTypeList.splice(this.chooseThreeTypeIdMap.get(name), 1)
      this.chooseThreeTypeIdMap.clear()
      this.chooseThreeTypeList.forEach((value, index) => {
        this.chooseThreeTypeIdMap.set(value.threeId, index)
      })
    }
    if (this.chooseThreeTypeList.length === 0) {
      this.stairId = null
      this.stairName = null
      this.secondId = null
      this.secondName = null
    }
    this.resetTypeChoose()
  }
  private resetTypeChoose () {
    if (this.stairId !== null) {
      this.formItem.courseStairId = this.stairId
      this.formItem.courseSecondId = this.secondId
      const idList: number[] = []
      for (const [key, value] of this.chooseThreeTypeIdMap) {
        idList.push(key)
      }
      this.formItem.courseThreeIdList = idList
    }
  }

  private async handleSubmit (name) {
    this.submitRunning = true
    try {
      const form = this.$refs[name] as any
      const valid = await form.validate()
      if (!valid) {
        return
      }
      if (this.stairId === null) {
        this.$Message.warning('课程分类必填')
        return
      }
      let result = null
      if (this.isAddPage) {
        const request = new CourseAddRequest()
        JsonProtocol.copyProperties(this.formItem, request)
        request.setCourseThreeIdList(this.formItem.courseThreeIdList)
        result = await courseApi.add(request)
      } else {
        const request = new CourseUpdateRequest()
        JsonProtocol.copyProperties(this.formItem, request)
        request.setCourseThreeIdList(this.formItem.courseThreeIdList)
        result = await courseApi.update(request)
      }
      ApiUtil.getData(result)
      RefreshEvent.emit('CourseSubjectList')
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
}
</script>

<style scoped>

</style>
