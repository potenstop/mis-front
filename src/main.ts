import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import './assets/icons/iconfont.css'
import 'view-design/dist/styles/iview.css'
import 'highlight.js/styles/atom-one-dark.css'
import ProjectConfig from '@/config/ProjectConfig'
import i18n from '@/locale'
import installPlugin from '@/plugin'
import { directive as clickOutside } from 'v-click-outside-x'
import importDirective from '@/directive'
import axios from 'axios'
import VModal from 'vue-js-modal'

Vue.prototype.axios = axios
// 实际打包时应该不引入mock
if (process.env.NODE_ENV !== 'production') {
  // require('@/mock/UserMock')
}

Vue.config.productionTip = false
Vue.use(ViewUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(VModal, {
  dialog: true,
  dynamic: true
})
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
Vue.directive('clickOutside', clickOutside)

/**
 * 注册指令
 */
importDirective(Vue)

Vue.config.productionTip = false
Vue.prototype.$config = ProjectConfig
new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
