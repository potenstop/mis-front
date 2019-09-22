<template>
  <div>
    <simple-page-table
      :columns="columns1"
      :api-list="apiList"
    ></simple-page-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SimplePageTable from '@/components/table/SimplePageTable.vue'
import { UserApi } from '@/dao/api/UserApi'
import { JsonProtocol } from 'papio-h5'
import { UserListRequest } from '@/request/UserListRequest'

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
      title: '用户id',
      key: 'userId',
      sortable: true,
      customFilter: {
        type: 'inputNumber'
      }
    },
    {
      title: '用户名称',
      key: 'nickname',
      customFilter: {
        type: 'inputText'
      }
    },
    {
      title: '用户头像',
      key: 'avatar'
    },
    {
      title: '注册时间',
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
          icon: 'ios-eye-outline',
          text: '查看',
          buttonType: 'info',
          click: this.view
        },
        {
          icon: 'ios-build-outline',
          text: '编辑',
          buttonType: 'primary'
        }
      ]
    }
  ]

  apiDetail = userApi.detail
  apiAdd = userApi.detail
  apiDelete = userApi.detail
  apiUpdate = userApi.detail

  apiList (body) {
    const request = JsonProtocol.jsonToBean(body, UserListRequest)
    return userApi.list(request)
  }
  view (row, index) {
    this.$router.push({
      path: '/user/view',
      query: {
        userId: row.userId
      }
    })
  }
}
</script>

<style lang="less">

</style>
