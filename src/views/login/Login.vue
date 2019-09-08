<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import LoginForm from '@/components/login/LoginFrom.vue'
import { StoreConstant } from '@/common/constant/StoreConstant'

const userModule = namespace(StoreConstant.USER)

@Component({
  components: {
    LoginForm
  }
})
export default class Login extends Vue {
    @userModule.Action handleLogin;
    @userModule.Action getUserInfo;

    handleSubmit ({ userName, password }: { userName: string; password: string }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          /* this.$router.push({
            name: this.$config.homeName
          }) */
        })
      })
    }
}
</script>

<style lang="less">
  .login {
    width: 100%;
    height: 100%;
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
        color: #c3c3c3;
      }
    }
  }
</style>
