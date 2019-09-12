import Vue from 'vue'
import Router from 'vue-router'
import ConfigRouter from '@/router/ConfigRouter'
import iView from 'iview'
import ProjectConfig from '@/config/ProjectConfig'
import { CookiesUtil } from '@/common/util/CookiesUtil'
import { RouterUtil } from '@/common/util/RouterUtil'
import store from './store'
import axios from 'axios'
const { homeName } = ProjectConfig

Vue.use(Router)
const LOGIN_PAGE_NAME = 'UserLogin'
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: ConfigRouter
})

router.beforeEach((to, from, next) => {
  // @ts-ignore
  iView.LoadingBar.start()
  const token = CookiesUtil.getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    // @ts-ignore
    if (store.state.user.hasGetInfo) {
      next()
    } else {
      store.dispatch('user/getUserInfo').then(user => {
        next()
      }).catch(() => {
        CookiesUtil.setToken('')
        next({
          name: 'UserLogin'
        })
      })
    }
  }
})
router.afterEach(to => {
  RouterUtil.setTitle(to, router.app)
  // @ts-ignore
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

// http response 响应拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  store.dispatch('app/addErrorLog', {
    type: "script",
    code: 0,
    mes: error.message,
    url: window.location.href
  });
  if (error.response) {
    switch (error.response.status) {
      // 返回401，清除token信息并跳转到登录页面
      case 401:
        CookiesUtil.setToken('')
        router.replace({
          path: '/user/login',
          query: { redirect: router.currentRoute.fullPath }
        })
    }
    // 返回接口返回的错误信息
    return Promise.reject(error)
  }
})
export default router
