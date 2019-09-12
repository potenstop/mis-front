<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar" />
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心
          <Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { StoreConstant } from '@/common/constant/StoreConstant'
const userModule = namespace(StoreConstant.USER)

@Component
export default class DropUser extends Vue {
    @userModule.Action handleLogOut;

    @Prop({ default: '' }) readonly userAvatar!: string;
    @Prop({ default: 0 }) readonly messageUnreadCount!: number;

    name = 'DropUser';

    message () {
      this.$router.push({
        name: 'message_page'
      })
    }

    handleClick (name: string) {
      switch (name) {
        case 'logout':
          this.logout()
          break
        case 'message':
          this.message()
          break
        default:
          break
      }
    }

    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    }
}
</script>

<style lang="less">
  .user{
    &-avatar-dropdown{
      cursor: pointer;
      display: inline-block;
      // height: 64px;
      vertical-align: middle;
      // line-height: 64px;
      .ivu-badge-dot{
        top: 16px;
      }
    }
  }
</style>
