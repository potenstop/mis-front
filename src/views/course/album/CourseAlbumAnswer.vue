<template>
  <div>
    <topic-item
      style="margin-top: 10px"
      v-for="item in contentTopic"
      :data="item"
      :key="item.contentId"
      @on-choose-value="onChooseValue"
    ></topic-item>
    <div style="margin-top: 20px;margin-left: 40%">
      <Button type="primary" @click="handleSubmit" :loading="submitRunning" :disabled="loadingInit">提交试卷</Button>
      <Button @click="back" style="margin-left: 8px">{{$t("P_CANCEL")}}</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ApiUtil } from '@/common/util/ApiUtil'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { StoreConstant } from '@/common/constant/StoreConstant'
import { JSHelperUtil, JsonProperty, JsonProtocol, ReturnGenericsProperty, StringUtil } from 'papio-h5'
import { RefreshEvent } from '@/common/event/RefreshEvent'
import { ContentTopicApi } from '@/dao/api/ContentTopicApi'
import { CourseApi } from '@/dao/api/CourseApi'
import { AlbumCourseProblemApi } from '@/dao/api/AlbumCourseProblemApi'
import TopicItem from '@/components/item/topic/TopicItem.vue'
import { ItemContentTopic } from '@/components/item/topic/ItemContentTopic'
import { ItemContentTopicSelectOption } from '@/components/item/topic/ItemContentTopicSelectOption'
import { LocalForageUtil } from '@/common/util/LocalForageUtil'
import { AlbumCourseProblemUpdateRequest } from '@/request/AlbumCourseProblemUpdateRequest'
import { ProblemContentTopicRequest } from '@/request/ProblemContentTopicRequest'
import moment from 'moment'

const contentTopicApi = new ContentTopicApi()
const courseApi = new CourseApi()
const albumCourseProblemApi = new AlbumCourseProblemApi()
const appModule = namespace(StoreConstant.APP)

class UpdateModel {
}

@Component({
  components: {
    TopicItem
  }
})
export default class CourseAlbumAnswer extends Vue {
  @appModule.Mutation closeTag: Function
  private name = 'CourseAlbumAnswer'
  private formItem: UpdateModel = new UpdateModel()
  private loadingInit: boolean = true
  private ruleValidate = {}
  private submitRunning: boolean = false
  private contentTopic: ItemContentTopic[] = []
  private albumId: number = null
  private albumCourseProblemId: number = null
  // 数据是发生了变化
  private dataIsChange: boolean = false

  private async created () {
    this.loadingInit = true
    await this.initData()
    this.syncDataToRemote()
    this.loadingInit = false
  }
  private async getCacheData () {
    // 获取本地的
    const historyCacheData = await LocalForageUtil.getItem('albumCourseProblemHistory' + this.albumCourseProblemId) as any[]
    let remote: any = null
    // 获取远程的
    try {
      const result = await albumCourseProblemApi.topic(this.albumCourseProblemId)
      const albumCourseProblemTopicResponseList = ApiUtil.getData(result)
      // 找出最大的时间
      let maxTime = null
      let data = {}
      albumCourseProblemTopicResponseList.forEach(item => {
        data[item.getContentId()] = item.getInputSelectOption()
        const current = moment(item.getUpdateTime()).format('x')
        if (!maxTime) {
          maxTime = current
        } else if (current > maxTime) {
          maxTime = current
        }
      })
      remote = {}
      remote.date = maxTime
      remote.data = albumCourseProblemTopicResponseList
    } catch (e) {
      this.$Message.warning('获取远程数据失败')
    }
    console.log('1111111111111', historyCacheData, remote)
    if (!historyCacheData && !remote) {
      return []
    } else if (historyCacheData && !remote) {
      return historyCacheData[0]
    } else if (!historyCacheData && remote) {
      return remote.data
    } else {
      if (historyCacheData[0].date <= remote.date) {
        return remote.data
      } else {
        return historyCacheData[0]
      }
    }
  }
  private async initData () {
    const query = this.$route.query as any
    this.albumId = query.albumId
    this.albumCourseProblemId = query.albumCourseProblemId
    const result = await courseApi.albumCourseTopicList(this.albumId)
    this.contentTopic = []
    const o = ['A ', 'B ', 'C ', 'D ', 'E ', 'F ', 'J ']
    const cacheData = await this.getCacheData()
    ApiUtil.getData(result).getContentList().forEach((item, j) => {
      const itemContentTopic = new ItemContentTopic()
      JsonProtocol.copyProperties(item, itemContentTopic)
      itemContentTopic.title = `${j + 1} ${itemContentTopic.title}`
      itemContentTopic.addOptionList = []
      // if (item.getAddOptionList() !== null) {
      //   item.getAddOptionList().forEach((optionItem, i) => {
      //     const itemContentTopicSelectOption = new ItemContentTopicSelectOption()
      //     JsonProtocol.copyProperties(optionItem, itemContentTopicSelectOption)
      //     itemContentTopicSelectOption.optionLabel = o[i] + itemContentTopicSelectOption.optionLabel
      //     itemContentTopic.addOptionList.push(itemContentTopicSelectOption)
      //   })
      // }
      if (item.getContentId() in cacheData) {
        itemContentTopic.chooseValue = cacheData[item.getContentId()]
      }
      this.contentTopic.push(itemContentTopic)
    })
  }

  private async handleSubmit () {
    // 提交答案并给出得分
    console.log(this.contentTopic)
  }
  public back () {
    this.closeTag(this.$route)
  }
  /**
  * 方法描述 用户对题目作出了答案
  * @author yanshaowen
  * @date 2019/12/14 8:46
  * @param
  * @return
  */
  private async onChooseValue () {
    // 保存key=contentId value=chooseValue
    this.dataIsChange = true
    const cacheData = {}
    this.contentTopic.forEach(item => {
      if (item.chooseValue) {
        cacheData[item.contentId] = item.chooseValue
      }
    })
    const history = await LocalForageUtil.getItem('albumCourseProblemHistory' + this.albumCourseProblemId) as any[]
    const newList = [{ date: new Date().getTime(), data: cacheData }]
    if (JSHelperUtil.isNullOrUndefined(history)) {
      await LocalForageUtil.setItem('albumCourseProblemHistory' + this.albumCourseProblemId, newList)
    } else {
      console.log(history, '11')
      const list = history.slice(0, 100)
      list.unshift(newList)
      await LocalForageUtil.setItem('albumCourseProblemHistory' + this.albumCourseProblemId, list)
    }
  }
  private syncDataToRemote () {
    setInterval(async () => {
      if (this.dataIsChange) {
        const request = new AlbumCourseProblemUpdateRequest()
        request.setAlbumCourseProblemId(this.albumCourseProblemId)
        const list: ProblemContentTopicRequest[] = []
        for (const contentTopic of this.contentTopic) {
          if (contentTopic.chooseValue) {
            const topicRequest = new ProblemContentTopicRequest()
            topicRequest.setChooseValue(contentTopic.chooseValue)
            topicRequest.setContentId(contentTopic.contentId)
            list.push(topicRequest)
          }
        }
        request.setProblemContentTopicList(list)
        await albumCourseProblemApi.update(request)
        this.dataIsChange = false
      }
    }, 1000)
  }
}
</script>

<style scoped>

</style>
