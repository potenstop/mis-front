import { RouterUtil } from '@/common/util/RouterUtil'
import { LocalUtil } from '@/common/util/LocalUtil'
import router from '@/router'
import routers from '@/router/ConfigRouter'
import config from '@/config/ProjectConfig'
import { StoreConstant } from '@/common/constant/StoreConstant'
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = RouterUtil.getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !RouterUtil.routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  namespaced: true,
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    local: LocalUtil.localRead(StoreConstant.LOCAL),
    errorList: [],
    hasReadErrorPage: false
  },
  getters: {
    menuList: (state, getters, rootState) =>
      RouterUtil.getMenuByRouter(routers, rootState.user.access),
    errorCount: state => state.errorList.length
  },
  mutations: {
    setBreadCrumb (state, route) {
      state.breadCrumbList = RouterUtil.getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
      state.homeRoute = RouterUtil.getHomeRoute(routes, homeName)
    },
    setTagNavList (state, list) {
      let tagList: any[] = []
      if (list) {
        tagList = [...list]
      } else {
        tagList = LocalUtil.getTagNavListFromLocalstorage() || []
      }
      if (tagList[0] && tagList[0].name !== homeName) {
        tagList.shift()
      }
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      LocalUtil.setTagNavListInLocalstorage([...tagList])
    },
    closeTag (state, route) {
      let tag = state.tagNavList.filter(item => RouterUtil.routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    addTag (state, { route, type = 'unshift' }) {
      let router = RouterUtil.getRouteTitleHandled(route)
      if (!RouterUtil.routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        LocalUtil.setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      LocalUtil.localSave('local', lang)
      state.local = lang
    },
    addError (state, error) {
      state.errorList.push(error)
    },
    setHasReadErrorLoggerStatus (state, status = true) {
      state.hasReadErrorPage = status
    }
  },
  actions: {
    addErrorLog ({ commit, rootState }, info) {
      if (!window.location.href.includes('error_logger_page')) {
        commit('setHasReadErrorLoggerStatus', false)
      }
      const { user: { token, userId, userName } } = rootState
      let data = {
        ...info,
        time: Date.parse(new Date().toString()),
        token,
        userId,
        userName
      }
      commit('addError', data)
    }
  }
}
