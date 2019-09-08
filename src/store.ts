import Vue from 'vue'
import Vuex from 'vuex'
import UserStore from '@/store/UserStore'
import AppStore from "@/store/AppStore";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user: UserStore,
    app: AppStore
  }
})
