<template>
  <div>
    <Button @click="exportData" type="primary" style="margin: 0 10px 10px 0;"
    >导出日志记录</Button
    >
    <b
    >注：页面错误日志不会在浏览器持久化存储，刷新页面即会丢失</b
    >
    <Table ref="table" :columns="columns" :data="errorList"></Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { Table } from 'view-design'
import moment from 'moment'

import { StoreConstant } from '@/common/constant/StoreConstant'
const appModule = namespace(StoreConstant.APP)

@Component
export default class ErrorLogger extends Vue {
    @appModule.State errorList: any[];
    @appModule.Mutation setHasReadErrorLoggerStatus: Function;

    name = 'ErrorLogger';

    // data
    columns = [
      {
        type: 'index',
        title: '序号',
        width: 100
      },
      {
        key: 'type',
        title: '类型',
        width: 100,
        render: (h, { row }) => {
          return h('div', [
            h('icon', {
              props: {
                size: 16,
                type: row.type === 'ajax' ? 'md-link' : 'md-code-working'
              }
            })
          ])
        }
      },
      {
        key: 'code',
        title: '编码',
        render: (h, { row }) => {
          return h('span', row.code === 0 ? '-' : row.code)
        }
      },
      {
        key: 'mes',
        title: '信息'
      },
      {
        key: 'url',
        title: 'URL'
      },
      {
        key: 'time',
        title: '时间',
        render: (h, { row }) => {
          return h('span', moment(row.time).format('YYYY-MM-DD HH:mm:ss'))
        },
        sortable: true,
        sortType: 'desc'
      }
    ];

    exportData () {
      (this.$refs.table as Table).exportCsv({
        filename: '错误日志.csv'
      })
    }

    activated () {
      this.setHasReadErrorLoggerStatus()
    }

    mounted () {
      this.setHasReadErrorLoggerStatus()
    }
}
</script>
