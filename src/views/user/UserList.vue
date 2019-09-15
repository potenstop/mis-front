<template>
  <div>
    <simple-page-table
      :columns="columns1"
      :api-list="apiList"
      @on-page-change="pageChange"
    ></simple-page-table>
  </div>
</template>
<!--
:data="data1"
:api-list="apiList"
:api-detail="apiDetail"
:api-add="apiAdd"
:api-update="apiUpdate"
:api-delete="apiDelete"-->
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SimplePageTable from '@/components/table/SimplePageTable.vue'
import { UserApi } from '@/dao/api/UserApi'
const userApi = new UserApi()
@Component({
  components: {
    SimplePageTable
  }
})
export default class UserList extends Vue {
  name = 'UserList'
  data1 = [
    {
      name: 'John Brown',
      age: 18,
      address: 'New York No. 1 Lake Park',
      date: '2016-10-03'
    },
    {
      name: 'Jim Green',
      age: 24,
      address: 'London No. 1 Lake Park',
      date: '2016-10-01'
    },
    {
      name: 'Joe Black',
      age: 30,
      address: 'Sydney No. 1 Lake Park',
      date: '2016-10-02'
    },
    {
      name: 'Jon Snow',
      age: 26,
      address: 'Ottawa No. 2 Lake Park',
      date: '2016-10-04'
    }
  ]
  columns1 = [
    {
      title: 'Name',
      key: 'name',
      sortable: true,
      customFilter: {
        type: 'inputNumber',
        max: '100',
        mix: '1'
      }
    },
    {
      title: 'Date',
      key: 'date',
      sortable: true,
      customFilter: {
        type: 'date',
        default: 'now'
      }
    },
    {
      title: 'Date Scope',
      key: 'date',
      sortable: true,
      customFilter: {
        type: 'dateScope',
        disabledDate: (date) => {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    },
    {
      title: 'Date1',
      key: 'date',
      sortable: true,
      customFilter: {
        type: 'datetime'
      }
    },
    {
      title: 'Datetime Scope',
      key: 'date',
      sortable: true,
      customFilter: {
        type: 'datetimeScope'
      }
    },
    {
      title: 'Age',
      key: 'age',
      sortable: true,
      customFilter: {
        type: 'selectSign',
        option: [
          {
            label: 'Greater than 4000',
            value: 1
          },
          {
            label: 'Less than 4000',
            value: 2
          }
        ],
      }
    },
    {
      title: 'Address',
      key: 'address',
      customFilter: {
        type: 'selectMul',
        option: [
          {
            label: 'Greater than 4000',
            value: 1
          },
          {
            label: 'Less than 4000',
            value: 2
          }
        ],
      }
    }
  ]
  pageTotal = 4
  pageCurrent = 1
  apiList = userApi.list
  apiDetail = userApi.detail
  apiAdd = userApi.detail
  apiDelete = userApi.detail
  apiUpdate = userApi.detail

  pageChange (current: number) {
    console.log(current)
    this.pageCurrent = current
  }
}
</script>

<style lang="less">

</style>
