<template>
  <div>
    <simple-page-table
      :columns="columns"
      :api-list="apiList"
    ></simple-page-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SimplePageTable from '@/components/table/SimplePageTable.vue'
import { SimplePageTableColumn } from '@/bmo/Component'
import { JsonProtocol } from 'papio-h5'
import { ContentNewsListRequest } from '@/request/ContentNewsListRequest'
import { ContentNewsApi } from '@/dao/api/ContentNewsApi'

@Component({
  components: {
    SimplePageTable
  }
})
export default class NewsList extends Vue {
  private name = 'NewsList'
  private contentNewsApi: ContentNewsApi = new ContentNewsApi()
  private columns: SimplePageTableColumn[] = [
    {
      title: '内容id',
      key: 'contentId',
      sortable: true,
      customFilter: {
        type: 'inputNumber'
      }
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
      title: '标题',
      key: 'title',
      sortable: true,
      customFilter: {
        type: 'inputText'
      }
    },
    {
      title: '来源',
      key: 'articleSource'
    },
    {
      title: '显示状态',
      key: 'state',
      customFilter: {
        type: 'selectSign',
        option: [
          {
            label: '上线',
            value: 1
          },
          {
            label: '下线',
            value: 2
          }
        ]
      },
      simpleOption: [
        {
          label: '上线',
          value: 1
        },
        {
          label: '下线',
          value: 2
        }
      ]
    },
    {
      title: '编辑',
      key: 'editor'
    },
    {
      title: '发布时间',
      key: 'publishTime',
      sortable: true,
      customFilter: {
        type: 'dateScope'
      }
    },
    {
      title: '来源渠道',
      key: 'channelName'
    },
    {
      title: '新闻频道',
      key: 'contentZoneName'
    },
    {
      title: '操作',
      key: '_option',
      optionList: [
        {
          icon: 'ios-build-outline',
          text: '编辑',
          buttonType: 'primary',
          click: this.openEdit
        }
      ]
    }
  ]

  private apiList (body: object) {
    const request = JsonProtocol.jsonToBean(body, ContentNewsListRequest)
    return this.contentNewsApi.list(request)
  }
  private openEdit (row, index: number) {
    this.$router.push({
      path: '/news/edit',
      query: {
        contentId: row.contentId
      }
    })
  }
}
</script>

<style scoped>

</style>
