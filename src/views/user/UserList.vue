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
  private name = 'UserList'
  private editName = ''
  private columns1 = [
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
          icon: 'ios-build-outline',
          text: this.editName,
          buttonType: 'primary',
          click: this.view
        }
      ]
    }
  ]
  private apiList (body) {
    const request = JsonProtocol.jsonToBean(body, UserListRequest)
    return userApi.userList(request)
  }
  private created () {
    this.editName = this.$t('P_EDIT') as string
  }
  view (row, index) {
    this.$router.push({
      path: '/user/edit',
      query: {
        userId: row.userId
      }
    })
  }
}
</script>

<style lang="less">

</style>
