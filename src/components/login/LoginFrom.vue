<template>
  <Form
    ref="loginForm"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
  >
    <FormItem prop="nickname">
      <Input v-model="form.nickname" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Form } from 'view-design'

@Component
export default class LoginForm extends Vue {
  @Prop({
    default: () => [
      { required: true, message: '账号不能为空', trigger: 'blur' }
    ]
  })
  readonly passwordRules!: Array<any>;
  @Prop({
    default: () => [
      { required: true, message: '密码不能为空', trigger: 'blur' }
    ]
  })
  readonly nicknameRules!: Array<any>;

  name: string = 'LoginForm';

  form = {
    nickname: 'yanshaowen',
    password: '123456'
  };

  // computed
  get rules () {
    return {
      nickname: this.nicknameRules,
      password: this.passwordRules
    }
  }

  @Emit('on-success-valid')
  submit () {
    return {
      nickname: this.form.nickname,
      password: this.form.password
    }
  }
  // method
  handleSubmit () {
    (this.$refs.loginForm as Form).validate(valid => {
      if (valid) {
        this.submit()
      }
    })
  }
}
</script>
