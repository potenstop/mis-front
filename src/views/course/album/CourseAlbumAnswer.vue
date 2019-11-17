<template>
  <div>
    <topic-item v-for="item in contentTopic" :data="item" :key="item.contentId"></topic-item>
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
import { ContentTopicListItemRequest } from '@/request/ContentTopicListItemRequest'
import CourseChooseModal from '@/components/modal/CourseChooseModal.vue'
import ConstantMixin from '@/components/mixin/ConstantMixin'
import { mixins } from 'vue-class-component'
import { AlbumCourseApi } from '@/dao/api/AlbumCourseApi'
import { AlbumCourseUpdateCourseRelationRequest } from '@/request/AlbumCourseUpdateCourseRelationRequest'
import TopicItem from '@/components/item/topic/TopicItem.vue'
import { ContentTopicViewResponse } from '@/response/ContentTopicViewResponse'
import { ItemContentTopic } from '@/components/item/topic/ItemContentTopic'
import { ItemContentTopicSelectOption } from '@/components/item/topic/ItemContentTopicSelectOption'

const contentTopicApi = new ContentTopicApi()
const albumCourseApi = new AlbumCourseApi()
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

  private async created () {
    this.loadingInit = true
    await this.initData()
    this.loadingInit = false
  }
  private async initData () {
    const query = this.$route.query as any
    const result = await albumCourseApi.albumCourseTopicList(query.id)
    this.contentTopic = []
    ApiUtil.getData(result).getContentList().forEach(item => {
      const itemContentTopic = new ItemContentTopic()
      JsonProtocol.copyProperties(item, itemContentTopic)
      itemContentTopic.addOptionList = []
      item.getAddOptionList().forEach(optionItem => {
        const itemContentTopicSelectOption = new ItemContentTopicSelectOption()
        JsonProtocol.copyProperties(item, itemContentTopicSelectOption)
        itemContentTopic.addOptionList.push(itemContentTopicSelectOption)
      })
      this.contentTopic.push(itemContentTopic)
    })
  }

  private async handleSubmit (name) {
  }
  public back () {
    this.closeTag(this.$route)
  }
}
</script>

<style scoped>

</style>
