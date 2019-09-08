import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// @ts-ignore
import iView from 'iview'
import './assets/icons/iconfont.css'
import 'iview/dist/styles/iview.css'
import 'highlight.js/styles/atom-one-dark.css'
import ProjectConfig from '@/config/ProjectConfig'
import i18n from '@/locale'
import installPlugin from '@/plugin'
import { directive as clickOutside } from 'v-click-outside-x'
import importDirective from '@/directive'

Vue.config.productionTip = false
Vue.use(iView, {
  i18n: (key: string, value: string) => i18n.t(key, value)
})
/*router.beforeEach(async (to, from, next) => {
  if (to.meta) {
    document.title = to.meta.title
  }
  store.commit('syncLoginState')
  if (store.getters.offLine) {
    await store.dispatch('authUser')
  }
  await next()
})*/
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue);
Vue.directive('clickOutside', clickOutside);

/**
 * 注册指令
 */
importDirective(Vue);

Vue.config.productionTip = false;
Vue.prototype.$config = ProjectConfig;
new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
