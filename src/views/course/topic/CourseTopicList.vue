<template>
  <div>
    <simple-page-table
      :columns="columns"
      :api-list="apiList"
      :view-name="name"
    >
      <div slot="headButtonList" class="simple-page-table-head">
        <Button type="primary" icon="ios-add" v-on:click="actionAdd">{{$t("P_ADD")}}</Button>
        <Button type="primary" icon="ios-add" v-on:click="actionMulAdd">{{$t("P_MUL_ADD")}}</Button>
      </div>
    </simple-page-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ContentTopicApi } from '@/dao/api/ContentTopicApi'
import { JsonProtocol } from 'papio-h5'
import SimplePageTable from '@/components/table/SimplePageTable.vue'
import { ContentTopicListItemResponse } from '@/response/ContentTopicListItemResponse'
import { ContentTopicConstant } from '@/common/constant/ContentTopicConstant'
import { ContentTopicListItemRequest } from '@/request/ContentTopicListItemRequest'

const contentTopicApi = new ContentTopicApi()
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
      key: 'contentId',
      sortable: true,
      customFilter: {
        type: 'inputNumber'
      }
    },
    {
      title: '题目描述',
      key: 'title',
      slot: 'katext',
      customFilter: {
        type: 'inputText'
      }
    },
    {
      title: '题目类型',
      key: 'topicType',
      getValue (item: number, row: ContentTopicListItemResponse, simpleThis: Vue) {
        if (ContentTopicConstant.TYPE_SIGN_SELECT === item) {
          return simpleThis.$t('CONTENT_TOPIC_TYPE_SIGN_SELECT')
        } else if (ContentTopicConstant.TYPE_MUL_SELECT === item) {
          return simpleThis.$t('CONTENT_TOPIC_TYPE_MUL_SELECT')
        } else if (ContentTopicConstant.TYPE_FILL_BLANK === item) {
          return simpleThis.$t('CONTENT_TOPIC_TYPE_FILL_BLANK')
        } else if (ContentTopicConstant.TYPE_SHORT_ANSWER === item) {
          return simpleThis.$t('CONTENT_TOPIC_TYPE_SHORT_ANSWER')
        }
        return simpleThis.$t('P_ERROR_ENUM')
      }
    },
    {
      title: '状态',
      key: 'state',
      getValue (item: number, row: ContentTopicListItemResponse, simpleThis: Vue) {
        if (ContentTopicConstant.STATE_ONLINE === item) {
          return simpleThis.$t('CONTENT_STATE_ONLINE')
        } else if (ContentTopicConstant.STATE_OFFLINE === item) {
          return simpleThis.$t('CONTENT_STATE_OFFLINE')
        }
        return simpleThis.$t('P_ERROR_ENUM')
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
  private apiList (body) {
    const request = JsonProtocol.jsonToBean(body, ContentTopicListItemRequest)
    return contentTopicApi.list(request)
  }
  private actionMulAdd () {
    this.$router.push({
      path: '/course/topic/mul-add'
    })
  }
  private actionAdd () {
    this.$router.push({
      path: '/course/topic/add'
    })
  }
  private actionView (row: any, index) {
    this.$router.push({
      path: '/course/topic/edit',
      query: {
        id: row.contentId
      }
    })
  }
}
</script>

<style scoped>

</style>
