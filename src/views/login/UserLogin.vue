<template xmlns:v-katex="http://www.w3.org/1999/xhtml">
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">{{errorTip}}</p>
        </div>
      </Card>
    </div>
    <div class="footer">
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import LoginForm from '@/components/login/LoginFrom.vue'
import { StoreConstant } from '@/common/constant/StoreConstant'
import AppFooter from '@/components/app/AppFooter.vue'

const userModule = namespace(StoreConstant.USER)

@Component({
  components: {
    LoginForm, AppFooter
  }
})
export default class UserLogin extends Vue {
  @userModule.Action handleLogin
  @userModule.Action getUserInfo
  private name = 'UserLogin'
  private errorTip: string = ''
  private html: string = ''

  private created () {
  }
  private async handleSubmit ({ nickname, password }) {
    try {
      this.errorTip = ''
      await this.handleLogin({ nickname, password })
      await this.getUserInfo()
      await this.$router.push({
        name: this.$config.homeName
      })
    } catch (e) {
      this.errorTip = e.message
    }
  }
}
</script>

<style lang="less">
  .login {
    width: 100%;
    height: 95%;
    background-image: url('../../assets/images/login-bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;

    &-con {
      position: absolute;
      right: 160px;
      top: 50%;
      transform: translateY(-60%);
      width: 300px;

      &-header {
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
      }

      .form-con {
        padding: 10px 0 0;
      }

      .login-tip {
        font-size: 10px;
        text-align: center;
        color: #c34762;
      }
    }
    .footer{
      position: absolute;
      padding:10px;
      right: 50%;
      top: 100%;
    }
  }
</style>
